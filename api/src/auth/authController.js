import User from "../models/User.js";
import { createSession } from "../middleware/helper/createSession.js";
import jwt from "jsonwebtoken";
import { jwt_secret, isProduction, frontend_url } from "../../config.js";
import Permissions from "../models/Permissions.js";
import crypto from "crypto"; // Para generar tokens seguros
import { backend_url } from "../../config.js";
import { sendEmail } from "../lib/mailer.js";
import RefreshToken from "../models/RefreshToken.js";
import Token from "../models/Token.js";
import bcrypt from "bcrypt";
import { authMailer } from "../mailers/authMailer.js";

export const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, jwt_secret, {
    expiresIn: "15m",
  });
};
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, identity } = req.body;

    const permissions = await Permissions.findOne().lean();
    // Verificar si ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("El email ya está registrado");
      error.statusCode = 400;
      return next(error);
    }
    //Generar Token de Verificación de email
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutos
    // Crear usuario
    const newUser = new User({
      name,
      email,
      password,
      phone,
      identity,
      role: "user", // por defecto user
      status: "active",
      permissions: permissions.roles["user"],
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: tokenExpires,
      sessions: req.currentSession ? [req.currentSession] : [],
    });
    await newUser.save();

    const tokenData = await new Token({
      userId: newUser._id,
      token: verificationToken,
      type: "VERIFY_EMAIL",
    }).save();

    const mailResponse = await authMailer.sendVerificationEmail(
      newUser,
      tokenData
    );
    if (!mailResponse.success) {
      // Si el motor de correos falló, informamos al usuario y DETENEMOS el flujo
      return res.status(500).json({
        success: false,
        message: "No pudimos enviar el correo. Por favor, intenta más tarde.",
        error: mailResponse.error, // Viene de mailer.js corregido
      });
    }

    // Borro el password del objeto newUser para no enviarlo al front
    if (newUser && newUser.password) delete newUser.password;

    // Enviar cookie segura
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // true en producción
      sameSite: isProduction ? "strict" : "lax",
      path: "/",
      // IMPORTANTE: No declarar maxAge ni expires
    };
    //Crear el nuevo Refresh  Helper TokenRefresh
    await createSession(res, newUser._id, req.currentSession);
 
    // Generar token de autenticación
    const token = generateToken(newUser._id, newUser.role);

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};
export const resendVerifyEmail = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    // if (!user) {
    //   const error = new Error("Usuario no encontrado");
    //   error.statusCode = 400;
    //   return next(error);
    // }
    if (!user)
      return next(
        Object.assign(new Error("Usuario no encontrado"), { statusCode: 400 })
      );
    if (user.isEmailVerified) {
      return res.status(200).json({
        success: true,
        message: "Su email ya fue verificado.",
      });
    }
    // Control de Spam (Bloqueo de 1 minuto)
    const existingToken = await Token.findOne({
      userId: user._id,
      type: "VERIFY_EMAIL",
    });

    if (existingToken) {
      // Calcular cuánto tiempo ha pasado desde que se creó
      const timeSinceCreation =
        Date.now() - new Date(existingToken.createdAt).getTime();
      if (timeSinceCreation < 60000) {
        return res.status(429).json({
          success: false,
          message:
            "Por favor, espera un minuto antes de solicitar otro correo.",
        });
      }
    }
    // Preparar nuevo Token
    await Token.deleteMany({ userId: user._id, type: "VERIFY_EMAIL" });
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutos

    const tokenData = await new Token({
      userId: user._id,
      token: verificationToken,
      type: "VERIFY_EMAIL",
    }).save();
    // Actualzar la información token en el user de la Db
    await User.findByIdAndUpdate(user._id, {
      $set: {
        emailVerificationToken: verificationToken,
        emailVerificationExpires: tokenExpires,
      },
    });
    // Reenviar el email de verificación
    const mailResponse = await authMailer.sendVerificationEmail(
      user,
      tokenData
    );
    //si falla el reeenvio
    if (!mailResponse.success) {
      // Si el motor de correos falló, informamos al usuario y DETENEMOS el flujo aquí
      return res.status(500).json({
        success: false,
        message: "No pudimos enviar el correo. Por favor, intenta más tarde.",
        error: mailResponse.error, // Viene de mailer.js
      });
    }
    // Éxito en el reenvío
    res.status(200).json({
      success: true,
      message:
        "Se ha enviado un nuevo enlace de verificación a tu correo. Revisa tu buzón.",
      expiresAt: tokenExpires,
      user,
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Email y contraseña son obligatorios");
    error.statusCode = 400;
    return next(error);
  }
  try {
    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Email o contraseña inválidas");
      error.statusCode = 400;
      return next(error);
    }
    //comparar password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const error = new Error("Contraseña inválida");
      error.statusCode = 400;
      return next(error);
    }
    // Ajustar permissions según rol
    const permissions = await Permissions.findOne().lean();
    const permisosDb = permissions.roles[user.role];

    const userUpdate = await User.findOneAndUpdate(
      {
        _id: user._id,
        // Buscamos si ya existe este dispositivo en el array para actualizarlo
        "sessions.device": req.currentSession.device,
      },
      {
        $set: {
          status: "active",
          permissions: permisosDb,
          "sessions.$.ip": req.currentSession.ip,
          "sessions.$.lastLogin": new Date(),
        },
      },
      { new: true, runValidators: true }
    ).lean();

    // Si userUpdate es null, significa que el dispositivo NO existía en el historial
    if (!userUpdate) {
      await User.findByIdAndUpdate(
        user._id,
        {
          $set: { status: "active", permissions: permisosDb },
          $push: {
            sessions: { $each: [req.currentSession], $slice: -5 },
          },
        },
        { new: true }
      );
    }
    if (userUpdate && userUpdate.password) delete userUpdate.password;

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // true en producción
      sameSite: isProduction ? "strict" : "lax",
      path: "/",
    };
    // Helper TokenRefresh
    await createSession(res, user._id, req.currentSession);
    // Generar token
    const token = generateToken(user._id, user.role);
    // Limpiar caché para evitar redirecciones viejas
    res.setHeader("Cache-Control", "no-store");
    // Enviar cookie segura
    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "¡Login exitoso!",
      user: userUpdate,
    });
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user || {};

    if (!_id) {
      const error = new Error("No autorizado");
      error.statusCode = 400;
      return next(error);
    }

    const updateUser = await User.findByIdAndUpdate(
      _id,
      { $set: { status: "inactive" } },
      { new: true, runValidators: true }
    ).lean();

    if (!updateUser) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 400;
      return next(error);
    }
    const refreshId = req.cookies?.refresh_id;
    if (refreshId) {
      try {
        await RefreshToken.deleteOne({
          refreshId,
          device: req.currentSession.device,
        });
        // await RefreshToken.deleteOne({ refreshId });
      } catch (e) {
        console.warn("Error borrando refresh token en logout:", e);
      }
      const cookieOptions = {
        httpOnly: true,
        secure: isProduction, // true en producción
        sameSite: isProduction ? "strict" : "lax",
        path: "/",
        // IMPORTANTE: No declarar maxAge ni expires
      };

      // Borramos la cookie 'token'
      res.clearCookie("token", { cookieOptions });
      res.clearCookie("refresh_id", { cookieOptions });
    }

    return res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    next(error);
  }
};
export const getPermissions = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (!role || role !== "superadmin") {
      res.status(500).json({
        ok: false,
        message: "Necesitas autorización para realizar esta acción",
        error: error.message,
      });
    }

    const permissions = await Permissions.find().sort({ code: 1 });
    res.status(200).json({
      ok: true,
      permissions,
    });
  } catch (error) {
    // res.status(500).json({
    //   ok: false,
    //   message: "Error al obtener los permisos de la Db",
    //   error: error.message,
    // });
    next(error);
  }
};
export const refresh = async (req, res, next) => {
  try {
    const refreshId = req.cookies?.refresh_id;
    if (!refreshId)
      return res.status(401).json({ message: "No refresh token" });

    // Buscar en DB
    const existing = await RefreshToken.findOne({ refreshId }).lean();
    if (!existing)
      return res.status(401).json({ message: "Refresh inválido o revocado" });

    // Obtener user
    const user = await User.findById(existing.userId).lean();
    if (!user) {
      // limpiar refresh si user no existe
      await RefreshToken.deleteOne({ refreshId });
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Rotación: eliminar el refresh antiguo
    await RefreshToken.deleteOne({ refreshId });

    // Crear nuevo refreshId y guardarlo
    const newRefreshId = crypto.randomUUID();
    const REFRESH_TTL_MS = 30 * 24 * 60 * 60 * 1000;
    const expiresAt = new Date(Date.now() + REFRESH_TTL_MS);

    await RefreshToken.create({
      refreshId,
      userId: user._id,
      expiresAt,
      device: req.currentSession.device,
      ip: req.currentSession.ip,
    });

    // Generar nuevo access token (usa tu generateToken)
    const token = generateToken(user._id, user.role);

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // true en producción
      sameSite: isProduction ? "strict" : "lax",
      path: "/",
      // IMPORTANTE: No declarar maxAge ni expires
    };

    res.cookie("token", token, cookieOptions);
    res.cookie("refresh_id", newRefreshId, cookieOptions);

    return res.status(200).json({ message: "Token renovado" });
  } catch (error) {
    next(error);
  }
};
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, userId } = req.body;

    // 1. Buscar el token y verificar que sea de tipo PASSWORD_RESET
    const tokenData = await Token.findOne({
      token: token,
      userId: userId,
      type: "PASSWORD_RESET",
    });

    if (!tokenData) {
      const error = new Error("El enlace es inválido o ha expirado");
      error.statusCode = 400;
      return next(error);
    }

    // 2. Encontrar al usuario
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      return next(error);
    }
    // Guardar el nuevo password
    user.password = password;
    await user.save();
    // Borran token de reestablecimiento de contraseña luego de validarlo
    await Token.deleteOne({ _id: tokenData._id });
    //ENVIAR EMAIL
    let mailError = null;
    try {
      const mailResponse = await authMailer.sendPasswordResetSuccess(user);
      if (!mailResponse.success) {
        mailError = mailResponse.error; // Guardamos el error para registro interno
      }
    } catch (error) {
      console.error("Error enviando email:", error);
    }
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    // Enviar cookie segura
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // true en producción
      sameSite: isProduction ? "strict" : "lax",
      path: "/",
    };
    // GENERAR TOKEN Y COOKIES
    // Helper TokenRefresh
    await createSession(res, userId, req.currentSession);
    // Generar token de autenticación
    const newSessionToken = generateToken(userId, user.role);

    res.cookie("token", newSessionToken, cookieOptions);

    // RESPUESTA DE EXITO
    res.status(200).json({
      success: true,
      message: mailError
        ? "Contraseña actualizada. (No pudimos enviar el correo de confirmación, pero ya puedes iniciar sesión)."
        : "Contraseña actualizada correctamente. Ya puedes iniciar sesión.",
      user: userResponse,
    });
  } catch (error) {
    next(error);
  }
};
//No implementada
export const getPermissionsByCode = async (req, res, next) => {
  try {
    const { code } = req.params;

    // 1. Buscamos el documento que contiene el mapa de acciones
    const permDoc = await Permissions.findOne();

    if (!permDoc || !permDoc.actions) {
      return res.status(404).json({
        ok: false,
        message: "No se encontró el mapa de configuración de permisos.",
      });
    }

    // 2. Accedemos directamente a la llave del objeto
    // En JS: objeto["900"]
    const permissionData = permDoc.actions[code];

    if (!permissionData) {
      return res.status(404).json({
        ok: false,
        message: `La acción con el código '${code}' no existe en el sistema.`,
      });
    }

    // 3. Retornamos la data incluyendo la llave para que el frontend sepa cuál es
    res.status(200).json({
      ok: true,
      permission: {
        id: code, // Devolvemos la key como ID
        ...permissionData,
      },
    });
  } catch (error) {
    // res.status(500).json({
    //   ok: false,
    //   message: "Error al obtener el permiso de la Db",
    //   error: error.message,
    // });
    next(error);
  }
};
//No implementada
export const createPermission = async (req, res) => {
  try {
    const {
      code,
      name,
      label,
      href,
      category,
      icon,
      description,
      order,
      required,
    } = req.body;

    // 1. Verificamos que el código no exista ya para no sobrescribir por error
    const existingDoc = await Permissions.findOne();
    if (existingDoc?.actions[code]) {
      return res
        .status(400)
        .json({ ok: false, message: "El código de permiso ya existe" });
    }

    // 2. Usamos $set con dot notation para agregar la nueva llave al objeto actions
    await Permissions.updateOne(
      {}, // Filtro vacío para agarrar el único documento de configuración
      {
        $set: {
          [`actions.${code}`]: {
            name,
            label,
            href,
            category,
            icon,
            description,
            order,
            required,
          },
        },
      }
    );

    // 3. Sincronizamos el Frontend automáticamente
    await generatePermissionTypes();

    res.status(201).json({
      ok: true,
      message: `Permiso ${code} creado y tipos sincronizados.`,
    });
  } catch (error) {
    next(error);
  }
};
//No implementada
export const updatePermission = async (req, res) => {
  try {
    const { code } = req.params; // El código viene de la URL /permissions/:code
    const updateData = req.body; // Los campos a cambiar vienen del body

    // 1. Actualizamos solo los campos enviados usando dot notation
    // Esto evita borrar campos que no se enviaron en el formulario
    await Permissions.updateOne(
      {},
      { $set: { [`actions.${code}`]: updateData } }
    );

    // 2. Sincronizamos el Frontend
    await generatePermissionTypes();

    res.status(200).json({
      ok: true,
      message: `Permiso ${code} actualizado correctamente.`,
    });
  } catch (error) {
    next(error);
  }
};