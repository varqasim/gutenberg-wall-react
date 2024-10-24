import { useEffect } from "react";
import {
  confirmSignUp,
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signUp,
} from "aws-amplify/auth";
import { shallow } from "zustand/shallow";

import { User, useUserStore } from "@/store";

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

interface VerifyParams {
  email: string;
  code: string;
}

export default function useAuthentication() {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const registerUser = async (params: RegisterParams) => {
    const { isSignUpComplete } = await signUp({
      username: params.email,
      password: params.password,
      options: {
        userAttributes: {
          name: params.name,
          email: params.email,
        },
      },
    });

    return { isSignUpComplete };
  };

  const verifyUserRegistration = async (params: VerifyParams) => {
    try {
      const { isSignUpComplete, nextStep, userId } = await confirmSignUp({
        username: params.email,
        confirmationCode: params.code,
      });
  
      await getAuthenticatedUser();
  
      console.log({ isSignUpComplete, nextStep, userId })
  
      return { isSignUpComplete };
    } catch (error) {
      console.error(error);
      return { isSignUpComplete: false };
    }
  };

  const loginUser = async (params: LoginParams) => {
    try {
      const { isSignedIn } = await signIn({
        username: params.email,
        password: params.password,
      });

      await getAuthenticatedUser();

      return { isSignedIn };
    } catch (error) {
      console.error(error);
      return { isSignedIn: false };
    }
  };

  const getAuthenticatedUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        const { tokens } = await fetchAuthSession();
        const userAttributes = { name: "hello", email: "hello" };
        const authUser = {
          name: userAttributes.name!,
          email: userAttributes.email!,
          authToken: tokens?.accessToken.toString()!,
        };
        setUser(authUser);
      }

      return user;
    } catch (error: any) {
      if (error?.name === "UserUnAuthenticatedException") {
        setUser(undefined);
      }
      
      console.error(error);
    }
  };

  useEffect(() => {
    getAuthenticatedUser();
  }, []);

  return {
    user: useUserStore((state) => state.user),
    loginUser,
    registerUser,
    verifyUserRegistration,
  };
}
