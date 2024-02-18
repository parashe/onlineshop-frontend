import React from "react";
import { CardSvg } from "../Layout/SVG/svg";
import { Title } from "../Layout/Atom/atom";
import Image from "next/image";

const WhyWeSection = () => {
  return (
    <section className="md:pb-32">
      <div className="container mx-auto ">
        <div className="md:mt-32 mb-10 pt-10 px-5 md:20px xl:px-32 ">
          {/* <div className="text-left ml-2 relative ">
            <Title title="Why We Are Best" />
          </div> */}
          <div className="flex flex-col md:flex-col lg:flex-row justify-between gap-8 ">
            <Image
              src="/images/shopping.svg"
              width={500}
              height={500}
              alt="whywe"
              className="aspect-auto h-full bg-orange-50 rounded-lg  mix-blend-color-burn cursor-pointer   p-5 hover:scale-105 hover:border-blue-500 transition duration-300"
            />

            <div className="flex flex-col justify-start">
              <h3 className="mx-auto lg:mx-0 uppercase text-ui-primary-dark lg:mb-5 text-md text-justify font-black">
                Why We Are Best?
              </h3>

              <h2 className="text-xl md:text-3xl  py-2 font-black  md:leading-10 ">
                More than just a company, we are a community dedicated to
                delivering excellence in every interaction.
              </h2>

              <p className="text-xs text-neutral-500 py-2 leading-relaxed text-justify">
                We are dedicated to providing you with a seamless online
                shopping experience. Our app is designed to make your shopping
                journey effortless and enjoyable. With a wide range of products
                available at your fingertips, we aim to be your one-stop
                destination for all your shopping needs. From electronics to
                fashion, home decor to beauty, we have carefully curated an
                extensive selection of products to cater to diverse tastes and
                preferences.
              </p>

              <div className="py-4 md:py-5">
                <div className="flex flex-col md:flex-row justify-between  items-center gap-5">
                  <div className="flex gap-4  rounded-full justify-between items-center">
                   <DeliveryIcon/>
                    <h3 className="text-sm font-bold text-gray-800 mt-4">
                      FREE DELIVERY
                    </h3>
                  </div>

                  <div className="flex gap-4  rounded-full justify-between items-center">
                    <SupportIcon/>
                    <h3 className="text-sm uppercase font-bold text-gray-800 mt-4">
                      24/7 SUPPORT Service
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col py-5 md:flex-row justify-between items-center gap-5">
                  <div className="flex gap-4  rounded-full justify-between items-center">
                    <CardSvg fg="#FF5722" className="w-12 h-12" />
                    <h3 className="text-sm font-bold uppercase text-gray-800 mt-4">
                      SECURE PAYMENT SYSTEM
                    </h3>
                  </div>

                  <div className="flex gap-4  rounded-full justify-between items-center">
                    <TrustedProductsIcon/>
                    <h3 className="text-sm font-bold uppercase text-gray-800  mt-4">
                      TRUSTED Products
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeSection;


const SecurePaymentIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#FF5722"
      width="48"
      height="48"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M14 2h4v2h-4zm0 16h4v2h-4zm0-8h4v2h-4z" />
    </svg>
  );
};

const TrustedProductsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#FF5722"
      width="48"
      height="48"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M14 2h4v2h-4zm0 16h4v2h-4zm0-8h4v2h-4z" />
    </svg>
  );
};


const DeliveryIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#FF5722"
      width="48"
      height="48"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 3v12h-6l-2 6h20l-5-15h-7z" />
      <path fill="none" d="M0 0h24v24H0z" />
    </svg>
  );
};

const SupportIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#FF5722"
      width="48"
      height="48"
    >
      <path d="M16 20h1v2h-1zm2.08-3.74c.41-.56.92-1.05 1.51-1.44-.28-.73-.79-1.34-1.44-1.75-.12-.08-.28-.11-.42-.08-.14.03-.25.12-.31.25-.62 1.07-1.79 1.75-3.22 1.75-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4c0 .95-.34 1.83-.93 2.53zm-5.31-2.19c.01-.03.02-.06.02-.09v-2.05c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2.05l-2.46-2.47a.506.506 0 0 0-.85.35V15c0 .28.22.5.5.5s.5-.22.5-.5v-1.18l2.3 2.3c.21.21.5.3.79.26.28-.04.53-.18.72-.37l3.44-3.44-3.12-3.12-.44.44c-.14.14-.33.22-.53.22s-.39-.08-.53-.22c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l.44.44 4.48 4.48c.19.19.29.44.29.71s-.1.52-.29.71c-.2.2-.44.29-.71.29s-.52-.1-.71-.29l-4.48-4.48-1.44 1.44 2.12 2.12c.46.46.46 1.24 0 1.71s-1.24.46-1.71 0l-2.12-2.12-3.44 3.44z" />
    </svg>
  );
};