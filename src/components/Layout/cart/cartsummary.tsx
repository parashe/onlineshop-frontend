import React from "react";
import { Button } from "../Atom/atom";

interface CartSummaryProps {
  totalItems: number;
  totalCost: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, totalCost }) => {
  return (
    <div className="flex flex-col">
      <h1 className=" text-md font-black  ">Order Summary</h1>
      {/* Total items and cost */}
      <div className="flex justify-between py-4 ">
        <span className="font-semibold text-sm uppercase">
          Items {totalItems}
        </span>
        <span className="font-semibold text-sm">£{totalCost.toFixed(0)}</span>
      </div>
      {/* Shipping */}
      <div>
        <label className="font-medium inline-block py-2 text-sm uppercase">
          Shipping
        </label>
        <select className="block p-2 bg-gray-100 text-gray-600 w-full text-sm cursor-pointer outline-none focus:outline-none">
          <option>Standard shipping with in Uk- £10.00</option>
        </select>
      </div>
      {/* Promo code */}
      <div className="py-5">
        <label
          htmlFor="promo"
          className="font-semibold inline-block mb-3 text-sm uppercase"
        >
          Promo Code
        </label>
        <input
          type="text"
          id="promo"
          placeholder="Enter your code"
          className="p-2 text-sm w-full bg-gray-100  "
        />
      </div>
      <Button className="bg-green-500  hover:bg-green-600 px-5 py-2 text-sm text-white uppercase cursor-pointer">
        Apply
      </Button>

      <div className="border-t py-3">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Total cost</span>
          <span>£{Number(totalCost.toFixed(2)) + 10}</span>
        </div>
        <Button className="bg-indigo-500 cusrsor-pointer font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
