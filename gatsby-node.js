const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve("src/templates/blog-post.tsx");

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            html
            frontmatter {
              path
              title
              date
              author
              readTime
            }
          }
        }
      }
    }
  `).then((response) => {
    if (response.errors) {
      return Promise.reject(response.errors);
    }

    response.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
      });
    });
  });
};
