import { handleChangePassword } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ChangePasswordValues } from "../components/ChangePasswordForm";

export default function useChangePassword() {
  const { mutate: updatePassword, isPending: updatingPassword } = useMutation({
    mutationFn: (values: ChangePasswordValues) => handleChangePassword(values),
    onSuccess: () => {
      toast.success("Password Changed Successfully");
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
  return { updatePassword, updatingPassword };
}
