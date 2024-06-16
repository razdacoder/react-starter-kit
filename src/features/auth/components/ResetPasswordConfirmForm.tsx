import SubmitButton from "@/components/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPasswordConfirmSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import useResetPasswordConfirm from "../hooks/useResetPasswordConfirm";

export type ResetPasswordConfirmValues = z.input<
  typeof resetPasswordConfirmSchema
>;
export default function ResetPasswordConfirmForm() {
  const { uid, token } = useParams();

  const form = useForm<ResetPasswordConfirmValues>({
    resolver: zodResolver(resetPasswordConfirmSchema),
    defaultValues: {},
  });

  const { resetPasswordConfirm, isResetting } = useResetPasswordConfirm();

  function onSubmit(values: ResetPasswordConfirmValues) {
    resetPasswordConfirm({ values, uid: uid!, token: token! });
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your new password to reset password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="new_password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="re_new_password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <SubmitButton loading={isResetting}>Reset Password</SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
