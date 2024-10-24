
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerFormSchema } from "./schemas";


interface RegistrationCardProps {
  onSubmitRegister(values: z.infer<typeof registerFormSchema>): Promise<void>;
}

export const RegistrationForm = ({ onSubmitRegister }: RegistrationCardProps) => {
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "Qasim",
      email: "qasimalbaqali@gmail.com",
      password: "Misc8ed9kj81@!!",
      confirmPassword: "Misc8ed9kj81@!!",
    },
  });

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmitRegister)}
        className="space-y-8"
      >
        <div className="space-y-1">
          <FormField
            control={registerForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-1">
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-1">
          <FormField
            control={registerForm.control}
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
        <div className="space-y-1">
          <FormField
            control={registerForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
          <Button type="submit">Register</Button>
      </form>
    </Form>
  );
};
