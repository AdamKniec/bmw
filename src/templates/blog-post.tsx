import { graphql, Link } from "gatsby";
import React from "react";

import Layout from "../components/Layout";

export default function Template({ data }) {
  console.log(data);
  const post = data.markdownRemark;

  return (
    <Layout>
      <div>
        <h1 className="main-blog-header">{post.frontmatter.title}</h1>
        <p className="metadata-short">
          {post.frontmatter.date} ({post.frontmatter.readTime} min.)
        </p>
        <div className="tags-container">
          {data.markdownRemark.frontmatter.tags.map((tag: string) => {
            return <span className="tag">{tag}</span>;
          })}
        </div>
      </div>
    </Layout>
  );
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        readTime
        title
        author
        tags
        date
      }
    }
  }
`;
