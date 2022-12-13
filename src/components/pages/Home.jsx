import { Container } from "components/Container";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home({ posts }) {
  const [tags, setTags] = useState(new Set());

  useEffect(() => {
    if (posts) {
      posts.forEach((post) => {
        setTags((tags) => tags.add(post.tags));
      });
    }
  }, [posts]);

  return (
    <main>
      <Container className="my-16">
        <ul className="mt-8 mb-12 flex flex-wrap">
          {posts.map((post) => (
            <React.Fragment key={post.id}>
              <li className="overflow-hidden w-full lg:w-1/3 md:w-1/2 p-3">
                <Link href={`/posts/${post.slug}`} passHref>
                  <a className="cursor-pointer flex flex-col">
                    <div className="relative min-h-[12rem] rounded-lg overflow-hidden">
                      <Image
                        src={post.coverImage.url || ""}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <h3 className="font-bold text-xl mt-4">{post.title}</h3>
                    <p className="text-normal my-3">{post.excerpt}</p>
                    <p className="text-sm">{post.date}</p>
                  </a>
                </Link>
              </li>
            </React.Fragment>
          ))}
          {/* <div>
          <ReactMarkdown className={styles.wrapper}>
            {props?.contentData.posts[0].content}
          </ReactMarkdown>
        </div> */}
        </ul>
      </Container>
    </main>
  );
}
