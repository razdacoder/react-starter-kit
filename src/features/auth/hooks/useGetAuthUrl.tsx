import { handleGetAuthorizationUrl } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useGetAuthUrl() {
  const { mutate: getAuthUrl, isPending: gettingUrl } = useMutation({
    mutationFn: (data: { redirect_uri: string; provider: string }) =>
      handleGetAuthorizationUrl(data.redirect_uri, data.provider),
    onSuccess: (data) => {
      window.location.href = data.authorization_url;
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
  return { getAuthUrl, gettingUrl };
}
