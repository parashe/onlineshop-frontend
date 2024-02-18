import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Title } from "../Layout/Atom/atom";

const TestimonialCarousel: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO, Company A",
      quote:
        " I love shopping on this ecommerce site! The product selection is vast, and the search filters.",
      image: "/images/test1.webp",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "COO, Company B",
      quote:
        "This ecommerce site has become my go-to place for online shopping. The interface is intuitive.",
      image: "/images/test2.jpg",
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "CTO, Company C",
      quote:
        "I have been a loyal customer of this ecommerce site for years, and for good reason",
      image: "/images/test3.jpg",
    },
    {
      id: 4,
      name: "Sarah Williams",
      position: "CMO, Company D",
      quote:
        "I have been a loyal customer of this ecommerce site for years, and for good reason",
      image: "/images/test4.jpeg",
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <div className="container mx-auto py-10 my-10">
        <div className="md:mt-10 mb-10 pt-10 md:px-20 xl:px-32 ">
        <div className="text-left ml-2 px-2  ">
                <Title title="What Our Customers Say" />
              </div>
              <div className="px-5">
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px "
            arrows={false}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-10 flex flex-row justify-between gap-6 items-center shadow-lg border border-gray-50 bg-white  "
              >
                <div className="mx-auto mb-4 h-20 w-64 md:h-24 md:w-48 rounded-full overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    objectFit="cover"
                    src={testimonial.image}
                    alt="testimonial"
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <div className="flex flex-col items-center text-justify">
                    <p className="text-sm text-gray-800 md:pl-10 md:pr-10">
                      {testimonial.quote}
                    </p>
                    <p className="text-sm font-semibold text-ui-primary-dark mt-2">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-800 mt-2">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialCarousel;
