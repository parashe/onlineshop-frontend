// Import necessary modules and components
import { Brand, Categories } from "@/Lib/types"; // Importing Categories type
import { UseBrand, UseCategory, UseProduct } from "@/resources/resources"; // Importing custom hooks
import Link from "next/link"; // Importing the Link component from Next.js
import { useRouter } from "next/router"; // Importing the router hook from Next.js
import React, { useState } from "react"; // Importing React and useState
import { Alert, Spinner, Title } from "../Layout/Atom/atom"; // Importing Spinner component
import ProductCard from "../Layout/product/productcard"; // Importing ProductCard component

// Define an interface for the Category type, extending the Categories type
interface Category extends Categories {
  parent?: Category;
}

// Define the functional component AllProduct
export const AllProduct = () => {
  // Data fetching using custom hooks
  const productData = UseProduct();
  const brandData = UseBrand();
  const router = useRouter();
  const categoryId = router.query.id;
  const brandId = router.query.brandId;

  // State variables using useState hook
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("featured");
  const itemsPerPage = 24;
  const [categoryData, setCategoryData] = useState<Categories | null>(null);
  const [brand, setBrandData] = useState<Brand | null>(null);

  // Fetch data using UseCategory custom hook
  const { data, isLoading, error } = UseCategory();

  // Extract user data from the hook response using useMemo to prevent unnecessary re-renders
  const allproductData = React.useMemo(
    () => productData?.data,
    [productData?.data]
  );

  const allBrandData = React.useMemo(() => brandData?.data, [brandData?.data]);

  // Calculate the total number of pages for pagination
  const totalPages = Math.ceil(
    ((Array.isArray(allproductData?.products) &&
      allproductData?.products.length) ||
      0) / itemsPerPage
  );

  // Define a function to render the search bar and sort dropdown
  const renderSearchAndDrodownGrid = () => {
    return (
      <>
        <div className="md:flex items-center justify-start gap-6 mb-6">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-2/5 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ui-primary-dark"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Sort dropdown */}
          <select
            className="border cursor-pointer rounded-md px-4 md:mt-0 mt-4 py-2 focus:outline-none focus:ring-2 focus:ring-ui-primary-dark"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </>
    );
  };

  // Define a function to render the product grid
  const renderProductGrid = () => {
    // Filter and sort products based on search, category, and sorting options
    const filteredProducts =
      Array.isArray(allproductData?.products) &&
      allproductData?.products.filter((product: any) => {
        // Filter by search query
        const productNameMatches = product.productName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        // Filter by category
        if (categoryData) {
          const categoryMatches = product.category.includes(categoryData._id); // Assuming categories is an array of category IDs in the product object
          return productNameMatches && categoryMatches;
        }

        if (categoryId) {
          const categoryFiltered = product.category.includes(categoryId);
          return productNameMatches && categoryFiltered;
        }

        if (brand) {
          const brandMatches =
            product.brand && product.brand.includes(brand._id);
          return productNameMatches && brandMatches;
        }

        if (brandId) {
          const brandFiltered =
            product.brand && product.brand.includes(brandId);

          return productNameMatches && brandFiltered;
        }

        return productNameMatches;
      });

    // Sort and paginate filtered products
    const sortedAndPaginatedProducts =
      Array.isArray(filteredProducts) &&
      filteredProducts
        ?.sort((a: any, b: any) => {
          if (sortOption === "price") {
            return a.price - b.price;
          } else if (sortOption === "price-desc") {
            return b.price - a.price;
          }
          // Add more sorting conditions if needed
          return 0;
        })
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <>
        {Array.isArray(sortedAndPaginatedProducts) &&
        sortedAndPaginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            {sortedAndPaginatedProducts.map((product: any, index: number) => (
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
        ) : (
          <div className="w-full py-10">
            <Alert
              type="error"
              message="Sorry, unable to find the product you are looking for"
            />
          </div>
        )}
      </>
    );
  };

  // Define a function to organize categories into a hierarchical structure
  const organizeCategories = (categories: Category[]): Category[] => {
    const categoriesMap: Record<string, Category> = {};
    const rootCategories: Categories[] = [];

    categories.forEach((category) => {
      categoriesMap[category._id] = { ...category, categories: [] };

      if (
        category.parentCategory === undefined ||
        category.parentCategory === null
      ) {
        rootCategories.push(categoriesMap[category._id]);
      } else {
        const parent = categoriesMap[category?.parentCategory];
        // if (!parent?.categories) {
        //   parent.categories = [];
        // }
        parent?.categories?.push(categoriesMap[category._id]);
        categoriesMap[category._id] &&
          categoriesMap[category._id].parent === parent;
      }
    });

    return rootCategories;
  };

  // Define a function to render a category and its child categories
  const renderCategory = (category: Categories) => (
    <div key={category._id} className="my-4">
      <div className="">
        <label className=" items-center cursor-pointer ">
          <span
            className={`w-full py-0   ${
              category.parentCategory
                ? " dark:text-gray-300 py-0"
                : "text-gray-900 dark:text-gray-100 text-sm font-bold"
            }`}
          >
            {category?.categoryName}
          </span>
        </label>
        <div className="text-justify space-x-1">
          {category.categories.map((childCategory) => (
            <div
              key={childCategory._id}
              className="cursor-pointer px-2 py-1 rounded-lg text-xs  text-gray-800 hover:bg-gray-100   "
              onClick={() => setCategoryData(childCategory)}
            >
              {childCategory.categoryName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const rendBrands = () => {
    return (
      allBrandData &&
      allBrandData.brands.map((brand: any) => {
        return (
          <div key={brand._id} className="text-justify py-0 ">
            <li
              onClick={() => setBrandData(brand)}
              style={{ listStyleType: "none" }}
              className="cursor-pointer px-2 py-1 rounded-lg text-xs  text-gray-800 hover:bg-gray-100   "
            >
              {brand.brandName}
            </li>
          </div>
        );
      })
    );
  };

  // Define the content to be rendered based on data loading and availability
  let windowContent = <></>;

  if (productData?.isLoading || isLoading || brandData?.isLoading) {
    // Show loading spinner
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-opacity-40 z-[100]">
        <Spinner size={24} color="text-light-200" />
      </div>
    );
  } else if (productData.error || !allproductData || error || !allBrandData) {
    // Show error message if data is not available
    windowContent = (
      <div className="container mx-auto">
        <div className=" w-full justify-center text-center">
          <Alert type="error" message="Network Error or Data not available" />
        </div>
      </div>
    );
  } else {
    // Show user data table if data is available
    windowContent = (
      <div className="flex flex-col-reverse justify-center md:flex-row mt-10  bg-white border-2 p-10  ">
        <div className="w-full md:w-[20%] lg:w-1/6 bg-white p-4 my-10">
          <div className="text-left relative pb-2  border-b-2 border-ui-primary-dark ">
            <h3 className="text-xl uppercase font-black dark:bg-gray-200 text-gray-800">
              Categories
            </h3>
          </div>
          {organizeCategories(
            data && data.categories ? data.categories : []
          ).map(renderCategory)}

          <div className="text-left relative pb-2  border-b-2 border-ui-primary-dark ">
            <h3 className="text-xl uppercase font-black dark:bg-gray-200 text-gray-800">
              Brands
            </h3>
          </div>
          {rendBrands()}
        </div>

        {/* Main content area */}
        <div className="w-full  md:w-[80%] lg:w-[95%] p-4 mt-10 ">
          {/* search and dropdown */}
          {renderSearchAndDrodownGrid()}

          {/* Product grid */}
          {renderProductGrid()}

          {totalPages > 1 && (
            <div className="p-4">
              <ul className="flex space-x-2 justify-end">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      className={`px-3 py-2 rounded-md ${
                        currentPage === index + 1
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-600"
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <>{windowContent}</>;
};

export default AllProduct;
