import { handleResetPasswordConfirm } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ResetPasswordConfirmValues } from "../components/ResetPasswordConfirmForm";

export default function useResetPasswordConfirm() {
  const navigate = useNavigate();
  const { mutate: resetPasswordConfirm, isPending: isResetting } = useMutation({
    mutationFn: (data: {
      values: ResetPasswordConfirmValues;
      uid: string;
      token: string;
    }) => handleResetPasswordConfirm(data.values, data.uid, data.token),
    onSuccess: () => {
      navigate("/login", { replace: true });
      toast.success("Password Reset Successful");
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
  return { resetPasswordConfirm, isResetting };
}
