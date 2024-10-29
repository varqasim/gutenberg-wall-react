import type { Book } from "@/actions/books";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";


interface BookProps {
  bookDetails: Book;
  content?: string;
}

export function Book({ bookDetails, content }: BookProps) {
  console.log(content)
  return (
    <div>
      <Card>
          <CardHeader>
            <CardTitle>{bookDetails.title}</CardTitle>
            <CardDescription>{bookDetails.author} - {bookDetails.publishedOn}</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72 w-100 rounded-md border p-4">
              <p style={{ whiteSpace: 'pre-wrap' }}>{content}</p>
            </ScrollArea>
          </CardContent>
        </Card>
    </div>
  );
}
