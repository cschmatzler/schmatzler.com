import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
	const essays = await getCollection("essays", ({ data }) => {
		return !data.draft;
	});

	const rssItems = essays
		.filter((p) => !p.data.draft)
		.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf())
		.map(({ data, slug }) => {
			const title = data.title;
			const pubDate = data.date;
			const link = `${context.site?.origin}/essays/${slug}`;

			return {
				title,
				pubDate,
				link,
			};
		});

	return rss({
		title: "Christoph Schmatzler - Essays",
		description: "Long-form essays and deep thoughts",
		site: context.site ?? "https://schmatzler.com",
		items: rssItems,
	});
}
