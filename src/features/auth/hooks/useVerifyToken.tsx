import { handleVerifyToken } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";

export default function useVerifyToken() {
  const { mutate: verifyToken, isPending: verifying } = useMutation({
    mutationFn: () => handleVerifyToken(),
  });
  return { verifyToken, verifying };
}
