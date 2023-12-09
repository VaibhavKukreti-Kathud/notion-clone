"use client";

import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const fileteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = async (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">,
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };
  const onRemove = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">,
  ) => {
    event.stopPropagation();
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete document.",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm ">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4 " />
        <Input
          value={search}
          onChange={(e) => {
            setSearch;
            e.target.value;
          }}
          className="h-7 px-2 focus-visible: ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center pb-2 text-muted-foreground">
          No documents found
        </p>
        {fileteredDocuments?.map((document) => (
          <div
            key={document._id}
            onClick={() => {
              onClick(document._id);
            }}
            className="flex items-center gap-x-2 p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 cursor-pointer rounded-sm"
          >
            <div className="flex-1 truncate">
              <p className="text-sm">{document.title}</p>
              <p className="text-xs text-muted-foreground">{document.userId}</p>
            </div>
            <div className="flex gap-x-1">
              <div
                onClick={(event) => {
                  onRestore(event, document._id);
                }}
                className="text-xs text-neutral-600 hover:text-neutral-800 cursor-pointer"
              >
                Restore
              </div>
              <div
                onClick={(event) => {
                  onRemove(event, document._id);
                }}
                className="text-xs text-neutral-600 hover:text-neutral-800 cursor-pointer"
              >
                Delete
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
