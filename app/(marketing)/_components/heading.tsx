"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents and Plans. Unified. Welcome to{" "}
        <span className=" underline">Votion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Votion is the connected workspace where better, faster work happens
      </h3>
      <Button>
        Enter Votion
        <ArrowRight className="h-4 ml-2 w-4" />
      </Button>
    </div>
  );
};
