import { handleResetPassword } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useResetPassword() {
  const { mutate: resetPassword, isPending: isResetting } = useMutation({
    mutationFn: (email: string) => handleResetPassword(email),
    onSuccess: () => {
      toast.info("Check your email to reset your password");
    },
  });
  return { resetPassword, isResetting };
}
