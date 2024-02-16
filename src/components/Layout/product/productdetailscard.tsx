import { Product } from "@/Lib/types";
import Image from "next/image";
import React, { useState } from "react";
import ImageGallery from "./imagegallery";
import { Image_Url } from "@/utils/config";
import { AddToCart, UseColor, UseSize } from "@/resources/resources";
import {
  Alert,
  Button,
  MultipleDropdownHover,
  SelectWithArrow,
  Spinner,
} from "../Atom/atom";
import { RatingSection } from "./productcard";
import {
  CardSvg,
  Cart,
  FacebookSvg,
  MessengerSvg,
  MinusSvg,
  PlusSvg,
  ShippingSvg,
  TwitterSvg,
  UserSvg,
} from "../SVG/svg";
import { useAuth } from "@/context/AuthContext";

// Import necessary dependencies
import Cookies from "js-cookie";
import Modal from "../Modal/Modal";
import LoginPage from "../Auth/login";
import Router from "next/router";

// Define the props for the component
interface ProductCardProps {
  product: Product;
}

// Product details card component
const ProductDetailsCard: React.FC<ProductCardProps> = ({
  product,
}: ProductCardProps) => {
  // State variables to manage selected size, color, quantity, alerts, login modal, and loading status
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState(" ");
  const [alertMessage, setAlertMessage] = useState("");
  const [loginModalVisible, setLoginModalVisible] = React.useState(false);
  const { isAuthenticated } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  // Function to handle closing the alert
  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };

  // Function to handle adding an item to the cart
  const handleAddToCart = async () => {
    if (isAuthenticated) {
      setIsSaving(true);

      const cartItem = [
        {
          product: product._id,
          quantity: quantity,
          size: selectedSize,
          color: selectedColor,
          price: product.price,
        },
      ];
      try {
        const res = await AddToCart(cartItem);
        if (res.success) {
          setIsSaving(false);
          setIsAlertVisible(true);
          setAlertMessage("Item added to cart");
          setAlertType("success");
        }
      } catch (error) {
        setIsSaving(false);
        setAlertType("error");
        setAlertMessage("Error adding item to cart");
      }
    } else {
      setLoginModalVisible(true);
    }
  };

  const handleAddToCartAndBuy = async () => {
    if (isAuthenticated) {
      const cartItem = [
        {
          product: product._id,
          quantity: quantity,
          size: selectedSize,
          color: selectedColor,
          price: product.price,
        },
      ];
      try {
        const res = await AddToCart(cartItem);
        if (res.success) {
          Router.push("/checkout");
        }
      } catch (error) {
        setAlertType("error");
        setAlertMessage("Error Buying item");
      }
    } else {
      setLoginModalVisible(true);
    }
  };

  // Calculate full price after discount
  const fullPrice =
    (Number(product.discountPrice) / 100) * Number(product.price) +
    Number(product.price);

  // Function to generate color dropdown options
  const colorsDropdown = () => {
    const listofcolors = [] as string[];

    Array.isArray(product.colorsInfo) &&
      product.colorsInfo.forEach((color) => {
        listofcolors.push(color.colorName);
      });

    const handleselectedColor = (color: string) => {
      setSelectedColor(color);
    };

    return (
      <div className="flex ml-6 items-center">
        <span className="mr-3">Colors</span>
        <SelectWithArrow
          options={listofcolors}
          onChange={handleselectedColor}
          selectedValue={selectedColor}
        />
      </div>
    );
  };

  // Function to generate sizes dropdown options
  const sizesDropdown = () => {
    const listofsizes = [] as string[];

    Array.isArray(product.sizesInfo) &&
      product.sizesInfo.forEach((size) => {
        listofsizes.push(size.sizeName);
      });

    const handleselectedSize = (size: string) => {
      setSelectedSize(size);
    };

    return (
      <div className="flex ml-6 items-center">
        <span className="mr-3">Sizes</span>
        <SelectWithArrow
          options={listofsizes}
          onChange={handleselectedSize}
          selectedValue={selectedSize}
        />
      </div>
    );
  };

  return (
    <section className=" container mx-auto  ">
      <div className="text-gray-700 body-font overflow-hidden bg-white mb-10 justify-center ">
        {/* Product details */}
        <div className=" px-5 py-24 flex flex-wrap w-full">
          {/* Product images */}
          <div className=" mx-auto flex flex-wrap justify-center ">
            <div className="flex flex-wrap lg:w-1/2 md:1/2">
              <ImageGallery images={product?.productImages} />
            </div>
            {/* Product information */}
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              {/* Product brand and name */}
              <h2 className="text-lg title-font text-gray-800 tracking-widest">
                {product?.brandInfo?.brandName}
              </h2>
              <h1 className="text-gray-900  text-3xl title-font font-medium mb-1">
                {product?.productName}
              </h1>
              {/* Product rating and sharing */}
              <div className="flex mb-4">
                {/* Rating */}
                <span className="flex items-center">
                  <RatingSection rating={product.rating} />
                </span>
                {/* Social media sharing */}
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <FacebookSvg />
                  </a>
                  <a className="ml-2 text-gray-500">
                    <TwitterSvg />
                  </a>
                  <a className="ml-2 text-gray-500">
                    <MessengerSvg />
                  </a>
                </span>
              </div>
              {/* Product price */}
              <div className="mb-6 pb-5 border-b-2 border-gray-300">
                <span className="text-2xl text-gray-900 font-medium">
                  {product.price ? `£${product.price}` : "-"}
                </span>
                {/* Display discount price and percentage if available */}
                {product.discountPrice && (
                  <div className="mt-2">
                    <span className="text-lg text-gray-500 font-medium line-through">
                      £{fullPrice}
                    </span>
                    <span className="px-3 py-1 text-sm font-semibold bg-green-500 text-white rounded-md ml-2">
                      Save up to {product.discountPrice}%
                    </span>
                  </div>
                )}
              </div>
              {/* Color and size selection */}
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                {colorsDropdown()}
                {sizesDropdown()}
              </div>
              {/* Quantity selection */}
              <div className="flex flex-wrap space-x-0  mb-5">
                <Button
                  className="bg-ui-red px-5"
                  onClick={() => setQuantity(quantity - 1)}
                >
                  {" "}
                  <MinusSvg fg="white" />
                </Button>
                <input
                  className="mx-2 border text-center w-8"
                  type="text"
                  value={quantity}
                />
                <Button
                  className="bg-ui-red px-5"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <PlusSvg fg="white" />
                </Button>
              </div>
              {/* Add to Cart and Buy Now buttons */}
              <div className="flex flex-wrap space-x-4 mb-5  ">
                <Button
                  className="bg-gray-700 px-5 md:px-16  md:py-3 flex hover:bg-gray-800 items-center  "
                  onClick={handleAddToCart}
                >
                  {/* Display spinner or cart icon based on loading */}
                  {isSaving ? (
                    <div className="flex justify-center">
                      <Spinner color="text-gray" size={6} />
                    </div>
                  ) : (
                    <span className="flex  items-center">
                      <Cart fg="white" /> &nbsp; Add to Cart
                    </span>
                  )}
                </Button>

                <Button
                  className="bg-orange-500 px-5 md:px-16 md:py-3  hover:bg-orange-600  flex items-center"
                  onClick={handleAddToCartAndBuy}
                >
                  <CardSvg fg="white" /> &nbsp; Buy Now
                </Button>
              </div>
              {/* Shipping and payment information */}
              <div className="flex  items-center pb-5  border-b-2 border-gray-200 mb-5">
                <p className=" flex text-sm text-gray-700 mr-3 py-2 ">
                  <ShippingSvg fg="red" />
                  &nbsp; Free shipping worldwide
                </p>
                <p className=" flex text-sm text-gray-700 mr-3 py-2">
                  <CardSvg fg="red" />
                  &nbsp; 100% Secured Payment
                </p>
                <p className=" flex text-sm text-gray-700 py-2">
                  <UserSvg fg="red" />
                  &nbsp; Made by the Professionals
                </p>
              </div>
              {/* Display alert */}
              <div className="mt-8">
                {isAlertVisible && (
                  <Alert
                    type={alertType}
                    message={alertMessage}
                    onClose={handleAlertClose}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Product description */}
        <div className="container mx-auto px-12 ">
          <div className="">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Product Description
            </h1>
          </div>
          <p className="leading-relaxed text-gray-600 text-md border-gray-200 border-t-2  py-10  text-justify ">
            {/* Product description text */}
            Fam locavore kickstarter distillery. Mixtape chillwave tumeric
            sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
            juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
            seitan poutine tumeric. Gastropub blue bottle austin listicle
            pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.
          </p>
        </div>
      </div>
      {/* Display login modal if required */}
      {loginModalVisible && (
        <Modal isModalVisible={loginModalVisible}>
          <LoginPage onClose={() => setLoginModalVisible(!loginModalVisible)} />
        </Modal>
      )}
    </section>
  );
};

// Export the ProductDetailsCard component as the default export
export default ProductDetailsCard;
