import ChangePasswordForm from "@/features/auth/components/ChangePasswordForm";
import UpdateAccountForm from "@/features/auth/components/UpdateAccountForm";
import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { user, isLoading } = useCurrentUser();

  if (!user || isLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen flex justify-center items-center space-x-4">
      <UpdateAccountForm user={user!} />
      <ChangePasswordForm user={user!} />
    </main>
  );
}
