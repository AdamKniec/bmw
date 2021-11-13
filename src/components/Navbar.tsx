import React from "react";
// import "../styles/css/"
import { StaticImage } from "gatsby-plugin-image";

import { Link } from "gatsby";

const Navbar = () => (
  <nav className="navbar">
    <a href="/">
      <StaticImage
        src="../images/headache.png"
        alt="Boli mnie Web - Strona główna"
        className="headache-svg"
      />
    </a>
    <ul>
      <li className="navbar-list-item">
        <Link to="/blog" className="navbar-list-item-link">
          Artykuły
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
