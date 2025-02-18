import Head from "next/head";
import Link from "next/link";
import { getAllPosts } from "../../lib/api";
import { useState, useEffect } from "react";

export default function Blog({ posts }) {
  const [parsedPosts, setParsedPosts] = useState([]);

  useEffect(() => {
    function parseHtmlExcerpt(html) {
      const decoded = html
        .replace(/&#39;/g, "'")
        .replace(/&hellip;/g, "...")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&");

      const div = document.createElement("div");
      div.innerHTML = decoded;
      return div.textContent || div.innerText || "";
    }

    setParsedPosts(
      posts.map(({ node }) => ({
        ...node,
        parsedExcerpt: node.excerpt ? parseHtmlExcerpt(node.excerpt) : "",
      }))
    );
  }, [posts]);

  return (
    <div className="font-serif bg-gray-100 text-black p-5 max-w-4xl mx-auto">
      <Head>
        <title>Illinois Mortgage Calculator Blog</title>
        <meta
          name="description"
          content="Read our latest articles on mortgages and home buying in Illinois"
        />
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
            Latest Posts
          </h2>
          <ul className="space-y-4">
            {parsedPosts.map((node) => (
              <li
                key={node.slug}
                className="border-b border-gray-200 pb-4 last:border-b-0"
              >
                <Link
                  href={`/blog/${node.slug}`}
                  className="block hover:bg-blue-50 p-2 rounded transition-colors"
                >
                  <h3 className="text-blue-600 text-xl font-semibold mb-2">
                    {node.title}
                  </h3>
                  {node.parsedExcerpt && (
                    <p className="text-gray-600">{node.parsedExcerpt}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="bg-blue-700 text-white p-4 border-t-2 border-black mt-5">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>&copy; 2024 Illinois Mortgage Calculator</div>
          <nav className="mt-2 md:mt-0">
            <Link href="/" className="mx-2 hover:underline">
              Home
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

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: { posts },
    revalidate: 60,
  };
}
