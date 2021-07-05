import { graphql, Link } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import Footer from "./footer";

const Blog = (props) => {
  return (
    <Layout>
      <Seo title="Blog" />
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
                  {article.node.frontmatter.tags.map((tag) => {
                    return <span className="tag">{tag}</span>;
                  })}
                </div>
                <p className="metadata-short">{`${article.node.frontmatter.date} (${article.node.frontmatter.readTime} min)`}</p>
              </Link>
            </article>
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
