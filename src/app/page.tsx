import AuthenticationMenu from "@/components/AuthenticationMenu";
import SearchComponent from "@/components/Search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      
      <div className="flex flex-row space-x-2">
        <AuthenticationMenu />
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <SearchComponent />
      </main>
    </div>
  );
}
