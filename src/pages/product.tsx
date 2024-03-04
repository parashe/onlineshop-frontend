"use client";
import React from "react";
import Navbar from "@/components/Layout/Navbar/Navbar";
import AllProduct from "@/components/window/allproduct";
import { Spinner } from "@/components/Layout/Atom/atom";

const Home = () => {
  const [isloading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate a 10-second delay
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {isloading ? (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
          <Spinner size={20} color="text-light-200" />
        </div>
      ) : (
        <>
          <Navbar />
          <AllProduct />
        </>
      )}
    </>
  );
};

export default Home;
