import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { jwt_secret, isProduction } from "../../config.js";
import permissions from "../config/permissions.json" with {type: "json"};



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
      permissions: permissions.roles["user"]
    });

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
        permissions: permisos || []
      },
    });
  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ message: "Error en el servidor" });
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
      return res.status(400).json({ message: "Comtraseña inválida" });
    }

    // Generar token
    const token = generateToken(user._id, user.role);

    res.setHeader('Cache-Control', 'no-store');
    // Enviar cookie segura
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      // maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

   const permisos = user.permissions || permissions.roles[user.role];
return res.status(200).json({
  message: "Login exitoso",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: permisos
  },
});
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// ✅ Logout
export const logout = async (req, res) => {
  try {
    // Borramos la cookie 'token' poniéndole una fecha de expiración pasada
    res.cookie("token", "", {
      httpOnly: true,
      secure: isProduction, // Asegúrate de tener esta variable importada
      sameSite: isProduction ? "strict" : "lax",
      expires: new Date(0),
      path: "/",
    });
    
    return res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("Error en logout:", error);
    res.status(500).json({ message: "Error al cerrar sesión" });
  }
};