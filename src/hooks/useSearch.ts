import { useEffect, useState } from "react";

export default function useSearch() {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log({ searchTerm });
  }, [searchTerm]);

  return {
    setSearchTerm
  }
}