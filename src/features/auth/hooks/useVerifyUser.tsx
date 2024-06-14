import { handleAccountVerification } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
  uid: string;
  token: string;
};
export default function useVerifyUser({ uid, token }: Props) {
  const navigate = useNavigate();
  const { mutate: verifyUser, isPending: verifyingUser } = useMutation({
    mutationFn: () => handleAccountVerification(uid, token),
    onSuccess: () => {
      toast.success("Email Verification Successful");
      navigate("/login");
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
  return { verifyUser, verifyingUser };
}
