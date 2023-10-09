import React from "react";
import NavBar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./home.css";
import Toptravelled from "../../components/toptravelled/Toptravelled";
import Busfeatures from "../../components/Busfeatures/Busfeatures";
import Footer from "../../components/footer/Footer";
const Home = () => {
  return (
    <div>
      <NavBar />
      <Header />

      <div className="homecontainer">
        <h1 className="hometitle">Top Travelled Routes</h1>
        <Toptravelled />
        <h1 className="hometitle">Our Bus features</h1>
        <Busfeatures />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
