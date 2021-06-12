import { graphql, Link } from "gatsby";
import React from "react";
import { StaticImage } from "gatsby-plugin-image";
// import Img from "gatsby-image"; // UNINSTALL JAK NIE ZADZIALA
import Layout from "../components/Layout";

export default function Template({ data }) {
  console.log(data);
  const post = data.markdownRemark;

  return (
    <Layout>
      <div>
        {/* <Link to="/blog">Go Back</Link> */}
        <h1 className="main-blog-header">{post.frontmatter.title}</h1>
        {/* <p>Autor: {post.frontmatter.title}</p> */}
        <p className="metadata-short">
          {post.frontmatter.date} ({post.frontmatter.readTime} min.)
        </p>
        {/* {data.markdownRemark.frontmatter.imgs.map((imgPath) => {
          const imgPatha = `../images/${imgPath}`;

          return <StaticImage src={imgPatha} alt="asdasd" />;
        })} */}
        <StaticImage src="../images." alt=" s" />
        {/* <StaticImage src="../images/typescript.svg" alt="asdasd" /> */}
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
        imgs
        date
      }
    }
  }
`;
