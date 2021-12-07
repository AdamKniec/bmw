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
            <div className="tags-wrapper">
              {post.node.frontmatter.tags.map((tag) => {
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
            </div>

            {post.node.frontmatter.title}
            <p className="link-description">{post.node.frontmatter.intro}</p>
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
          webowych oraz o wszystkim co mnie interesuje / wk*rwia / bawi i smuci
          w branży <span className="theme-red">IT</span>{" "}
        </p>
        <StaticImage src="../images/brain.png" alt="" className="brain-png" />
        <div>
          <span className="theme-red">{"->"} </span>
          <a
            className="header-link"
            href="https://github.com/AdamKniec/bmw"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            github
          </a>{" "}
          |{" "}
          <a
            className="header-link"
            href="https://www.instagram.com/bolimnieweb/"
            target="_blank"
            rel="noreferrer"
          >
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
            <p className="number-value">64</p>
            <p className="service">ohMyDev</p>
          </div>
          <div className="numberBox">
            <p className="number-value">1255</p>
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
            readTime
            date
          }
        }
      }
    }
    allImageSharp(
      filter: { fluid: { src: { regex: "/typescript|blah|css|tools|react/" } } }
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
export default Header;
