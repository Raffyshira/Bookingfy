import SearchBar from "@/components/search/search-events";
import { Button } from "@/components/ui/button";
import { PlayCircleIcon, ZapIcon } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="container overflow-hidden p-4 sm:p-6 lg:p-12 xl:p-24">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl sm:text-7xl font-extrabold">
          Discover event happening near you
        </h1>
        <h4 className="mt-3.5 text-base sm:text-2xl">
          Explore a variety of events from concert to workshop, tailored to your
          interests
        </h4>
        <SearchBar />
      </div>
    </div>
  );
};

export default HeroSection;
