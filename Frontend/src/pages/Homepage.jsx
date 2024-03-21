import React from "react";
import NavbarPage from "../components/Navbar";
import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <>
      <div>
        <div className="fixed top-0 w-full z-50">
          <NavbarPage />
        </div>
        <div className="pt-20">
          <Hero />
          <div className="flex justify-center items-center mt-8">
            <h1 className="text-2xl font-bold">AVAILABLE ROOM</h1>
          </div>
          <div>
            <Sidebar />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
