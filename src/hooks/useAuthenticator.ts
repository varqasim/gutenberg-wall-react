import { useEffect } from "react";
import {
  confirmSignUp,
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  signIn,
  signUp,
} from "aws-amplify/auth";

import { User, useUserStore } from "@/store";
import { createUserProfile } from "@/actions/users";

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

      if (isSignedIn) {
        const user = await getAuthenticatedUser();
        if (user) {
          // TODO: Can be improved to set a custom flow for cognito to call the backend API
          await createUserProfile(user.id, user.name, user.email);
        }
      }

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
        const userAttributes = await fetchUserAttributes();
        const authUser = {
          id: currentUser.userId,
          name: userAttributes.name!,
          email: userAttributes.email!,
          authToken: tokens?.accessToken.toString()!,
        };
        setUser(authUser);
        return authUser;
      }

      return;
    } catch (error: any) {
      setUser(undefined);

      if (error?.name === "UserUnAuthenticatedException") {
        return;
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
