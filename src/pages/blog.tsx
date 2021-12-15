import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { PostsAndImagesData } from ".";
import ArticleCardLink from "../components/ArticleCardLink/ArticleCardLink";

import Layout from "../components/Layout/Layout";
import Seo from "../components/Seo/seo";

const Blog = (props: PostsAndImagesData) => {
  const { data } = props;

  return (
    <Layout>
      <Seo
        title="Boli Mnie Web - Blog"
        description="Artykuły związane ze światem web-developmentu"
        lang="pl-PL"
      />
      <div className="articles-list">
        <div className="intro-wrapper">
          <h1 className="blog-main-heading">blog</h1>
          <StaticImage src="../images/brain.png" alt="" className="brain-img" />
        </div>
        <div className="articles-container">
          {data.allMarkdownRemark.edges.map((article, i) => {
            return (
              <ArticleCardLink
                post={article}
                imgData={data}
                key={i.toString()} // TODO - take the id from the graphQL if possible
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export const allBlogPosts = graphql`
  query allPostsQuery {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          frontmatter {
            tags
            path
            title
            intro
            author
          }
        }
      }
    }
    allImageSharp(
      filter: { fluid: { src: { regex: "/typescript|css|blah|tools|react/" } } }
    ) {
      edges {
        node {
          id
          fluid {
            src
          }
        }
      }
    }
  }
`;

export default Blog;
