import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

import Layout from "../components/Layout";
import Seo from "../components/seo";

interface blogProps {
  data: {
    allImageSharp: {
      edges: {
        node: {
          fluid: {
            src: string;
          };
        };
      }[];
    };
    allMarkdownRemark: {
      edges: [
        {
          node: {
            frontmatter: {
              date: string;
              readTime: string;
              path: string;
              intro: string;
              title: string;
              tags: string[];
            };
          };
        }
      ];
    };
  };
}

const Blog = (props: blogProps) => {
  const { data } = props;

  return (
    <Layout>
      <Seo
        title="Boli Mnie Web - Blog"
        description="Artykuły związane ze światem web-developmentu"
      />
      <div className="articles-list">
        <div className="intro-wrapper">
          <h1 className="blog-main-heading">blog</h1>
          <StaticImage src="../images/brain.png" alt="" className="brain-img" />
        </div>
        <div className="articles-container">
          {data.allMarkdownRemark.edges.map((article) => {
            return (
              <Link
                to={article.node.frontmatter.path}
                className="latest-article-link latest-article-box"
              >
                {article.node.frontmatter.tags.map((tag) => {
                  return (
                    <img
                      alt="UZUPELNIC"
                      src={
                        data.allImageSharp.edges.filter((item) =>
                          item.node.fluid.src.includes(tag)
                        )[0]?.node.fluid.src
                      }
                      className="category-img"
                    />
                  );
                })}
                {article.node.frontmatter.title}
                {/* <p className="metadata-short">{`${post.node.frontmatter.date} (${post.node.frontmatter.readTime} min)`}</p> */}

                <p className="link-description">
                  {article.node.frontmatter.intro}
                </p>
              </Link>
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
            date(locale: "")
            tags
            path
            title
            readTime
            intro
            author
          }
        }
      }
    }
    allImageSharp(
      filter: { fluid: { src: { regex: "/typescript|css|blah|tools/" } } }
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
