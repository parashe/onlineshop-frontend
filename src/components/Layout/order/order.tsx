import { OrderStatus } from "@/Lib/types";
import { Image_Url } from "@/utils/config";
import Image from "next/image";
import React from "react";
import { Button } from "../Atom/atom";
import { MinusSvg, PlusSvg } from "../SVG/svg";

interface OrderProps {
  items: any;
  orderStatus: OrderStatus[];
}

const OrderLayout: React.FC<OrderProps> = ({
  items,

  orderStatus,
}) => {
  return (
    <div className="w-full   bg-white   ">
    
      {items.map((item: any, index: number) => (
        <div
          key={index}
          className="flex items-center px-5 md:px-12 hover:bg-gray-50 cursor-pointer  shadow-md  py-5 "
        >
          {/* Product details */}
          <div className="flex w-2/5">
            {/* Product image */}
            <div className="w-20">
              <Image
                width={700}
                height={700}
                className="h-30 object-contain w-full"
                src={Image_Url + item.productImage}
                alt=" cart product image"
              />
            </div>

            {/* Product info */}
            <div className="flex flex-col justify-center ml-4 flex-grow ">
              <span className=" text-xs md:font-medium md:text-sm ">
                {item.productName}
              </span>
            </div>
          </div>
          <div className="text-center w-1/3  font-semibold text-sm ">
            <span className="font-bold text-sm ">{item.quantity}</span>
          </div>
          <div className="text-center w-1/3  font-semibold text-sm ">
            <span className="font-bold text-sm ">{item.size}</span>
          </div>
          <div className="text-center w-1/3  font-semibold text-sm ">
            <span className="font-bold text-sm ">{item.color}</span>
          </div>

          <span className="text-center w-1/4 text-xs md:font-medium md:text-sm ">
            £{(Number(item.price) * Number(item.quantity)).toFixed(0)}
          </span>
        </div>
      ))}

{orderStatus && (
        <div className="py-5 px-5 flex flex-row gap-4">
          <h3 className="text-xs font-semibold  ">Order Status:</h3>
          <div className="flex ">
            {orderStatus.map(
              (item, index) =>
                item.isCompleted && (
                  <span
                    key={index}
                    className={`${
                      item.type === "ordered"
                        ? "bg-blue-500"
                        : item.type === "packed"
                        ? "bg-yellow-500"
                        : item.type === "shipped"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    } text-white px-3 py-1 rounded-full text-xs `}
                  >
                    {item.type}
                  </span>
                )
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default OrderLayout;
