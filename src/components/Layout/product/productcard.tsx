import Image from "next/image";
import React from "react";
import StarRatings from "react-star-ratings";
import { Product } from "@/Lib/types";
import { Image_Url } from "@/utils/config";

const ProductImage = ({ imageUrl }: { imageUrl: string | undefined }) => (
  <div>
    <a href="#">
      <Image
        width={500}
        height={700}
        className="object-fit h-full bg-transparent p-10 aspect-[1/1] brightness-105 w-full    cursor-pointer   hover:scale-105 transition duration-300"
        src={Image_Url + imageUrl}
        alt="product image"
      />
    </a>
  </div>
);

const ProductTitle = ({ title }: { title: string }) => (
  <a href="#">
    <h5 className="text-sm font-medium tracking-tight text-gray-800 dark:text-white text-center ">
      {title}
    </h5>
  </a>
);

export const RatingSection = ({ rating }: { rating: number }) => (
  <div className="flex justify-center mt-1 mb-2">
    <StarRatings
      rating={rating}
      starRatedColor="orange"
      numberOfStars={5}
      name="rating"
      starDimension="15px"
      starSpacing="1px"
    />
    {/* <span className="bg-blue-100 text-blue-500 text-xs font-semibold mr-2 px-2.5 py-1 rounded dark:bg-blue-200 dark:text-blue-500 ml-3">
      {rating}
    </span> */}
  </div>
);

const PriceSection = ({
  price,
  discountPrice,
}: {
  price: string;
  discountPrice: string;
}) => {
  const fullPrice =
    (Number(discountPrice) / 100) * Number(price) + Number(price);

  return (
    <div className="flex items-center justify-center space-x-4 ">
      {/* {discountPrice && (
        <span className="px-3 py-1 text-xs font-semibold bg-green-500 text-white rounded-lg dark:text-green-400">
          Save {discountPrice}%
        </span>
      )} */}

      <span className="text-md font-medium text-gray-800 dark:text-gray-100">
        {price ? `£${price}` : "-"}
      </span>
      {discountPrice &&
        discountPrice !== "0" &&
        Number(fullPrice) !== Number(price) && (
          <span className="text-xs font-small text-ui-red dark:text-gray-400 line-through line-through-blue-500">
            £{fullPrice}
          </span>
        )}
    </div>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product, // Update prop name here
}: ProductCardProps) => {
  const fullPrice =
    (Number(product.discountPrice) / 100) * Number(product.price) +
    Number(product.price);
  return (
    <div className="w-full mt-5 bg-white rounded-md  shadow-lg hover:scale-105 transition duration-300 relative">
      {product.productImages && product.productImages.length > 0 && (
        <div className="h-60 aspect-[1/1] w-full bg-white">
          <ProductImage imageUrl={product.productImages?.[0] || ""} />
        </div>
      )}

      <div className="px-5 pb-5">
        <ProductTitle title={product.productName} />
        <RatingSection rating={product.rating} />
        <PriceSection
          price={product.price}
          discountPrice={product.discountPrice}
        />
      </div>

      {Number(product.discountPrice) > 0 && (
        <div className="absolute bottom-1/3 left-0 mt-0 ml-0">
          <span className="px-2 py-1 text-xs font-medium bg-ui-primary text-white  dark:text-ui-primary-dark">
            Save {product.discountPrice}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
