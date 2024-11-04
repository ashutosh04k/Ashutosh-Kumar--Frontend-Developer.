import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from '../layout/layout';
import Home from '../pages/home/Home';
import About from '../pages/About';
const routes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default routes;