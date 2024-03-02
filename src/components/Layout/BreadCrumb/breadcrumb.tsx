import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  title: string;
  href: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, href }) => {
  return (
    <div className="relative">
      <div className="w-full h-60 md:h-72 overflow-hidden rounded-t-lg relative">
        <Image
          src="/images/h.jpg"
          alt=""
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-70 filter blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
      </div>
      <div className="absolute top-1/2 flex justify-center w-full">
        <nav className="w-full bg-white opacity-70 shadow-lg shadow-orange-300 py-8 px-10 max-w-xl rounded-lg ">
          <ol className="flex items-center justify-center">
            <li className="inline-flex items-center">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 me-2.5 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="currentColor"
                    d="M19.707 9.293l-2-2-7-7a1 1 0 00-1.414 0l-7 7-2 2a1 1 0 001.414 1.414L2 10.414V18a2 2 0 002 2h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a2 2 0 002-2v-7.586l.293.293a1 1 0 001.414-1.414z"
                  />
                </svg>
                <Link
                  href="/"
                  className="text-sm font-black uppercase text-gray-500 md:ms-2 dark:text-gray-400 transition duration-300 hover:text-blue-500"
                >
                  Home
                </Link>
              </div>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  href={(href && href) || "/"}
                  className="ms-1 font-black text-sm uppercase  text-orange-500 hover:text-pink-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {title}
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
