import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

import Layout from "../components/Layout";
import Seo from "../components/seo";
import Footer from "./footer";

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <div className="not-found-wrapper">
      <h1>
        <span className="header-letter">4</span>
        <StaticImage
          src="../images/headache.svg"
          alt="Boli mnie Web - Strona główna"
          className="headache-svg"
        />
        <span className="header-letter">4</span>
      </h1>
      <h2 className="not-found-sub-header">
        Nie znaleziono strony o takim adresie. Jeszcze raz, na spokojnie
      </h2>
    </div>
  </Layout>
);

export default NotFoundPage;
