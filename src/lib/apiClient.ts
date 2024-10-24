import { fetchAuthSession } from 'aws-amplify/auth';
import axios, { AxiosError } from 'axios';

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

const client = createAxios(process.env.REACT_APP_API_URL);

export default client;
