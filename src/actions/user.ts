import client from "@/lib/apiClient";

interface CreateUserProfileRes {
  id: string;
  name: string;
  email: string;
}

export const createUserProfile = (userId: string, name: string, email: string) => {
  console.log({ userId, name, email })
  const user = client.post<CreateUserProfileRes>("/users", { id: userId, name, email });
  console.log({ user })
}