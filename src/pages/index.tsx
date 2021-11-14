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
              title: string;
              date: string;
              readTime: string;
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
            {post.node.frontmatter.title}
            <p className="metadata-short">{`${post.node.frontmatter.date} (${post.node.frontmatter.readTime} min)`}</p>
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
          <span className="theme-red">-> </span> 
          <a className="header-link"> github</a> | <a className="header-link">instagram</a>
        </div>
      </div>
      {/* <section className="latest-articles">
        <h2 className="section-header">Ostatnie wpisy</h2>
        <div className="latest-articles-container">{latestBlogPosts()}</div>
      </section> */}
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
