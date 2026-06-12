// src/content.config.ts
import { defineCollection } from "astro:content";
import { z } from "astro/zod"; // 警告の通り、zod専用のパスに変更
import { glob } from "astro/loaders"; // フォルダから読み込むためのローダーを追加

const articleCollection = defineCollection({
  // type: "content" は不要になり、代わりにloaderで対象ファイルを指定する
  loader: glob({ pattern: "**/*.md", base: "./content/article" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
  }),
});

export const collections = {
  "article": articleCollection,
};