import { LoginFormValues } from "@/features/auth/components/LoginForm";
import api from ".";

export const handleLogin = async (values: LoginFormValues) => {
  const response = await api.post("/auth/jwt/create", values);
  if (response.status !== 200) {
    throw new Error("Could not login");
  }
  return response.data as { access: string; refresh: string };
};
