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

const albums = defineCollection({
	type: "data",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			cover: image(),
		}),
});

export const collections = {
	thoughts,
	essays,
	albums,
};
