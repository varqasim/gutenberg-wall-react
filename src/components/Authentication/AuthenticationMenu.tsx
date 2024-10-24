"use client";

import { Amplify } from "aws-amplify";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LoginCard from "./LoginCard";
import { Button, buttonVariants } from "../ui/button";
import RegisterCard from "./RegisterCard";
import { useEffect, useState } from "react";
import useAuthentication from "@/hooks/useAuthenticator";
import { useUserStore } from "@/store";

enum TabsEnum {
  "login" = "login",
  "register" = "register",
}

// TODO: init on app creation
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.REACT_COGNITO_USER_POOL_CLIENT_ID!,
      identityPoolId: process.env.REACT_COGNITO_IDENTITY_POOL_ID!,
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: false,
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
});

export default function AuthenticationMenu() {
  const { user } = useAuthentication();
  const [selectedTab, setTab] = useState<TabsEnum>(TabsEnum.login);
  const [open, setOpen] = useState(false);

  const onTabChange = (tab: string) => {
    setTab(tab as TabsEnum);
  };

  return (
    <>
      {user ? (
        <div className="flex">Welcome {user.name}!</div>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <NavigationMenu>
            <NavigationMenuList>
              <DialogTrigger value="login">
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Login
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </DialogTrigger>
              <DialogTrigger value="register">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={buttonVariants({ variant: "default" })}
                  >
                    Register
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </DialogTrigger>
            </NavigationMenuList>
          </NavigationMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Welcome to Gutenberg Wall!</DialogTitle>
            </DialogHeader>
            <Tabs
              value={selectedTab}
              onValueChange={onTabChange}
              className="w-[400px]"
            >
              <TabsList>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginCard setDialogOpen={setOpen} />
              </TabsContent>
              <TabsContent value="register">
                <RegisterCard setTab={onTabChange} setDialogOpen={setOpen} />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
