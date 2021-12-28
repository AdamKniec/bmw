import React from "react";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import "../../styles/css/combined.css";

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
        <Footer />
      </div>
    </>
  );
};
export default Layout;
