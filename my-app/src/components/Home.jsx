import React from 'react'
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import TopFeature from "./TopFeature";
import About from "./About";
import Facts from "./Facts";
import Features from "./Features";
import Footer from "./Footer";
import "./style2.css"

function Home() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Carousel />
      <TopFeature />
      <About />
      <Facts />
      <Features />
      <Footer />
    </div>
  )
}

export default Home
