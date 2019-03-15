import React from "react";

// Layout components
import Header from "../header/Header";
import Footer from "../footer/Footer";

import "./Page.css";

function Page(props) {
  return (
    <div className="Page">
      <Header {...props} />
      <div className="Page-content">{props.children}</div>
      <Footer />
    </div>
  );
}

export default Page;
