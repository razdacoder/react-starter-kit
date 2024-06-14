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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useUpdateUser from "../hooks/useUpdateUser";

export type UpdateUserValues = z.input<typeof updateUserSchema>;
type Props = {
  user: User;
};
export default function UpdateAccountForm({ user }: Props) {
  const form = useForm<UpdateUserValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });
  const { updateUser, updatingUser } = useUpdateUser();

  function onSubmit(values: UpdateUserValues) {
    updateUser(values);
  }
  return (
    <Card className=" max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Update Account</CardTitle>
        <CardDescription>
          Enter your information to update your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label>Email</Label>
                <Input disabled value={user?.email} />
              </div>
              <div className="flex items-center gap-x-4">
                <FormField
                  name="first_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input id="first-name" placeholder="Max" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="last_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input
                          id="last-name"
                          placeholder="Robinson"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <SubmitButton loading={updatingUser}>Update Account</SubmitButton>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
