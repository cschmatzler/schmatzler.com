import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: any) {
	const posts = await getCollection("posts", ({ data }) => {
		return data.draft === false;
	});

	const rssItems = posts
		.filter((p) => p.data.draft !== true)
		.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf())
		.map(({ data, slug }) => {
			const title = data.title;
			const pubDate = data.date;
			const description = data.description;
			const link = `${context.site.origin}/blog/${slug}`;

			return {
				title,
				pubDate,
				description,
				link,
			};
		});

	return rss({
		title: "Christoph Schmatzler",
		description:
			"Somewhere inbetween literal heaven and hell, unable to decide whether this is finally an attempt at creating a professional presence, an outlet for writing practice or wanting to micro- blog about whatever I had for dinner last night, you are definitely in for a surprise with every link you follow.",
		site: context.site,
		items: rssItems,
	});
}
