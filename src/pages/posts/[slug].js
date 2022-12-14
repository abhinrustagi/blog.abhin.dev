import { gql, GraphQLClient } from "graphql-request";
import { HYGRAPH_API_URL } from "constant";
import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "styles/Blog.module.css";
import { Container } from "components";
import Image from "next/image";
import dayjs from "dayjs";

export async function getStaticPaths() {
  const requestClient = new GraphQLClient(HYGRAPH_API_URL);

  const query = gql`
    query Posts {
      posts {
        id
        slug
      }
    }
  `;

  const contentData = await requestClient.request(query);
  const paths = contentData.posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const requestClient = new GraphQLClient(HYGRAPH_API_URL);

  const query = gql`
    query getPost($slug: String!) {
      post(where: { slug: $slug }) {
        id
        title
        createdAt
        updatedAt
        slug
        date
        content
        coverImage {
          id
          url
        }
        tags
      }
    }
  `;

  const contentData = await requestClient.request(query, {
    slug: context.params.slug,
  });

  return {
    props: {
      post: {
        ...contentData?.post,
        date: dayjs(contentData.post.date).format("D MMMM YYYY"),
      },
    },
  };
}

export default function Post(props) {
  const { title, content, coverImage, slug, date } = props.post;

  return (
    <div>
      <Container size="sm" className="my-20">
        <span className="block mb-6">{date}</span>
        <h1 className="font-bold text-4xl">{title}</h1>
        <div className="w-full min-h-[28rem] relative overflow-hidden rounded-2xl my-12">
          <Image
            src={coverImage.url}
            alt={slug}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <ReactMarkdown className={styles.wrapper}>{content}</ReactMarkdown>
      </Container>
    </div>
  );
}
