import React from "react";

import { Link } from "gatsby";

import { ArticleCardLinkProps, ImageItemData } from "./ArticleCardLink.types";

const ArticleCardLink = (article: ArticleCardLinkProps) => {
  const { post, imgData } = article;

  return (
    <React.Fragment key={post.node?.id}>
      <Link
        to={post.node?.frontmatter.path}
        className="latest-article-link latest-article-box"
      >
        <div className="tags-wrapper">
          {post.node?.frontmatter?.tags.map((tag: string, i) => {
            return (
              <img
                alt="UZUPELNIC" // TODO -> Change that
                key={i.toString()} // TODO -> Add id on  graph CMS if possible
                src={
                  imgData?.allImageSharp.edges.filter((item: ImageItemData) =>
                    item.node.fluid.src.includes(tag)
                  )[0]?.node.fluid.src
                }
                className="category-img"
              />
            );
          })}
        </div>

        {post.node?.frontmatter.title}
        <p className="link-description">{post.node?.frontmatter.intro}</p>
      </Link>
    </React.Fragment>
  );
};

export default ArticleCardLink;
