import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function Layout({ content, enableScroll }) {
  return (
    <div>
      <Header enableScroll={enableScroll} />
      {content}
      <Footer />
    </div>
  );
}
