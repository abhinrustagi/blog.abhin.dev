import { gql, GraphQLClient } from "graphql-request";
import { HYGRAPH_API_URL } from "constant";
import React from "react";
import Home from "components/pages/Home";

export default function HomePage(props) {
  return <Home posts={props.posts} />;
}

export async function getServerSideProps() {
  const requestClient = new GraphQLClient(HYGRAPH_API_URL);

  const query = gql`
    query Posts {
      posts(orderBy: date_DESC) {
        id
        title
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

  const contentData = await requestClient.request(query);

  return {
    props: {
      posts: contentData.posts,
    },
  };
}
