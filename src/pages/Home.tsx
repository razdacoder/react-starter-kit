import { Button } from "@/components/ui/button";
import ChangePasswordForm from "@/features/auth/components/ChangePasswordForm";
import UpdateAccountForm from "@/features/auth/components/UpdateAccountForm";
import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
import { Loader2, LogOut, Trash2 } from "lucide-react";

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
    <main className="min-h-screen flex flex-col justify-center items-center gap-4">
      <div className="flex items-center space-x-4">
        <UpdateAccountForm user={user!} />
        <ChangePasswordForm user={user!} />
      </div>
      <div className="flex justify-between items-center gap-x-8">
        <Button variant="destructive" className="flex gap-x-2 items-center">
          <Trash2 className="size-4" /> Delete Account
        </Button>
        <Button variant="destructive" className="flex gap-x-2 items-center">
          <LogOut className="size-4" /> Logout
        </Button>
      </div>
    </main>
  );
}
