/* eslint-disable react/jsx-no-comment-textnodes */
import fs from "fs";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import styles from "styles/Blog.module.css";
import { Container } from "components/Container";
import Link from "next/link";
import { FaMedium, FaDev } from "react-icons/fa";

const icons = {
  Medium: FaMedium,
  "Dev.to": FaDev,
};

export default function Blog({ frontmatter, markdown }) {
  return (
    <Container size="sm" className="my-20">
      <p className="text-lg font-medium mb-5">
        {frontmatter.type} <span className="inline-block mx-4">//</span>{" "}
        {frontmatter.date}
      </p>

      <h1 className="text-4xl leading-normal font-bold">{frontmatter.title}</h1>
      {frontmatter?.availableOn?.length > 0 && (
        <div className="my-5 flex items-center">
          Published on
          <ul className="ml-5 flex">
            {frontmatter.availableOn.map((platform) => {
              const Icon = icons[platform.platform];

              return (
                <li key={platform.platform} className="inline-block">
                  <Link href={platform?.src} passHref>
                    <a className="flex items-center font-medium">
                      <Icon className="w-7 h-7 mr-3" />
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className={styles.wrapper}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </Container>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const fileContent = matter(fs.readFileSync(`./content/${slug}.md`, "utf8"));
  let frontmatter = fileContent.data;
  const markdown = fileContent.content;

  return {
    props: { frontmatter, markdown },
  };
}

export async function getStaticPaths() {
  const filesInProjects = fs.readdirSync("./content");

  // Getting the filenames excluding .md extension
  // and returning an array containing slug (the filename) as params for every route
  // It looks like this
  // paths = [
  //		{ params: { slug: 'my-first-blog' }},
  // ]
  const paths = filesInProjects.map((file) => {
    const filename = file.slice(0, file.indexOf("."));
    return { params: { slug: filename } };
  });

  return {
    paths,
    fallback: false, // This shows a 404 page if the page is not found
  };
}
