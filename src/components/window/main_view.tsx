import { AuthProvider } from "@/context/AuthContext";
import React, { useState, useEffect, useDeferredValue } from "react";
import Navbar from "../Layout/Navbar/Navbar";
import Brand from "./brand";
import Footer from "./footer";
import OfferProducts from "./offerproduct";
import Product from "./product";
import ScrollToTopButton from "./scrollup";
import WhyWeSection from "./whywe";
import { UseProduct } from "@/resources/resources";
import { Spinner } from "../Layout/Atom/atom";
import { Home } from "./home";

export const Main_view = () => {
  const [showSpinnerMessage, setShowSpinnerMessage] = useState(false);
  const product = useDeferredValue(UseProduct());

  useEffect(() => {
    const isFirstLoad = localStorage.getItem('firstLoad');

    if (!isFirstLoad) {
      setShowSpinnerMessage(true);
      localStorage.setItem('firstLoad', 'true');
    }
  }, []); 

  let windowContent = <></>;

  if (product.isLoading && showSpinnerMessage) {
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
        <Spinner
          size={20}
          color="text-light-400"
          message="Please wait for 50 sec in first loading because of low CPU usage"
        />
      </div>
    );
  } else if (product.isLoading) {
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
        <Spinner size={20} color="text-light-400" />
      </div>
    );
  } else if (product.error) {
    windowContent = (
      <div className="container">
        <div className="flex w-full justify-center">
          <p className="text-ui-red">Network Error or Data not available</p>
        </div>
      </div>
    );
  } else {
    windowContent = (
      <>
        <Navbar />
        {/* <Carousel /> */}
        <Home />
        <Brand />
        <Product />
        <OfferProducts />

        <WhyWeSection />
        <Footer />
        <ScrollToTopButton />
      </>
    );
  }
  return windowContent;
};
