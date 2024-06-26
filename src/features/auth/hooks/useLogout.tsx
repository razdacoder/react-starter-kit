import { handleLogout } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useLogout() {
  const { mutate: logout, isPending: loggingOut } = useMutation({
    mutationFn: () => handleLogout(),
    onSuccess: () => {
      toast.success("Logout Successfully");
      window.location.reload();
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
  return { logout, loggingOut };
}
