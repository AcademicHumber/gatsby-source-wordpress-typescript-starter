import React from "react";
import { graphql, PageProps } from "gatsby";

export default function BlogPost({ data }: PageProps<Queries.Query>) {
  const post = data.allWpPost.nodes[0];
  console.log(post);
  return (
    <div>
      <h1>{post.title}</h1>
      {post.content && (
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      )}
    </div>
  );
}
export const query = graphql`
  query ($slug: String!) {
    allWpPost(filter: { slug: { eq: $slug } }) {
      nodes {
        title
        content
      }
    }
  }
`;
