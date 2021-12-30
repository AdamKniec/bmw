import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/Layout/Layout";
import Seo from "../components/Seo/seo";
import HomePageHeader from "../components/sections/homepage/header/Header";
import HomePageLatestArticles from "../components/sections/homepage/latestArticles/LatestArticles";
import Statistics from "../components/sections/homepage/statistics/Statistics";
import Info from "../components/sections/homepage/info/Info";

export interface PostsAndImagesData {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            id: number;
            frontmatter: {
              path: string;
              tags: [];
              intro: string;
              title: string;
              date: string;
              readTime: string;
            };
          };
        }
      ];
    };
    allImageSharp: {
      edges: [
        {
          node: {
            fluid: {
              src: string;
            };
          };
        }
      ];
    };
  };
}

const Homepage = (props: PostsAndImagesData) => {
  const { data } = props;

  return (
    <Layout>
      <Seo
        lang="pl-PL"
        title="Boli Mnie Web by Adam Knieć"
        description="Artykuły związane ze światem web-developmentu"
      />
      <HomePageHeader />
      <HomePageLatestArticles data={data} />
      <Statistics />
      <Info />
    </Layout>
  );
};
export const latestBlogPosts = graphql`
  query latestPostsQuery {
    allMarkdownRemark(
      limit: 3
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            tags
            intro
            title
            author
          }
        }
      }
    }
    allImageSharp(
      filter: {
        fluid: { src: { regex: "/typescript|blah|css|tools|react|js/" } }
      }
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
export default Homepage;
