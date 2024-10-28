import { axiosClient } from "@/lib/apiClient";

type UserProfile = {
  id: string;
  name: string;
  email: string;
}

type CreateUserProfileRes = UserProfile;
type GetUserProfileRes = UserProfile;

export const createUserProfile = async (userId: string, name: string, email: string): Promise<UserProfile> => {
  const { data: user } = await axiosClient.post<CreateUserProfileRes>("/users", { id: userId, name, email });
  return user;
}

export const getUserProfile = async (): Promise<UserProfile> => {
  const { data: user } = await axiosClient.get<GetUserProfileRes>("/users");
  return user;
}