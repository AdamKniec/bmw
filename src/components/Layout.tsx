/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";

import Navbar from "./Navbar";
import "../styles/css/combined.css";
import Footer from "../pages/footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div
        style={{
          margin: `0 auto`,
        }}
      >
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
};
export default Layout;
