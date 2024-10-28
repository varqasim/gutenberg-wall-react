import { Book } from "@/actions/books";
import { axiosClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function useSearch({ bookId }: { bookId?: string }) {
  const {
    error,
    data: book,
    isFetching,
  } = useQuery({
    queryKey: [`/books/${bookId}`],
    queryFn: async () => {
      const { data } = await axiosClient.get<Book>(`books/${bookId}`);
      return data;
    },
    enabled: !!bookId,
  });

  return {
    isFetching,
    book,
    error,
  };
}
