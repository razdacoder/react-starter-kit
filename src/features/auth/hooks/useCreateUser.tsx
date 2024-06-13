import { handleRegister } from "@/lib/api/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { RegisterFormValues } from "../components/RegisterForm";

export default function useCreateUser() {
  const { mutate: createUser, isPending: creatingUser } = useMutation({
    mutationFn: (values: RegisterFormValues) => handleRegister(values),
    onSuccess: () => {
      toast.success("Account Created Successfully");
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
  return { createUser, creatingUser };
}
