import { LoginFormValues } from "@/features/auth/components/LoginForm";
import { RegisterFormValues } from "@/features/auth/components/RegisterForm";
import api from ".";

export const handleRegister = async (values: RegisterFormValues) => {
  const response = await api.post("/auth/users/", values);
  if (response.status !== 201) {
    throw new Error("Failed to register user");
  }
  return response.data as User;
};

export const handleLogin = async (values: LoginFormValues) => {
  const response = await api.post("/auth/jwt/create/", values);
  if (response.status !== 200) {
    throw new Error("Could not login");
  }
  return response.data as { access: string; refresh: string };
};
