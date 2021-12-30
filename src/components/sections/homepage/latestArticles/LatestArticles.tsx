import React from "react";

import { PostsAndImagesData } from "../../../../pages";

import ArticleCardLink from "../../../ArticleCardLink/ArticleCardLink";

const HomePageLatestArticles = ({ data }: PostsAndImagesData) => {
  const latestBlogPosts = () =>
    data.allMarkdownRemark?.edges.map((post) => {
      return <ArticleCardLink post={post} imgData={data} />;
    });

  return (
    <section className="latest-articles">
      <div className="inner-wrapper">
        <h2 className="section-header">
          ostatnie <span className="theme-red">wpisy</span>
        </h2>
        <div className="latest-articles-container">{latestBlogPosts()}</div>
      </div>
    </section>
  );
};

export default HomePageLatestArticles;
