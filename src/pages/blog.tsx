import { graphql, Link } from "gatsby";
import * as React from "react";
// import { Link } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/seo";

const Blog = (props) => {
  console.log(props);
  return (
    <Layout>
      <Seo title="Blog" />
      <div className="articles-list">
        {props.data.allMarkdownRemark.edges.map((article) => {
          return (
            <Link
              to={article.node.frontmatter.path}
              key={article.node.frontmatter.title}
            >
              {article.node.frontmatter.title}
            </Link>
          );
          // console.log(article.node.frontmatter.title);
        })}
      </div>
      {/* <Link to="/">Go back to the homepage</Link> */}
    </Layout>
  );
};

export const allBlogPosts = graphql`
  query allPostsQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            path
            title
            tags
            readTime
            date
            author
          }
        }
      }
    }
  }
`;
export default Blog;
