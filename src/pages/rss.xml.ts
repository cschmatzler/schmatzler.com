import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts", ({ data }) => {
    return !data.draft;
  });

  const rssItems = posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf())
    .map(({ data, slug }) => {
      const title = data.title;
      const pubDate = data.date;
      const link = `${context.site?.origin}/blog/${slug}`;

      return {
        title,
        pubDate,
        link,
      };
    });

  return rss({
    title: "Christoph Schmatzler",
    description: "My brain, in writing. Software Engineer, open source enthusiast and occasionally funny.",
    site: context.site ?? "https://schmatzler.com",
    items: rssItems,
  });
}
