// src/content.config.ts
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const article = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/article" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
  }),
});

export const collections = { article };