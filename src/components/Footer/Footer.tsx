import { StaticImage } from "gatsby-plugin-image";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-box blog-name">
        boli mnie <span className="theme-red">web</span>
      </div>
      <div className="footer-box">
        Zaprojektowane i napisane przez:{" "}
        <span className="theme-red">Adam Knieć</span>
      </div>
      <div className="footer-box">
        <a
          aria-label="Link do konta Linkedin"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/adamkniec/"
        >
          <StaticImage
            src="../images/linkedin.svg"
            alt=""
            className="footer-icon"
          />
        </a>
        <a
          aria-label="Link do konta Stackoverflow"
          target="_blank"
          rel="noopener noreferrer"
          href="https://stackexchange.com/users/16949824/adamkniec?tab=accounts"
        >
          <StaticImage
            src="../images/stack-overflow.svg"
            alt=""
            className="footer-icon"
          />
        </a>
        <a
          aria-label="Link do Githuba"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/AdamKniec"
        >
          <StaticImage
            src="../images/github.svg"
            alt=""
            className="footer-icon"
          />
        </a>
        <a
          aria-label="Link do Instagrama"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/bolimnieweb/"
        >
          <StaticImage
            src="../images/instagram.svg"
            alt=""
            className="footer-icon"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
