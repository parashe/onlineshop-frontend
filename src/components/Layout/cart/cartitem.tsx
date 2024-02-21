import { Image_Url } from "@/utils/config";
import Image from "next/image";
import React from "react";
import { Button } from "../Atom/atom";
import { MinusSvg, PlusSvg } from "../SVG/svg";

interface CartItemProps {
  productName: string;
  brand: string;
  price: string;
  quantity: number;
  productImage: string;
  onQuantityDecrease: () => void;
  onQuantityIncrease: () => void;
  handleRemoveCart: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  productName,
  brand,
  price,
  quantity,
  onQuantityDecrease,
  onQuantityIncrease,
  productImage,
  handleRemoveCart,
}) => {
  return (
    <div className="w-full  bg-gray-50 md:py-10 md:px-10 hover:bg-gray-50 cursor-pointer ">
      <div className="">
        <div className="flex items-center   cursor-pointer  py-5">
          {/* Product details */}
          <div className="flex  w-2/5">
            {/* Product image */}
            <div className="w-20">
              <Image
                width={700}
                height={700}
                className="h-30 object-contain w-full"
                src={Image_Url + productImage}
                alt=" cart product image"
              />
            </div>
            {/* Product info */}
            <div className="flex flex-col px-5 justify-center flex-grow ">
              <span className="font-bold text-sm ">{productName}</span>
              <span className="text-red-500 text-xs">{brand}</span>
              <a
                href="#"
                className="font-semibold text-blue-500 hover:text-ui-primary  text-xs"
                onClick={handleRemoveCart}
              >
                Remove
              </a>
            </div>
          </div>

          <div className="flex flex-wrap space-x-0  mb-5 w-1/5">
            <Button
              onClick={onQuantityDecrease}
              className="bg-ui-primary px-1 pt-1 pb-1 md:px-3 md:pt-2 md:pb-2"
            >
              {" "}
              <MinusSvg fg="white" />
            </Button>
            <input
              className="mx-0 border text-center w-4 md:w-8"
              type="text"
              value={quantity}
            />
            <Button
              onClick={onQuantityIncrease}
              className="bg-ui-primary px-1 pt-1 pb-1 md:px-3 md:pt-2 md:pb-2"
            >
              <PlusSvg fg="white" />
            </Button>
          </div>

          <span className="text-center w-1/5  font-semibold text-sm">
            £{Number(price).toFixed(0)}
          </span>
          <span className="text-center w-1/5 font-semibold text-sm">
            £{(Number(price) * Number(quantity)).toFixed(0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
