import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

import Layout from "../components/Layout/Layout";
import Seo from "../components/Seo/seo";

const NotFoundPage = () => (
  <Layout>
    <Seo
      title="Boli Mnie Web - Nie znaleziono strony"
      lang="pl-PL"
      description="Strona o podanym adresie nie istnieje"
    />
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
