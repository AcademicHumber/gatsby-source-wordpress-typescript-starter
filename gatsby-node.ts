import type { GatsbyNode } from "gatsby";
import path from "path";

export const createPages: GatsbyNode["createPages"] = ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  return graphql(`
    {
      allWpPost(sort: { fields: [date] }) {
        nodes {
          title
          excerpt
          content
          slug
        }
      }
    }
  `).then((result) => {
    const data = result.data as Queries.Query;
    data.allWpPost.nodes.forEach((node) => {
      if (!node.slug) return;
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/blog-post.tsx`),
        context: {
          slug: node.slug,
        },
      });
    });
  });
};

// We have to define explicit non nullable fields in order to avoid "possibly null" errors
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    actions.createTypes(`
    type WpPost {        
        title: String!
        slug: String!
        excerpt: String!
        content: String!
    }
    `);
  };
