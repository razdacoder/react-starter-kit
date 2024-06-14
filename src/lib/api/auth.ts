import { ChangePasswordValues } from "@/features/auth/components/ChangePasswordForm";
import { LoginFormValues } from "@/features/auth/components/LoginForm";
import { RegisterFormValues } from "@/features/auth/components/RegisterForm";
import { UpdateUserValues } from "@/features/auth/components/UpdateAccountForm";
import api from ".";

export const handleRegister = async (values: RegisterFormValues) => {
  const response = await api.post("/auth/users/", values);
  if (response.status !== 201) {
    throw new Error("Failed to register user");
  }
  return response.data as User;
};

export const handleLogin = async (values: LoginFormValues) => {
  const response = await api.post("/auth/jwt/create/", values, {
    withCredentials: true,
    withXSRFToken: true,
  });
  if (response.status !== 200) {
    throw new Error("Could not login");
  }
  return response.data as { access: string; refresh: string };
};

export const handleAccountVerification = async (uid: string, token: string) => {
  const response = await api.post("/auth/users/activation/", { uid, token });
  if (response.status !== 204) {
    throw new Error("Failed to activate account");
  }
  return response.data;
};

export const handleVerifyToken = async () => {
  const response = await api.post("/auth/jwt/verify/");
  if (response.status !== 200) {
    throw new Error("Failed to verify token");
  }
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/users/me/");
  if (response.status !== 200) {
    throw new Error("Failed to fetch user");
  }
  return response.data as User;
};

export const handleUpdateUserAccount = async (values: UpdateUserValues) => {
  const response = await api.patch("/auth/users/me/", values);
  if (response.status !== 200) {
    throw new Error("Failed to update user account");
  }
  return response.data;
};

export const handleChangePassword = async (values: ChangePasswordValues) => {
  const response = await api.post("/auth/users/set_password/", values);
  if (response.status !== 204) {
    throw new Error("Failed to change password");
  }
  return response.data;
};

export const handleLogout = async () => {
  const response = await api.post("/auth/logout/");
  if (response.status !== 204) {
    throw new Error("Failed to logout");
  }
  return response.data;
};

export const handleDeleteAccount = async (current_password: string) => {
  const response = await api.delete("/auth/users/me/", {
    data: { current_password },
  });
  if (response.status !== 204) {
    throw new Error("Failed to delete user");
  }
  return response.data;
};
