/* eslint-disable @next/next/no-img-element */
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { Container } from "components/Container";

export default function Home({ blogs }) {
  return (
    <main>
      <Container className="my-20">
        <h1 className="text-4xl font-bold leading-normal">
          Hi, I&apos;m Abhin!
          <br />
          This is my writing space.
        </h1>
        <p className="mt-7 mb-16">
          This is my brief corner on the internet to share my thoughts, views
          and information on various things I find interesting.
        </p>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.slug}>
              <Link href={`/${blog.slug}`}>
                <a>
                  <img
                    src={blog.thumbnail}
                    alt={blog.slug}
                    title={blog.title}
                  />
                  {blog.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}

export async function getStaticProps() {
  // List of files in blogs folder
  const filesInBlogs = fs.readdirSync("./content");

  // Get the front matter and slug (the filename without .md) of all files
  const blogs = filesInBlogs.map((filename) => {
    const file = fs.readFileSync(`./content/${filename}`, "utf8");
    const matterData = matter(file);

    return {
      ...matterData.data, // matterData.data contains front matter
      slug: filename.slice(0, filename.indexOf(".")),
    };
  });

  return {
    props: {
      blogs,
    },
  };
}
