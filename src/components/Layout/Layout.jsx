import React from "react";
import { Outlet } from "react-router-dom";
import './Layout.css';
// import Header from "../pages/header/Header";
import Footer from "../pages/footer/Footer";

const Layout = () => {
  return (
    <div className="layout">
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer"><Footer/></footer>
    </div>
  );
};

export default Layout;
