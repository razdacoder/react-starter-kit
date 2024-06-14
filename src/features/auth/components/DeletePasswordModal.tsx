import { Trash2 } from "lucide-react";

import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { deleteAccountSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useDeleteAccount from "../hooks/useDeleteAccount";

export function DeletePasswordModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.input<typeof deleteAccountSchema>>({
    resolver: zodResolver(deleteAccountSchema),
  });
  const { deleteAccount, isDeleting } = useDeleteAccount();

  function onSubmit(values: z.input<typeof deleteAccountSchema>) {
    deleteAccount(values.current_password, {
      onSuccess: () => {
        setOpen(false);
        window.location.reload();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="flex gap-x-2 items-center">
          <Trash2 className="size-4" /> Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Enter your password to delete account.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="current_password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-start">
              <SubmitButton loading={isDeleting}>Delete Account</SubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
