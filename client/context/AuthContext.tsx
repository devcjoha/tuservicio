"use client";

import { apiFetch } from "@/lib/api";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useModal } from "@/hooks/useModal";
import { ActionType, PERMISSIONS_LINKS, PERMISSIONS_ROLES } from "@/types/permissions";
import { LoadingDots } from "@/components/feedbacks/LoadingDots";

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  identity: {
    documentType: string;
    documentNumber: string;
    status?: VerificationStatus; // Opcional al registrar
  };
};
export type LoginData = {
  email: string;
  password: string;
}
export type Role = keyof typeof PERMISSIONS_ROLES;
export type ActionId = keyof typeof PERMISSIONS_LINKS;
export type Status = "active" | "inactive" | "paused" | "";
export type VerificationStatus = "unsubmitted" | "pending" | "verified" | "rejected";

export type UserType = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isPhoneVerified: boolean;
  phoneVerificationCode: string;
  role: Role;
  permissions: readonly ActionId[],
  status: Status;
  identity?: {
    status: VerificationStatus;
    documentNumber?: string;
    documentType: string;
  };
  biometrics?: {
    face: { isEnrolled: boolean };
    fingerprint: { isEnrolled: boolean };
    status: "active" | "inactive" | "locked";
  };
  isEmailVerified: boolean;
  avatar: FileList;
  emailVerificationExpires?: number;
};

export interface AuthState {
  user: UserType | null;
  isAuthenticated: boolean;
  isVerifying: boolean; // Para el estado de carga inicial
}
interface AuthResponse {
  success: boolean;
  message: string;
  error?: string;
  expiresAt: Date;
}
export type PermissionDetail = {
  id?: ActionId;
  name: string;
  label: string;
  href: string;
  category: string;
  icon: string;
  description: string;
  order: number;
  required: ActionType;
};
export type PermissionsState = Record<ActionId, PermissionDetail>;

