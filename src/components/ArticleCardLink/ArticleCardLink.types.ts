export interface ArticleCardLinkProps {
  post: {
    node: {
      id: number;
      frontmatter: {
        path: string;
        tags: string[];
        title: string;
        intro: string;
      };
    };
  };
  imgData: {
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

export interface ImageItemData {
  node: {
    fluid: {
      src: string;
    };
  };
}
