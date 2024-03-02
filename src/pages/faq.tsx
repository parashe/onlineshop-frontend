import { useState, useEffect } from "react";
import Navbar from "@/components/Layout/Navbar/Navbar";
import { About } from "@/components/window/about";
import { Contact } from "@/components/window/contact";
import Testimonial from "@/components/window/testomonial";
import { Spinner } from "@/components/Layout/Atom/atom";
import FAQSection from "@/components/window/faq";
import { Breadcrumb } from "@/components/Layout/BreadCrumb/breadcrumb";
import WhyWeSection from "@/components/window/whywe";
import Footer from "@/components/window/footer";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a 10-second delay
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      {isLoading ? (
        // Show a loading screen while isLoading is true
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center  bg-opacity-40 z-[100]">
          <Spinner size={20} color="text-light-200" />
        </div>
      ) : (
        // Once isLoading is false, render the actual content
        <>
          <Navbar />
          <Breadcrumb title="FAQ" href="faq" />
          <FAQSection />

          <WhyWeSection />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
