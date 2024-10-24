"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, getCurrentUser, fetchAuthSession } from "aws-amplify/auth";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthentication from "@/hooks/useAuthenticator";
import { useToast } from "@/hooks/use-toast";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

interface LoginCardProps {
  setDialogOpen(open: boolean): void;
}

export default function LoginCard({ setDialogOpen }: LoginCardProps) {
  const { toast } = useToast();
  const { loginUser } = useAuthentication();

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "qasimalbaqali@gmail.com",
      password: "Misc8ed9kj81@!!",
    },
  });

  async function onSubmitLogin(values: z.infer<typeof loginFormSchema>) {
    const { isSignedIn } = await loginUser({ email: values.email, password: values.password });
    if (isSignedIn) {
      toast({ title: "Success!", description: "You have successfully logged in" });
      setDialogOpen(false);
    } else {
      toast({ title: "Woomp Woomp!", description: "An error occurred while logging in", variant: "destructive" });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Happy to see you again.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmitLogin)}
            className="space-y-8"
          >
            <div className="space-y-1">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-1">
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
