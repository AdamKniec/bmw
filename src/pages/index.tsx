import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

import Layout from "../components/Layout";
import Seo from "../components/seo";

const Header = ({ data }: any) => {
  // get rid of any
  const latestBlogPosts = () =>
    data.allMarkdownRemark.edges
      .map((post) => {
        return (
          <div className="latest-article-box" key={post.node.id}>
            <Link
              to={post.node.frontmatter.path}
              className="latest-article-link"
            >
              {post.node.frontmatter.title}
            </Link>
            <p className="metadata-short">{`${post.node.frontmatter.date} (${post.node.frontmatter.readTime} min)`}</p>
          </div>
        );
      })
      .sort((a: string, b: string) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });

  return (
    <Layout>
      <Seo title="Home" />
      <header className="header-container">
        <h1 className="mainHeader">
          <span className="thin-header-part">Boli mnie</span>{" "}
          <span className="bold-header-part">Web</span>
          <span className="name-surname">by Adam Knieć</span>
        </h1>
        <div>
          <div className="decorative-circle" />
        </div>
      </header>
      <section className="latest-articles">
        <h2 className="section-header">Ostatnie wpisy</h2>
        <div className="latest-articles-container">{latestBlogPosts()}</div>
      </section>

      {/* <p>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to &apos;Using TypeScript&apos;</Link>
      </p> */}
      <footer className="footer">
        <div className="footer-box">
          @2021 Created with Gatsby by Adam Knieć
        </div>
        <div className="footer-box">
          <Link
            aria-label="Link do mojego konta Linkedin"
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.linkedin.com/in/adamkniec/"
          >
            <StaticImage
              src="../images/linkedin.svg"
              alt="Linkedin logo"
              className="footer-icon"
            />
          </Link>
          <Link
            aria-label="Link do mojego konta Stackoverflow"
            target="_blank"
            rel="noopener noreferrer"
            to="https://stackexchange.com/users/16949824/adamkniec?tab=accounts"
          >
            <StaticImage
              src="../images/stack-overflow.svg"
              alt="Stackoverflow logo"
              className="footer-icon"
            />
          </Link>
          <Link
            aria-label="Link do mojego Githuba"
            target="_blank"
            rel="noopener noreferrer"
            to="https://github.com/AdamKniec"
          >
            <StaticImage
              src="../images/github.svg"
              alt="Github logo"
              className="footer-icon"
            />
          </Link>
        </div>
        <div className="footer-box footer-subpage-link-wrapper">
          <Link to="blog" className="subpage-footer-link">
            Blog
          </Link>
          <Link to="blog/fourth" className="subpage-footer-link">
            Pilot
          </Link>
        </div>
      </footer>
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
            title
            author
            readTime
            date
          }
        }
      }
    }
  }
`;
export default Header;
