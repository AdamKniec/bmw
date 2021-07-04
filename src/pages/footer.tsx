import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-box">@2021 Created with Gatsby by Adam Knieć</div>
      <div className="footer-box">
        <Link
          aria-label="Link do mojego konta Linkedin"
          target="_blank"
          rel="noopener noreferrer"
          to="https://www.linkedin.com/in/adamkniec/"
        >
          <StaticImage
            src="../images/linkedin.svg"
            alt="Linkedin logo"
            className="footer-icon"
          />
        </Link>
        <Link
          aria-label="Link do mojego konta Stackoverflow"
          target="_blank"
          rel="noopener noreferrer"
          to="https://stackexchange.com/users/16949824/adamkniec?tab=accounts"
        >
          <StaticImage
            src="../images/stack-overflow.svg"
            alt="Stackoverflow logo"
            className="footer-icon"
          />
        </Link>
        <Link
          aria-label="Link do mojego Githuba"
          target="_blank"
          rel="noopener noreferrer"
          to="https://github.com/AdamKniec"
        >
          <StaticImage
            src="../images/github.svg"
            alt="Github logo"
            className="footer-icon"
          />
        </Link>
      </div>
      <div className="footer-box footer-subpage-link-wrapper">
        <Link to="blog" className="subpage-footer-link">
          Blog
        </Link>
        <Link to="blog/fourth" className="subpage-footer-link">
          Pilot
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
