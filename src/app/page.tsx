"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import AuthenticationMenu from "@/components/Authentication/AuthenticationMenu";
import SearchComponent from "@/components/Search";
import { queryClient } from "@/lib/apiClient";

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-row space-x-2">
          <AuthenticationMenu />
        </div>
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <SearchComponent />
        </main>
      </div>
    </QueryClientProvider>
  );
}
