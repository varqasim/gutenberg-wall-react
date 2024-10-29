"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import useSearch from "@/hooks/useSearch";
import { useEffect, useState } from "react";
import { Book } from "./Book";
import { useQuery } from "@tanstack/react-query";
import { s3AxiosClient } from "@/lib/apiClient";

const formSchema = z.object({
  bookId: z.string().min(2).max(1000),
});

export default function SearchComponent() {
  const [bookId, setBookId] = useState<string | undefined>(undefined);
  const { isFetching, book } = useSearch({ bookId });
  const [bookContent, setBookContent] = useState<string | undefined>(undefined);
  const [progressValue, setProgressValue] = useState(0);

  useQuery({
    queryKey: [`/books/${book?.id}/content`],
    queryFn: async () => {
      const { data } = await s3AxiosClient.get(book?.url!, {
        headers: {
          Accept: "*/*"
        },
      });
      setBookContent(data);
    },
    enabled: !!book,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setBookId(values.bookId);
  }

  useEffect(() => {
    if (isFetching) {
      const timer = setTimeout(() => setProgressValue(66), 500);
      return () => clearTimeout(timer);
    }
  }, [isFetching]);

  useEffect(() => {
    if (!!book) {
    }
  }, [book]);

  return (
    <div className="flex w-full flex-col items-center justify-items-center space-y-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row items-center justify-between space-x-3"
        >
          <FormField
            control={form.control}
            name="bookId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Gutenberg Book ID"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Go!</Button>
        </form>
      </Form>
      {isFetching && <Progress value={progressValue} />}
      <div className="space-y-10">
        {!isFetching && !!book && (
          <Book bookDetails={book} content={bookContent} />
        )}
      </div>
    </div>
  );
}
