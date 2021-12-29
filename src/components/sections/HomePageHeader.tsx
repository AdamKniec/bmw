import React from "react";

import { StaticImage } from "gatsby-plugin-image";

const HomePageHeader = () => {
  return (
    <div className="header-wrapper">
      <h1 className="mainHeader">
        boli mnie <span className="theme-red">web</span>.
      </h1>
      <p className="hero-intro-text">
        <span className="theme-red">blog</span> o technologiach i narzędziach
        webowych oraz o wszystkim co mnie interesuje / wk*rwia / bawi i smuci w
        branży <span className="theme-red">IT</span>{" "}
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
  );
};

export default HomePageHeader;
