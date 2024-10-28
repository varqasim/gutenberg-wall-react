import type { Book } from "@/actions/books";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface BookProps {
  bookDetails: Book;
  content?: string;
}

export function Book({ bookDetails, content }: BookProps) {
  return (
    <div>
      <Card>
          <CardHeader>
            <CardTitle>{bookDetails.title}</CardTitle>
            <CardDescription>{bookDetails.author} - {bookDetails.publishedOn}</CardDescription>
          </CardHeader>
          <CardContent>
            {content}
          </CardContent>
        </Card>
    </div>
  );
}
