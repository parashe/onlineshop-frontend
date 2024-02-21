import { AuthProvider } from "@/context/AuthContext";
import React, { useDeferredValue } from "react";
import Navbar from "../Layout/Navbar/Navbar";
import { About } from "./about";
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

const product = useDeferredValue(UseProduct())
const carousel = useDeferredValue(UseCarousel())

let windowContent =<></>


if(product.isLoading || carousel.isLoading){
  windowContent = (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
      <Spinner size={20} color="text-light-400" />
    </div>
  );
}
else if (product.error || carousel.error) {
  windowContent = (
    <div className="container">
      <div className="flex w-full justify-center">
        <p className="text-ui-red">Network Error or Data not available</p>
      </div>
    </div>
  );
}

else {
  windowContent = <>
    <Navbar />
    <Carousel />
    <Brand />
    <OfferProducts />
    <Product />
    <WhyWeSection />
    <Footer />
    <ScrollToTopButton />
    </>
  
}
  return windowContent; 
};
