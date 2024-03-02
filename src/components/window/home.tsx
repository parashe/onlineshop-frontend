import Image from "next/image";
import React from "react";

export const Home = () => {
  return (
<div id="home" className="home flex justify-center items-center">
  <div className="home-content  h-screen w-screen flex justify-center items-center">
    <div className="container mx-auto md:px-32">
      <div className="flex flex-col-reverse md:flex-row justify-center items-center">
        <div className="text-center md:text-left">
          <h2 className="max-w-lg text-xl px-3 lg:text-5xl leading-relaxed text-secondary font-black mb-6">
            Discover{" "}
            <span className="text-ui-primary">Unique Products</span> and{" "}
            <span className="text-ui-primary">Unmatched Quality</span>.
          </h2>
          <p className="text-sm px-3 text-neutral-700 mb-8 max-w-xl">
            Welcome to our platform, where we curate an unparalleled selection
            of products meticulously crafted with passion and precision,
            exclusively for you to discover and cherish.
          </p>
          <div className="p-2">
          <button className="bg-ui-primary text-white  px-8 py-3 rounded-sm hover:bg-ui-primary-dark transition-colors duration-300">
            Explore Now
          </button>
          </div>
        </div>
        <div className="">
          <Image
            width={500}
            height={700}
            className="object-cover aspect[1/1] bg-orange-500 rounded-xl h-[300px]   md:h-[600px] bg-transparent p-5 md:p-10 bg-blend-color-burn aspect-[1/1] brightness-105 w-full cursor-pointer hover:scale-105 transition duration-300"
            src="/images/bg.svg"
            alt="product image"
          />
        </div>
      </div>
    </div>
  </div>
</div>

  
  );
};
