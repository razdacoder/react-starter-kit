import { handleLogin } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoginFormValues } from "../components/LoginForm";

export default function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: loggingIn } = useMutation({
    mutationFn: (values: LoginFormValues) => handleLogin(values),
    onSuccess: () => {
      toast.success("Login Successful");
      navigate("/");
    },
    onError: (error: AxiosError) => {
      const errorData = error?.response?.data as { [key: string]: string[] };
      Object.keys(errorData).forEach((key) => {
        const errorMessage =
          errorData[key as keyof { [key: string]: string[] }];
        if (errorMessage) {
          toast.error(errorMessage);
        }
      });
    },
  });
  return { login, loggingIn };
}
