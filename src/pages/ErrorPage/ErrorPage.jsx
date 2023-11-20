import React from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <div className="background-image" />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
