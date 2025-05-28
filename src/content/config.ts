import { z, defineCollection } from "astro:content";

const thoughts = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		date: z.date(),
		draft: z.boolean().default(true),
	}),
});

const essays = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		date: z.date(),
		draft: z.boolean().default(true),
	}),
});

export const collections = {
	thoughts: thoughts,
	essays: essays,
};
