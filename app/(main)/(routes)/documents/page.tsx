"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = async () => {
    const promise = create({
      title: "Untitled",
    });
    toast.promise(promise, {
      loading: "Creating new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
    await promise;
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        alt="No documents illustration"
        height="300"
        width="300"
        className="dark:hidden"
      />
      <Image
        src="/empty dark.png"
        alt="No documents illustration"
        height="300"
        width="300"
        className="hidden dark:block"
      />
      <h2 className="text-lg  font-medium">
        Hi <b>{user?.firstName} lund</b>, This is your Votion
      </h2>
      <Button onClick={onCreate} variant="secondary" className={cn("gap-x-2")}>
        <PlusCircle className="h-4 w-4 mr-[3px] "></PlusCircle>
        Start by creating a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
