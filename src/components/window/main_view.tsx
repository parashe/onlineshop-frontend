import { AuthProvider } from "@/context/AuthContext";
import React, { useDeferredValue } from "react";
import Navbar from "../Layout/Navbar/Navbar";
import Brand from "./brand";

import Carousel from "./carousel";
import Footer from "./footer";
import OfferProducts from "./offerproduct";
import Product from "./product";
import ScrollToTopButton from "./scrollup";
import WhyWeSection from "./whywe";
import { UseCarousel, UseProduct } from "@/resources/resources";
import { Spinner } from "../Layout/Atom/atom";

export const Main_view = () => {
  const product = useDeferredValue(UseProduct());
  const carousel = useDeferredValue(UseCarousel());

  let windowContent = <></>;

  if (product.isLoading || carousel.isLoading) {
    // Show a spinner if data is still loading
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center   bg-opacity-80 bg-transparent z-[100]">
        <Spinner size={24} color="text-light-200" />
      </div>
    );
  }
  if (product.isSuccess && carousel.isSuccess) {
    windowContent = (
      <>
        <Navbar />
        <Carousel />
        <Brand />
        <OfferProducts />
        <Product />
        <WhyWeSection />
        <Footer />
        <ScrollToTopButton />
      </>
    );
  }

  return windowContent;
};
