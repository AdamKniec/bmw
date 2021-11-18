import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import Layout from "../components/Layout";
import Seo from "../components/seo";

interface HeaderProps {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            id: number;
            frontmatter: {
              path: string;
              tags: [];
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

const Header = (props: HeaderProps) => {
  const { data } = props;
  const latestBlogPosts = () =>
    data.allMarkdownRemark.edges.map((post) => {
      return (
        <React.Fragment key={post.node.id}>
          <Link
            to={post.node.frontmatter.path}
            className="latest-article-link latest-article-box"
          >
            {post.node.frontmatter.tags.map((tag) => {
              return (
                <img
                  alt="UZUPELNIC"
                  src={
                    data.allImageSharp.edges.filter((item) =>
                      item.node.fluid.src.includes(tag)
                    )[0].node.fluid.src
                  }
                  className="category-img"
                />
              );
            })}
            {post.node.frontmatter.title}
            {/* <p className="metadata-short">{`${post.node.frontmatter.date} (${post.node.frontmatter.readTime} min)`}</p> */}

            <p className="link-description">
              Załóżmy, że pracujesz nad nową aplikacją w JavaScripcie, czytasz
              wymagania biznesowe, wszystko jest jasne i klarowne... Aż do
              ostatniego podpunktu wymagań
            </p>
          </Link>
        </React.Fragment>
      );
    });

  return (
    <Layout>
      <Seo
        title="Boli Mnie Web by Adam Knieć"
        description="Artykuły związane ze światem web-developmentu"
      />
      <div className="header-wrapper">
        <h1 className="mainHeader">
          boli mnie <span className="theme-red">web</span>.
        </h1>
        <p className="hero-intro-text">
          <span className="theme-red">blog</span> o technologiach i narzędziach
          webowych oraz wszystkim co mnie interesuje / przeraża / wk*rwia / bawi
          / odrzuca i smuci w branży <span className="theme-red">IT</span>{" "}
        </p>
        <StaticImage src="../images/brain.png" alt="" className="brain-png" />
        <div>
          <span className="theme-red">{"->"} </span>
          <a className="header-link" href="#asdasdasd">
            {" "}
            github
          </a>{" "}
          |{" "}
          <a className="header-link" href="#asdas">
            instagram
          </a>
        </div>
      </div>
      <section className="latest-articles">
        <div className="inner-wrapper">
          <h2 className="section-header">
            ostatnie <span className="theme-red">wpisy</span>
          </h2>
          <div className="latest-articles-container">{latestBlogPosts()}</div>
        </div>
      </section>
      <section className="statistics">
        <h2>
          blog w <span className="text-red">liczbach</span>
        </h2>
        <div className="stats-inner-wrapper">
          <div className="numberBox">
            <p className="number-value">55</p>
            <p className="service">ohMyDev</p>
          </div>
          <div className="numberBox">
            <p className="number-value">1268</p>
            <p className="service">Stack Overflow</p>
          </div>
          <div className="numberBox">
            <p className="number-value">366</p>
            <p className="service">Stack Overflow - code review</p>
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
            title
            author
            readTime
            date
          }
        }
      }
    }
    allImageSharp(filter: { fluid: { src: { regex: "/typescript|css/" } } }) {
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
export default Header;
