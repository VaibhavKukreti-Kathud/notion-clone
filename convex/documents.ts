import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const documents = await context.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument),
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const uderId = identity.subject;
    const document = await context.db.insert("documents", {
      title: args.title,
      userId: uderId,
      parentDocument: args.parentDocument,
      isPublished: false,
      isArchived: false,
    });

    return document;
  },
  //   output: v.id("documents"),
  //   async resolver({ input, context }) {
  //     const doc = await context.db.documents.create(input);
  //     return doc.id;
  //   },
});

export const getAllDocuments = query({
  handler: async (context) => {
    const identity = await context.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const documents = await context.db.query("documents").collect();
    return documents;
  },
});
