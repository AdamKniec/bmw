import { Link } from "gatsby";
import React from "react";

const ArticleCardLink = (post) => {
  return (
    <React.Fragment key={post.node?.id}>
      <Link
        to={post.post.node?.frontmatter.path}
        className="latest-article-link latest-article-box"
      >
        <div className="tags-wrapper">
          {post.post.node?.frontmatter?.tags.map((tag: string, i) => {
            return (
              <img
                alt="UZUPELNIC"
                key={i}
                src={
                  post.imgData.allImageSharp.edges.filter((item) =>
                    item.node.fluid.src.includes(tag)
                  )[0]?.node.fluid.src
                }
                className="category-img"
              />
            );
          })}
        </div>

        {post.post.node?.frontmatter.title}
        <p className="link-description">{post.post.node?.frontmatter.intro}</p>
      </Link>
    </React.Fragment>
  );
};

export default ArticleCardLink;
