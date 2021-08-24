import { graphql } from "gatsby";
import React from "react";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";

// import { DiscussionEmbed } from "disqus-react";
import Layout from "../components/Layout";
import Seo from "../components/seo";

deckDeckGoHighlightElement();

export default function Template({ data }) {
  const post = data.markdownRemark;

  const config = {
    url: `https://www.bolimnieweb.pl/${post.frontmatter.path}`,
    identifier: post.frontmatter.path,
    title: post.frontmatter.title,
  };

  return (
    <Layout>
      <Seo
        title={`Boli Mnie Web  - ${post.frontmatter.title}`}
        description={post.frontmatter.description}
      />
      <div className="blog-post-wrapper">
        <h1 className="main-blog-header">{post.frontmatter.title}</h1>
        <p className="metadata-short">
          {post.frontmatter.date} ({post.frontmatter.readTime} min.)
        </p>
        <div className="tags-container">
          {data.markdownRemark.frontmatter.tags.map(
            (tag: string, index: number) => {
              return (
                <span className="tag" key={index.toString()}>
                  {tag}
                </span>
              );
            }
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: post.html }}
          className="content-wrapper"
        />
      </div>
      {/* <DiscussionEmbed shortname="bolimnieweb" config={config} /> */}
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
        description
      }
    }
  }
`;
