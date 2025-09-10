import React from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

const RootLayout = () => {
  return (
    <div className="">
      <header className= "sticky top-0 right-0 left-0 z-50">
        <div className="bg-[#010F83]">
          <nav className="max-w-[1700px]  mx-auto">
            <Navbar></Navbar>
          </nav>
        </div>
        <div className=" bg-[#FFFFFF] shadow ">
          <header className="max-w-[1700px] py-2  mx-auto">
            <Header></Header>
          </header>
        </div>
      </header>
      <main className="max-w-[1700px] mx-auto">
        <section>
          <Outlet></Outlet>
        </section>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
