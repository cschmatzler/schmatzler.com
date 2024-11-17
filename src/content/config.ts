import { z, defineCollection } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    draft: z.boolean().default(true),
  }),
});

export const collections = {
  posts: posts,
};
