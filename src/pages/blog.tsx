import { graphql, Link } from "gatsby";
import * as React from "react";

import Layout from "../components/Layout";
import Seo from "../components/seo";

const Blog = (props) => {
  return (
    <Layout>
      <Seo
        title="Boli Mnie Web - Blog"
        description="Artykuły związane ze światem web-developmentu"
      />
      <div className="articles-list">
        <h1 className="blog-main-heading">Blog</h1>
        {props.data.allMarkdownRemark.edges.map((article) => {
          return (
            <article className="blog-post-short">
              <Link
                to={article.node.frontmatter.path}
                key={article.node.frontmatter.title}
                className="blog-post-link"
              >
                <span className="article-title">
                  {article.node.frontmatter.title}
                </span>
                <div className="tags-wrapper">
                  {article.node.frontmatter.tags.map(
                    (tag: string, index: number) => {
                      return (
                        <span className="tag" key={index.toString()}>
                          {tag}
                        </span>
                      );
                    }
                  )}
                </div>
                <p className="metadata-short">{`${article.node.frontmatter.date} (${article.node.frontmatter.readTime} min)`}</p>
              </Link>
            </article>
          );
        })}
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
            author
          }
        }
      }
    }
  }
`;

export default Blog;
