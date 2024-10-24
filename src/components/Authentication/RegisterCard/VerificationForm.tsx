"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { confirmationFormSchema } from "./schemas";
import { Button } from "@/components/ui/button";

interface VerificationCardProps {
  onSubmitCongirmSignUp(values: z.infer<typeof confirmationFormSchema>): Promise<void>
}

export const VerificationForm = ({ onSubmitCongirmSignUp }: VerificationCardProps) => {
  const confirmationForm = useForm<z.infer<typeof confirmationFormSchema>>({
    resolver: zodResolver(confirmationFormSchema),
    defaultValues: {
      code: ""
    }
  });
  
  return (
    <Form {...confirmationForm}>
      <form
        onSubmit={confirmationForm.handleSubmit(onSubmitCongirmSignUp)}
        className="space-y-8"
      >
        <div className="space-y-1">
          <FormField
            control={confirmationForm.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Code" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button>Verify</Button>
      </form>
    </Form>
  )
};