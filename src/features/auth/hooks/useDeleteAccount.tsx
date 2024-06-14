import { handleDeleteAccount } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useDeleteAccount() {
  const { mutate: deleteAccount, isPending: isDeleting } = useMutation({
    mutationFn: (current_password: string) =>
      handleDeleteAccount(current_password),

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
  return { deleteAccount, isDeleting };
}
