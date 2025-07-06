import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2 mt-5  max-w-4xl w-full sm:w-[600px]">
      <div className="relative">
        <div className="flex rounded-lg items-center justify-between border-2 border-input bg-background focus-within:border-primary transition-colors">
          <div className="w-full flex items-center pl-4">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search"
              className="border-0 bg-background px-2 py-7 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Button className="m-1 px-6 py-5 pointer-events-auto font-bold">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
