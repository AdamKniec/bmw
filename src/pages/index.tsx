import * as React from "react";
// import { Link } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/seo";

const Header = () => {
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
      </section>

      {/* <p>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to &apos;Using TypeScript&apos;</Link>
      </p> */}
    </Layout>
  );
};

export default Header;
