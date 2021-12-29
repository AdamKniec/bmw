import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/Layout/Layout";
import Seo from "../components/Seo/seo";
import HomePageHeader from "../components/sections/HomePageHeader";
import HomePageLatestArticles from "../components/sections/HomePageLatestArticles";

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
      <HomePageLatestArticles articlesData={data} />
      <section className="statistics">
        <h2>
          blog w <span className="text-red">liczbach</span>
        </h2>
        <div className="stats-inner-wrapper">
          <div className="numberBox">
            <p className="number-value">82</p>
            <p className="service">ohMyDev</p>
          </div>
          <div className="numberBox">
            <p className="number-value">1310</p>
            <p className="service">Stack Overflow</p>
          </div>
          <div className="numberBox">
            <p className="number-value">366</p>
            <p className="service">Stack Overflow - code review</p>
          </div>
        </div>
      </section>
      <section className="info-section">
        <div className="info-section-inner-wrapper">
          <h2 className="section-header">
            więcej <span className="theme-red">info</span>
          </h2>
          <div className="issue-example">
            <p className="question">Znalazłeś buga lub błąd merytoryczny?</p>
            <p className="answer">
              Zgłoś issue na{" "}
              <a
                className="external-link"
                href="https://github.com/AdamKniec/bmw/issues"
                target="_blank"
                rel="noreferrer"
              >
                githubie
              </a>{" "}
            </p>
          </div>
          <div className="issue-example">
            <p className="question">Chcesz się skontaktować w innej sprawie?</p>
            <p className="answer">
              Napisz na{" "}
              <a className="external-link" href="mailto:adam.k.kniec@gmail.com">
                adam.k.kniec@gmail.com
              </a>
            </p>
          </div>
          <div className="issue-example">
            <p className="question">Umiesz w instagramy?</p>
            <p className="answer">
              Zapraszam na mojego{" "}
              <a
                className="external-link"
                href="https://www.instagram.com/bolimnieweb/"
                rel="noreferrer"
                target="_blank"
              >
                instagrama!
              </a>
            </p>
          </div>
        </div>
      </section>
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
