import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { jwt_secret, isProduction } from "../../config.js";
import Permissions from "../models/Permissions.js";

// ✅ Generar JWT
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, jwt_secret, {
    expiresIn: "7d",
  });
};

// ✅ Registrar usuario
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
const permissions = await Permissions.findOne().lean();
    // Verificar si ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }
    
    // Crear usuario
    const newUser = new User({
      name,
      email,
      password,
      role: "user", // por defecto user
      status: "active",
      permissions: permissions.roles["user"],
    });
    // newUser.isActive = true;
    await newUser.save();
    
    const permisos = permissions.roles[newUser.role];
    
    // Generar token
    const token = generateToken(newUser._id, newUser.role);
    
    // Enviar cookie segura
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      // maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        permissions: permisos || [],
        status: newUser.status
      },
    });
  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

// ✅ Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res
    .status(400)
    .json({ message: "Email y contraseña son obligatorios" });
  }
  try {
    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email o contraseña inválidas" });
    }
    
    // Comparar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña inválida" });
    }
    const permissions = await Permissions.findOne().lean();
    console.log("LOGIN", user);
    console.log("CONTROLLER LOGIN", permissions.roles);


    const permisosDb = permissions.roles[user.role];
   

    const userUpdate = await User.findByIdAndUpdate(user._id, {
      $set: {
        status: "active", // ✅ siempre actualizamos status 
        permissions: permisosDb
      }
    }, { new: true, runValidators: true }).lean();
    
    // Generar token
    const token = generateToken(user._id, user.role);
    
    // Limpiar caché para evitar redirecciones viejas
    res.setHeader('Cache-Control', 'no-store');
    // Enviar cookie segura
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      // maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

return res.status(200).json({
  message: "¡Login exitoso!",
  user: {
  id: userUpdate._id,
        name: userUpdate.name,
        email: userUpdate.email,
        role: userUpdate.role,
        permissions: userUpdate.permissions, // Ahora sí vienen de la DB actualizados
        status: "active"
  },
});
  } catch (error) {
    console.error("Error en login:", error);
   res.status(500).json({ error: true, message: error.message });
  }
};

// ✅ Logout
export const logout = async (req, res) => {
  try {
    const { id } = req.user; 
   if ( !id) { 
    return res.status(401).json({ message: "No autorizado" }); }

    const updateUser = await User.findByIdAndUpdate( 
      id, { $set: { status: "inactive" } }, { new: true, runValidators: true } ).lean();; 

      if (!updateUser) { return res.status(404).json({ message: "Usuario no encontrado" }); }
// Si usas express-session: destruir la sesión 
    if (req.session) {
      req.session.destroy(err => {
        if (err) console.error("Error destroying session:", err);
      });
    }
    // Borramos la cookie 'token' poniéndole una fecha de expiración pasada
    res.clearCookie("token", "", {
      httpOnly: true,
      secure: isProduction, // Asegúrate de tener esta variable importada
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 0,
    });
    
    return res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("Error en logout:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};