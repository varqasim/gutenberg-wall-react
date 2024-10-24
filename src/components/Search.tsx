"use client"
 
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// import useSearch from "@/hooks/useSearch";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";

const formSchema = z.object({
  bookId: z.string().min(2).max(1000)
});

export default function SearchComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookId: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values })
  }

  return (
    <div className="flex w-full max-w-sm items-center justify-items-center space-x-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="bookId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Gutenberg Book ID" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
        <Button type="submit">Go!</Button>
      </Form>
    </div>
  );
}
