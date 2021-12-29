import React from "react";

import ArticleCardLink from "../ArticleCardLink/ArticleCardLink";

const HomePageLatestArticles = ({ articlesData }) => {
  const latestBlogPosts = () =>
    articlesData.allMarkdownRemark?.edges.map((post) => {
      console.log(post);
      return <ArticleCardLink post={post} imgData={articlesData} />;
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
