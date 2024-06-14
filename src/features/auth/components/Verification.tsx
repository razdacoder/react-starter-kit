import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useVerifyUser from "../hooks/useVerifyUser";
export default function Verification() {
  const { uid, token } = useParams();
  const { verifyUser, verifyingUser } = useVerifyUser({
    uid: uid!,
    token: token!,
  });
  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Account Verification</CardTitle>
        <CardDescription>Verify your account to get started.</CardDescription>
      </CardHeader>
      <CardContent className="w-[400px] space-y-4">
        <Button
          disabled={verifyingUser}
          onClick={() => verifyUser()}
          className="w-full flex items-center gap-x-2"
        >
          {verifyingUser && <Loader2 className="size-4 animate-spin" />}
          Verify Account
        </Button>
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <Link to="/resend-activation" className="text-center text-sm ">
            Resend Activation Email
          </Link>
          <Link to="/register" className="text-center text-sm ">
            Create a new account
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
