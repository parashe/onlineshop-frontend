import { UseBrand } from "@/resources/resources";
import { Image_Url } from "@/utils/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Spinner, Title } from "../Layout/Atom/atom";

const Brand = () => {
  const brandData = UseBrand();

  const allbrandData = React.useMemo(() => brandData?.data, [brandData?.data]);

  // Define the content to be rendered based on data loading and availability
  let windowContent = <></>;

  if (brandData.isLoading) {
    // Show loading spinner
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-opacity-40 z-[100]">
        <Spinner size={24} color="text-light-200" />
      </div>
    );
  } else if (brandData.error || !allbrandData) {
    // Show error message if data is not available
    windowContent = (
      <div className="container">
        <div className="flex w-full justify-center text-center">
          <p className="text-ui-red">Network Error or Data not available</p>
        </div>
      </div>
    );
  } else {
    // Show user data table if data is available
    windowContent = (
      <section className="mt-10 md:py-10 md:p-10 ">
        <div className="container mx-auto md:px-32">
          <div className="text-left">
            <Title title="Explore  Our Brands" />
          </div>
          <div className="grid p-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {allbrandData?.brands?.map((brand, index) => (
              <div
                key={index}
                className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 mt-1 shadow-md shadow-gray-200 border border-gray-50 rounded-xl"
              >
                <Link
                  href={{
                    pathname: "/product",
                    query: {
                      brandId: brand._id,
                    },
                  }}
                  key={index}
                >
                  <div className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-lg transition duration-300">
                    <div className="bg-white">
                      <Image
                        width={100}
                        height={100}
                        style={{
                          objectFit: "contain",
                         
                          width: "auto",
                          
                          cursor: "pointer",
                          margin: "auto",
                          objectPosition: "center",
                          borderRadius: "100%",
                        }}
                        src={Image_Url + brand.brandImage}
                        alt="Brand Logo"
                        className="brand-image p-4 max-h-[200px] md:h-[100px] rounded-full mx-auto object-contain h-full w-full bg-blend-color-burn"
                      />
                    </div>
                    <div className="text-center mt-3">
                      <h3 className="text-sm uppercase  font-semibold text-gray-800">
                        {brand.brandName}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Return the JSX content
  return windowContent;
};

export default Brand;
