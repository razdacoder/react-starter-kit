import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "react-router-dom";
export default function Verification() {
  const { uid, token } = useParams();
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Account Verification</CardTitle>
        <CardDescription>Verify your account to get started.</CardDescription>
      </CardHeader>
      <CardContent className="w-[320px]">
        <Button type="submit" className="w-full">
          Verify Account
        </Button>
      </CardContent>
    </Card>
  );
}
