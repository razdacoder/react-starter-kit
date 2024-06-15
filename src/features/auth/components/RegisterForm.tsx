import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
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
import { registerSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import useCreateUser from "../hooks/useCreateUser";
import useGetAuthUrl from "../hooks/useGetAuthUrl";

export type RegisterFormValues = z.input<typeof registerSchema>;
export default function RegisterForm() {
  const { createUser, creatingUser } = useCreateUser();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      re_password: "",
    },
  });

  const { getAuthUrl, gettingUrl } = useGetAuthUrl();

  function onSubmit(values: RegisterFormValues) {
    createUser(values, {
      onSuccess: () => {
        toast.info("Check you email to activate your account.");
        form.reset();
      },
    });
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="me@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="re_password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input id="re_password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton loading={creatingUser}>
                Create an account
              </SubmitButton>
            </form>
          </Form>
          <div className="space-y-2 grid">
            <span className="text-center text-sm uppercase">
              OR Continue with
            </span>
            <div className="flex items-center gap-x-3">
              <Button
                disabled={gettingUrl}
                onClick={() =>
                  getAuthUrl({
                    redirect_uri: "http://localhost:3000/auth/google",
                    provider: "google-oauth2",
                  })
                }
                variant="outline"
                className="w-full flex gap-x-2 items-center"
              >
                <FaGoogle />
              </Button>
              <Button
                disabled={gettingUrl}
                onClick={() =>
                  getAuthUrl({
                    redirect_uri: "http://localhost:3000/auth/github",
                    provider: "github",
                  })
                }
                variant="outline"
                className="w-full flex gap-x-2 items-center"
              >
                <FaGithub />
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
