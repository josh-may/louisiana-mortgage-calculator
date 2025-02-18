import { getServerSideSitemap } from "next-sitemap";
import { getAllPosts } from "../../lib/api";

export const getServerSideProps = async (ctx) => {
  const posts = await getAllPosts();

  const fields = posts.map(({ node }) => ({
    loc: `${process.env.SITE_URL}/blog/${node.slug}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}
