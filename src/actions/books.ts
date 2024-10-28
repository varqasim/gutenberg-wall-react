"use client";

import { axiosClient, queryClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export type Book = {
  title: string;
  author: string;
  publishedOn: string;
  url: string;
}

export const getBookById = async (bookId: string) => {
  let book = queryClient.getQueriesData<Book>({
    queryKey: [`/books/${bookId}`]
  });

  if (!book) {
    const { isPending, error, data: book, isFetching } = useQuery({ queryKey: [`/books/${bookId}`], queryFn: async () => {
      const { data } = await axiosClient.get<Book>(`v1/books/${bookId}`);
      return data;
    }});

    return book;

  } else {
    return book;
  }

}

export const getBookContent = async (url: string) => {
  return;
}