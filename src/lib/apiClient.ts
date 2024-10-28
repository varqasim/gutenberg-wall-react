import { fetchAuthSession } from 'aws-amplify/auth';
import axios, { AxiosError } from 'axios';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const createAxios = (baseURL: any) => {
  const newInstance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
  });

  newInstance.interceptors.request.use(
    async (options) => {
      try {
        const { tokens } = await fetchAuthSession();
        if (options.headers) {
          options.headers['Authorization'] = `Bearer ${tokens?.accessToken}`;
        }

        return options;
      } catch {
        return {
          ...options,
          cancelToken: new axios.CancelToken((cancel) => cancel())
        };
      }
    },
    (error) => Promise.reject(error)
  );

  newInstance.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
      console.error(error);
      // toast({ title: "Error", description: error?.message, variant: "destructive" });
      return Promise.reject(error);
    }
  );

  return newInstance;
};

export const axiosClient = createAxios(process.env.REACT_APP_API_URL);

const CACHE_PERSIST_TIME = 24 * 60 * 60 * 1000 * 3;
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: CACHE_PERSIST_TIME,
    },
  },
});