export interface ResetPasswordData {
  password: string;
  token: string;
  userId: string;
}
export type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  loading: boolean;
  error: string | null;
  registerAuth: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  hasPermission: (actionCode: ActionId) => boolean;
  getPermissions: () => Promise<void>;
  getPermissionsByCode: (code: ActionId) => Promise<void>
  permissions: PermissionsState;
  // updateUser: (userData: Partial<UserType>) => void;
  checkSession: () => Promise<void>;
  forgotPassword: (email: string) => Promise<AuthResponse | void>
  resetPassword: (data: ResetPasswordData) => Promise<AuthResponse | void>
  resendVerifyEmail: () => Promise<AuthResponse | void>
};
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { open, close } = useModal();
  const [permissions, setPermissions] = useState<PermissionsState>(
    PERMISSIONS_LINKS as PermissionsState
  );
  const [isInitializing, setIsInitializing] = useState(true);
  
  // const updateUser = (userData: Partial<UserType>) => {
  //   setUser((prevUser) => {
  //     if (!prevUser) return null;
  //     return {
  //       ...prevUser,
  //       ...userData,
  //       // Manejo de biometría anidada
  //       biometrics: userData.biometrics
  //       ? {
  //         ...prevUser.biometrics,
  //         ...userData.biometrics,
  //         face: { ...prevUser.biometrics?.face, ...userData.biometrics.face },
  //         fingerprint: { ...prevUser.biometrics?.fingerprint, ...userData.biometrics.fingerprint }
  //       }
  //         : prevUser.biometrics,
  //     };
  //   });
  // };
  const checkSession = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/auth/profile"); // Endpoint protegido
      if (res && !res.error) {
        setUser(res.user || res);
        sessionStorage.setItem("session_active", "true");
      } else {
        setUser(null);
        sessionStorage.removeItem("session_active");
      }
    } catch (err) {
      setUser(null);
      sessionStorage.removeItem("session_active");
 
  } finally {
      setIsInitializing(false);
      setLoading(false);
  }
  };
  // 1. Verificar si hay sesión al cargar la app
  useEffect(() => {
    const initAuth = async () => {
      const isTabActive = sessionStorage.getItem("session_active");

      if (isTabActive !== "true") { // Si no es exactamente "true"
        setUser(null);
        setIsInitializing(false);
        return;
      }

      try {
        await checkSession(); // Esperamos a que el servidor nos diga quién es el user
      } catch (err) {
        setUser(null);
      } finally {
        setIsInitializing(false); // Ahora sí, mostramos la app
      }
    };
    initAuth();
  }, []);

  const login = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      console.log(res);
      
      if (!res.user) {
        const apiError = res.message
        setError(apiError);
        open({
          title: "Error de autenticación",
          message: apiError,
          variant: "error",
          onClose: () => setError(null),
        });
        return null;
      }
      // if (res.user.isEmailVerified === false) {
      //   redirect(res.user, "/verify-email");
      // }
      setUser(res.user);
      sessionStorage.setItem("session_active", "true");
      open({
        title: `Bienvenido ${res.user.name}`,
        message: res.message,
        variant: "success",
      });
      return res

    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
      open({
        title: "Error de autenticación",
        message: err.message,
        variant: "error",
        onClose: () => setError(null),
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const registerAuth = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.user) {
        const apiError = res.message
        setError(apiError);
        open({
          title: "Error de autenticación",
          message: apiError,
          variant: "error",
          onClose: () => setError(null),
        });
        throw new Error(apiError);
      }
      setUser(res.user);
      open({
        title: `Bienvenido ${res.user.name}`,
        message: res.message,
        variant: "success",
      });
      close();
    } catch (err: any) {
      setError(err.message);
      open({
        title: "Error de Registro",
        message: err.message,
        variant: "error",
        onClose: () => setError(null),
      });
      throw err;
    } finally {
      setLoading(false);
      setError(null);
    }
  };
  const hasPermission = (actionId: ActionId) => {
    // Compara el ID pedido contra los permisos que llegaron en el login
    return user?.permissions.includes(actionId) ?? false;
  }
  const logout = async () => {
    setLoading(true);
    try {
      // 1. Avisamos al backend para que borre la cookie
      await apiFetch("/auth/logout/", {
        method: "POST",
        timeout: 10000,
      });

      setUser(null);
      sessionStorage.removeItem("session_active");
      window.location.href = "/";

    } catch (error) {
      console.error("Error al cerrar sesión", error);
      // Aunque falle la red, es mejor limpiar el estado local
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  const clearError = () => setError(null);
  // Esto limpia el estado local de React antes de que la pestaña desaparezca
  const getPermissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/permissions", {
        method: "GET",
      });
      if (!res.permissions) {
        const apiError = res.message
        setError(apiError);
        open({
          title: "Error fetch al obtener los permisos",
          message: apiError,
          variant: "error",
          onClose: () => setError(null),
        });
        return null;
      }
      setPermissions(res.permissions)
      return res.permissions; // Esto devolvería el array que migramos a la DB
    } catch (err: any) {
      setError(err.message || "Error al obtener los permisos");
      open({
        title: "Error de permisos",
        message: err.message,
        variant: "error",
        onClose: () => setError(null),
      });
      throw err;
    } finally {
      setLoading(false);
      setError(null);
    }
  };
  const getPermissionsByCode = async (code: ActionId) => {
    try {
      const res = await apiFetch(`/permissions/${code}`, {
        method: "GET",
      });
      return res.permissions; // Esto devolvería el array que migramos a la DB
    } catch (error) {
      console.error("Error al obtener el permiso:", error);
      throw error;
    }
  };
  const saveChangesPermissions = async (data: any, code: ActionId) => {

    const method = code ? "PATCH" : "POST";
    const url = code ? `/permissions/${code}` : "/permissions";
    const res = await apiFetch(url, { method, body: JSON.stringify(data) });
    return res

  }
  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      
      const res = await apiFetch("/users/forgot-password", {
        method: "POST",
        body: JSON.stringify({email}),
      });
      return res;      
    } catch (err: any) {
      setError(err.message);
      open({
        title: "Olvidé Contraseña",
        message: err.message,
        variant: "error",
        onClose: () => setError(null),
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }
  const resetPassword = async (data: ResetPasswordData) => {
     try {

      const res = await apiFetch(`/auth/reset-password/${data.token}`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: data.userId,
          password: data.password
        }),
      });
      return res;
    } catch (err: any) {
      setError(err.message);
      open({
        title: "Reestablecer Contraseña",
        message: err.message,
        variant: "error",
        onClose: () => setError(null),
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const resendVerifyEmail = async () => {
    try {
      
      const userId = user?._id;
      const res = await apiFetch(`/auth/verify-email`, {
        method: "POST",
        body: JSON.stringify({ userId }),
      });

      if (res.success) {
        open({
          title: `Verificación de Email`,
          message: res.message,
          variant: "success",
        });
        setUser(prev => prev ? { ...prev, emailVerificationExpires: res.expiresAt } : null);
      } else {
        open({
          title: "Verificación de Email",
          message: res.message,
          variant: "error",
          onClose: () => setError(null),
        });
        setError("true")
      }
      
      return res;
    } catch (err: any) {
      setError(err.message);
      open({
        title: "Verificación de Email",
        message: err.message,
        variant: "error",
        onClose: () => setError(null),
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider value={{
      user, setUser, loading, error, registerAuth, login, logout, clearError, hasPermission, getPermissions, getPermissionsByCode, permissions, checkSession, forgotPassword, resetPassword, resendVerifyEmail
    }}>
      {!isInitializing ? (
        children
      ) : (
        <div className="flex h-screen items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-2">
              {/* <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div> */}
              <LoadingDots/>
            <p className="text-sm text-gray-500">Verificando sesión...</p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};