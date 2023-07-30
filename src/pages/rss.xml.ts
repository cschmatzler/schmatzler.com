import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const get = async () => {
  const baseUrl = "https://schmatzler.dev";
  const posts = await getCollection("blog")
  const sortedPosts = posts
    .filter((p) => p.data.draft !== true)
    .sort(
      (a, b) =>
        new Date(b.data.date).valueOf() -
        new Date(a.data.date).valueOf()
    );

  const rssItems = sortedPosts.map(({ data, slug }) => {
    const title = data.title;
    const pubDate = data.date;
    const description = data.description;
    const link = `${baseUrl}/blog/${slug}`;

    return {
      title,
      pubDate,
      description,
      link,
    };
  });

  return rss({
    title: "Christoph Schmatzler",
    description: "Really, another blog?",
    site: baseUrl,
    items: rssItems,
  });
};
