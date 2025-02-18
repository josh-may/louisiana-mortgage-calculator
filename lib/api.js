import { GraphQLClient } from "graphql-request";

const API_URL = "https://blog.mortgagecalculatorillinois.com/graphql";

export async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };
  const client = new GraphQLClient(API_URL, { headers });
  return client.request(query, variables);
}

export async function getAllPosts() {
  const data = await fetchAPI(`
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
          }
        }
      }
    }
  `);
  return data?.posts?.edges || [];
}

export async function getPostBySlug(slug) {
  const data = await fetchAPI(
    `
      query PostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          title
          excerpt
          content
          date
          slug
          author {
            node {
              name
            }
          }
        }
      }
    `,
    {
      variables: { slug },
    }
  );
  return data?.post;
}
