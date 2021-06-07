import { graphql, Link } from "gatsby";
import React from "react";

export default function Template({ data }) {
  const post = data.markdownRemark;

  return (
    <div>
      <Link to="/blog">Go Back</Link>
      <h1>{post.frontmatter.title}</h1>
      <p>Autor: {post.frontmatter.title}</p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        author
        date
      }
    }
  }
`;
