import { UseOrder } from "@/resources/resources";

import React, { useState } from "react";
import { Alert, Spinner } from "../Layout/Atom/atom";
import OrderLayout from "../Layout/order/order";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export const MyOrders = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState(" ");
  const [alertMessage, setAlertMessage] = useState("");

  const { isAuthenticated } = useAuth();

  const orders = UseOrder();

  const allorders = React.useMemo(
    () => orders?.data?.orders,
    [orders?.data?.orders]
  );

  // Function to handle closing the alert
  const handleAlertClose = () => {
    setIsAlertVisible(false);
  };
  // Determine the content of the window based on loading, error, or data availability
  let windowContent = <></>;
  if (!isAuthenticated) {
    windowContent = (
      <div className="container mx-auto">
        <div className=" mt-12 py-32 text-center">
          <Alert
            type="error"
            message="You need to be logged in to view your Order"
            onClose={handleAlertClose}
          />
        </div>
      </div>
    );
  }

  if (orders.isLoading) {
    // Show a spinner if data is still loading
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
        <Spinner size={16} color="text-light-200" />
      </div>
    );
  } else if (orders.error || !allorders) {
    // Show an error message if there was a network error or if data is not available
    windowContent = (
      <div className="container mx-auto">
        <div className=" mt-12 py-32 text-center">
          <Alert
            type="error"
            message="You don't have any items in your cart"
            onClose={handleAlertClose}
          />
        </div>
      </div>
    );
  } else {
    // Show the user data table if data is available
    windowContent = (
      <div className="">
      <div className="container mx-auto p-5 md:py-10 ">
      <div className="text-justify pb-5 md:20px md:mx-20 xl:mx-32 ">
              <h1 className="font-black text-md ">My Orders</h1>
            </div>
      <div className="md:20px md:mx-20 xl:mx-32 shadow-sm border border-gray-100 ">
        <div className="flex flex-col md:flex-row">
          <div className=" sm:w-full w-full md:w-full ">
          

            {/* header */}
            <div className="flex  mb-5 bg-ui-primary md:py-5 md:px-5">
              <h3 className="font-semibold text-white text-xs px-1 uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold  text-white   text-xs uppercase w-1/5 text-center">
                Quantity
              </h3>
              <h3 className="font-semibold  text-white  text-xs uppercase w-1/5 text-center">
                Size
              </h3>
              <h3 className="font-semibold  text-white  text-xs uppercase w-1/5 text-center">
                Color
              </h3>
              <h3 className="font-semibold text-center text-white  text-xs uppercase w-1/5">
                Total price
              </h3>
            </div>
            {allorders?.map((item, index) => (
              <OrderLayout
                key={index}
                items={item.items}
                orderStatus={item.orderStatus}
              />
            ))}
            <div className="flex  py-5 justify-center">
           <Link
              href="product"
              className="flex  md:w-[20%] rounded-md bg-ui-secondary py-3 px-5 font-semibold text-white text-sm mt-10 hover:bg-blue-600"
            >
              <svg
                className="fill-current mr-2 text-white w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
          </div>
        </div>
       
      </div>

    </div>
    </div>
    );
  }

  return <>{windowContent}</>;
};

export default MyOrders;
