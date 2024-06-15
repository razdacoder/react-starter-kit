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
import { loginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { z } from "zod";
import useGetAuthUrl from "../hooks/useGetAuthUrl";
import useLogin from "../hooks/useLogin";

export type LoginFormValues = z.infer<typeof loginSchema>;
export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const { login, loggingIn } = useLogin();
  const { getAuthUrl, gettingUrl } = useGetAuthUrl();

  function onSubmit(values: LoginFormValues) {
    login(values);
  }
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Link
                to="/reset-password"
                className="ml-auto flex justify-end  text-sm underline"
              >
                Forgot your password?
              </Link>
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
            </div>

            <SubmitButton loading={loggingIn}>Login</SubmitButton>
          </form>
        </Form>
        <div className="grid gap-4">
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
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
