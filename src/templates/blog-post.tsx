import React from "react";

import { graphql } from "gatsby";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
import { DiscussionEmbed } from "disqus-react";
import Layout from "../components/Layout/Layout";
import Seo from "../components/Seo/seo";

deckDeckGoHighlightElement();

interface TemplateProps {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        path: string;
        title: string;
        readTime: string;
        description: string;
        date: string;
        tags: string[];
      };
    };
  };
}

export default function Template({ data }: TemplateProps) {
  const post = data.markdownRemark;

  const disqusConfig = {
    url: `https://www.bolimnieweb.pl/${post.frontmatter.path}`,
    identifier: post.frontmatter.path,
    title: post.frontmatter.title,
  };

  return (
    <Layout>
      <Seo
        title={`Boli Mnie Web  - ${post.frontmatter.title}`}
        description={post.frontmatter.description}
        lang="pl-PL"
      />
      <div className="blog-post-wrapper">
        <h1 className="main-blog-header">{post.frontmatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: post.html }}
          className="content-wrapper"
        />
      </div>
      <div className="disqus-wrapper">
        {" "}
        <DiscussionEmbed shortname="bolimnieweb" config={disqusConfig} />
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
        description
      }
    }
  }
`;
