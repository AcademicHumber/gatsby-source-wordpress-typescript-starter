import { graphql, Link, PageProps } from "gatsby";
import * as React from "react";

const Index = ({ data }: PageProps<Queries.Query>) => {
  return (
    <main>
      <title>Home Page</title>
      {data.allWpPost.nodes.map((node) => (
        <div>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          <Link to={node.slug}>
            <p>{node.title}</p>
          </Link>
        </div>
      ))}
    </main>
  );
};

export const PageQuery = graphql`
  query allWpPosts {
    allWpPost(sort: { fields: [date] }) {
      nodes {
        title
        excerpt
        slug
      }
    }
  }
`;

export default Index;
