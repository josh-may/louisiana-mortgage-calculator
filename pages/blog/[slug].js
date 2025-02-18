import Head from "next/head";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "../../lib/api";

export default function Post({ post }) {
  return (
    <div className="font-serif bg-gray-100 text-black p-5 max-w-4xl mx-auto">
      <Head>
        <title>{post.title} | Illinois Mortgage Calculator Blog</title>
        <meta
          name="description"
          content={
            post.excerpt ||
            "Read our latest article on mortgages and home buying in Illinois"
          }
        />
        <link
          rel="canonical"
          href={`https://mortgagecalculatorillinois.com/blog/${post.slug}`}
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <header className="bg-gradient-to-b from-blue-700 to-blue-500 p-5 text-center mb-5 border-2 border-black">
        <h1 className="text-white text-3xl font-bold mb-2">
          Illinois Mortgage Calculator Blog
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Stay informed about mortgages and home buying in Illinois
        </p>
      </header>

      <main className="flex flex-col gap-5">
        <section className="bg-white border-2 border-gray-400 p-5 shadow-md">
          <h2 className="text-blue-800 text-2xl font-bold mb-4">
            {post.title}
          </h2>
          <div className="text-gray-600 text-sm mb-4">
            {post.date && (
              <p>Published on: {new Date(post.date).toLocaleDateString()}</p>
            )}
            {post.author && post.author.node && (
              <p>Written by: {post.author.node.name}</p>
            )}
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>

        <section className="bg-blue-100 border-2 border-blue-400 p-5 shadow-md">
          <Link href="/blog" className="text-blue-600 hover:underline">
            &larr; Back to all posts
          </Link>
        </section>
      </main>

      <footer className="bg-blue-700 text-white p-4 border-t-2 border-black mt-5">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>&copy; 2024 Illinois Mortgage Calculator</div>
          <nav className="mt-2 md:mt-0">
            <Link href="/" className="mx-2 hover:underline">
              Home
            </Link>
            <Link href="/blog" className="mx-2 hover:underline">
              Blog
            </Link>
            <Link href="/contact" className="mx-2 hover:underline">
              Contact
            </Link>
            <Link href="/about" className="mx-2 hover:underline">
              About
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  return {
    props: { post },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: "blocking",
  };
}
