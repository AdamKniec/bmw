import React from "react";
// import "../styles/css/"
import { StaticImage } from "gatsby-plugin-image";

import { Link } from "gatsby";

const Navbar = () => (
  <nav className="navbar">
    <a href="/">
      <StaticImage
        src="../images/headache.svg"
        alt="Boli mnie Web - Strona główna"
        width={40}
      />
    </a>
    <ul>
      <li className="navbar-list-item">
        <Link to="blog" className="navbar-list-item-link">
          Artykuły
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
