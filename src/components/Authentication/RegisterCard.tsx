"use client";

import { z } from "zod";
import { signUp, confirmSignUp } from "aws-amplify/auth";

import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { confirmationFormSchema, registerFormSchema } from "./RegisterCard/schemas";
import { VerificationForm } from "./RegisterCard/VerificationForm";
import { RegistrationForm } from "./RegisterCard/RegistrationForm";
import useAuthentication from "@/hooks/useAuthenticator";

interface RegisterCardProps {
  setTab(tab: "login" | "register"): void
  setDialogOpen(open: boolean): void;
}

export default function RegisterCard({ setTab, setDialogOpen }: RegisterCardProps) {
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState<
    "register" | "verification" | "complete"
  >("register");
  const [userName, setUserName] = useState("");
  const { registerUser, verifyUserRegistration } = useAuthentication();

  useEffect(() => {
    if (currentStep === "complete") {
      toast({
        title: "Registration Successful",
        description: `Thank you for registering with us you can now login!`,
      });
    }
  }, [currentStep]);

  async function onSubmitRegister(values: z.infer<typeof registerFormSchema>) {
    try {
      const { isSignUpComplete } = await registerUser({ name: values.name, email: values.email, password: values.password })
  
      setUserName(values.email);
  
      if (!isSignUpComplete) {
        toast({
          title: "Verify your account",
          description: "An email has been sent to you with a verification code",
        });
        setCurrentStep("verification");
      }
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while signing up", variant: "destructive" })
    }
  }

  async function onSubmitConfirmSignUp(values: z.infer<typeof confirmationFormSchema>) {
    try {
      const { isSignUpComplete } = await verifyUserRegistration({
        email: userName,
        code: values.code,
      });
  
      if (isSignUpComplete) {
        setCurrentStep("complete");
        toast({
          title: "Registration Successful",
          description: `Thank you for registering with us, you can now login!`,
        });
        setTab("login");
      }
    } catch (error) {
      toast({ title: "Error", description: "An error occurred while verifying your account", variant: "destructive" })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Create an account with us to save your books and visit them later at
          anytime!
        </CardDescription>
          {currentStep === "register" ? <RegistrationForm onSubmitRegister={onSubmitRegister} /> : <VerificationForm onSubmitCongirmSignUp={onSubmitConfirmSignUp}/>}
      </CardHeader>
      <CardContent className="space-y-2"></CardContent>
    </Card>
  );
}
