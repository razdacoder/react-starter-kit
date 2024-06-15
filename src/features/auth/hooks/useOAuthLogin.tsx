import { handleOAuthLogin } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useOAuthLogin() {
  const navigate = useNavigate();
  const { mutate: oAuthLogin, isPending: oAuthLoggingIn } = useMutation({
    mutationFn: (data: { provider: string; state: string; code: string }) =>
      handleOAuthLogin(data.provider, data.state, data.code),
    onSuccess: () => {
      toast.success("Login Successful");
      navigate("/");
    },
    onError: (error: AxiosError) => {
      const errorData = error?.response?.data as { [key: string]: string[] };
      Object.keys(errorData).forEach((key) => {
        const errorMessage =
          errorData[key as keyof { [key: string]: string[] }][0];
        if (errorMessage) {
          toast.error(errorMessage);
        }
      });
    },
  });
  return { oAuthLogin, oAuthLoggingIn };
}
