import { Product } from "@/Lib/types";
import { UseProduct } from "@/resources/resources";
import Link from "next/link";
import React from "react";
import { Alert, Spinner, Title } from "../Layout/Atom/atom";
import ProductCard from "../Layout/product/productcard";

interface RelatedProductCardProps {
  id: string;
}

export const RelatedProduct = ({ id }: RelatedProductCardProps) => {
  const productData = UseProduct();

  // Extract user data from the hook response using useMemo to prevent unnecessary re-renders
  const allproductData = React.useMemo(
    () => productData?.data,
    [productData?.data]
  );

  // Find the product with the given ID
  const productWithID =
    Array.isArray(allproductData?.products) &&
    allproductData?.products?.find((product: Product) => product._id === id);

  // Extract the category ID from the product if found
  const categoryID = productWithID?.category;

  // Filter products in the same category as the one with the given ID
  const relatedProducts =
    Array.isArray(allproductData?.products) &&
    allproductData?.products?.filter(
      (product: Product) => product.category === categoryID
    );

  // Determine the content of the window based on loading, error, or data availability
  let windowContent = <></>;

  if (productData.isLoading) {
    // Show a spinner if data is still loading
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-opacity-40 z-[100]">
        <Spinner size={16} color="text-light-200" />
      </div>
    );
  } else if (!id) {
    windowContent = (
      <div className="container mx-auto">
        <div className="w-full justify-center">
          <Alert type="error" message="Sorry cannot fetch related product" />
        </div>
      </div>
    );
  } else if (productData.error || !allproductData) {
    // Show an error message if there was a network error or if data is not available
    windowContent = (
      <div className="container">
        <div className="flex w-full justify-center">
          <p className="text-ui-red">Network Error or Data not available</p>
        </div>
      </div>
    );
  } else {
    // Show the related products if data is available
    windowContent = (
      <div className="container mx-auto">
       <div className="md:mt-10 mb-10 pt-10 md:20px md:px-20 xl:px-32 ">
        <div className="flex justify-between px-2">
            <div className="text-left ml-2 relative ">
              <div className="text-left ml-2 relative ">
                <Title title="Related Products" />
              </div>
            </div>
            <div className="text-right">
              <Link href="product">
                <h4 className="text-sm mt-3 font-semibold text-ui-primary underline uppercase  cursor-pointer hover:scale-105 transition ease-out duration-300">
                  See More
                </h4>
              </Link>
            </div>
          </div>
          <div className="grid p-5 grid-cols-1 md:mt-5 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {relatedProducts &&
              relatedProducts
                .slice(0, 10)
                .map((product: any, index: number) => (
                  <Link
                    href={{
                      pathname: "/productdetails",
                      query: {
                        slug: product.slug,
                        id: product._id,
                      },
                    }}
                    key={index}
                  >
                    <div className="w-full">
                      <ProductCard product={product} />
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    );
  }

  return <>{windowContent}</>;
};

export default RelatedProduct;
