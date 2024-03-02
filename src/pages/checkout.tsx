"use client";

import Breadcrumb from "@/components/Layout/BreadCrumb/breadcrumb";
import Navbar from "@/components/Layout/Navbar/Navbar";
import Checkout from "@/components/window/checkout";

const Home = () => {
  return (
    <>
      <Navbar />
      <Breadcrumb title="Checkout" href="checkout" />
      <Checkout />
    </>
  );
};

export default Home;
