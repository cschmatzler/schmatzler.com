import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function get(context: any) {
  const posts = await getCollection("posts");

  const rssItems = posts
    .filter((p) => p.data.draft !== true)
    .sort(
      (a, b) =>
        new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
    )
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
      "Developer. Presumed blog publisher. Self-proclaimed okay at doing things.",
    site: context.site,
    items: rssItems,
  });
}
