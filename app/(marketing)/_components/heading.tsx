"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents and Plans. Unified. Welcome to{" "}
        <span className=" underline">Votion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Votion is the connected workspace where better, faster work happens
      </h3>
      {isLoading && (
        <div className="w-full justify-center items-center flex h-[40px]">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Votion
            <ArrowRight className="h-4 ml-2 w-4" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Votion free
            <ArrowRight className="h-4 ml-2 w-4" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
