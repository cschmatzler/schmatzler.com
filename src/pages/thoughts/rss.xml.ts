import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
	const thoughts = await getCollection("thoughts", ({ data }) => {
		return !data.draft;
	});

	const rssItems = thoughts
		.filter((p) => !p.data.draft)
		.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf())
		.map(({ data, slug }) => {
			const title = data.title;
			const pubDate = data.date;
			const link = `${context.site?.origin}/thoughts/${slug}`;

			return {
				title,
				pubDate,
				link,
			};
		});

	return rss({
		title: "Christoph Schmatzler - Thoughts",
		description: "Random thoughts and quick notes",
		site: context.site ?? "https://schmatzler.com",
		items: rssItems,
	});
}
