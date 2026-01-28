import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import UseMedia from '../Hook/UseMedia';
import { useCart, type Product , type FilterState } from '../Store/CartContext';
import { productsData } from '../data/productData';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

interface ProductListProps {
  onProductSelect?: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onProductSelect }) => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate(); // Add this hook
  const [isFilter, setFilter] = useState(false);
  const { isMobile } = UseMedia();

  // State for tracking active filters
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    categories: [],
    discounts: [],
    ratings: [],
    fits: [],
  });

  const [showAllFilters, setShowAllFilters] = useState<Record<string, boolean>>({});

  // Load products on component mount
  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS', payload: productsData });
  }, [dispatch]);

  if (!state) return null;

  const categories = activeFilters.categories;

  // Get products based on filter state
  const products = state.filterData.length > 0 ? state.filterData : state.products;

  // Cart management functions
  const isInCart = (productName: string): boolean => state.cart.includes(productName);

  const handleCartToggle = (productName: string): void => {
    if (isInCart(productName)) {
      dispatch({ type: "REMOVE_FROM_CART", payload: productName });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: productName });
    }
  };

  // Updated handleProductDetail function with navigation
  const handleProductDetail = (product: Product) => {
    // Store the selected product in context
    dispatch({ type: "SHOW_PRODUCT", payload: product});
    
    // If a callback is provided, use it
    if (onProductSelect) {
      onProductSelect(product);
    }
    
    // Navigate to product detail page
    navigate('/productdetail');
    
    console.log('Selected product:', product);
  }

  const handleFilter = () => {
    if(isMobile){
      setFilter(!isFilter);
    }
  }

  // Filter handling functions
  const handleFilterChange = (value: string, filterType: keyof FilterState): void => {
    setActiveFilters(prev => {
      const updatedFilters = { ...prev };
      const filterArray = updatedFilters[filterType];

      if (filterArray.includes(value)) {
        updatedFilters[filterType] = filterArray.filter(item => item !== value);
      } else {
        updatedFilters[filterType] = [...filterArray, value];
      }

      // Dispatch filter action
      if (Object.values(updatedFilters).some(arr => arr.length > 0)) {
        dispatch({
          type: "SET_FILTERS",
          payload: { filters: updatedFilters }
        });
      } else {
        dispatch({ type: "CLEAR_FILTERS" });
      }
      console.log(" updatedFilters " , updatedFilters );
      return updatedFilters;
    });
  };

  // Utility function to get unique values
  const getUniqueData = (data: Product[], property: keyof Product): string[] => {
    const values = data
      .map(item => item[property])
      .filter(value => value && value.toString().trim() !== ""); // Remove empty or undefined values

    return [...new Set(values)] as string[];
  };

  // Get unique filter values
  const categoryNames = getUniqueData(products, "category");
  const discountNames = getUniqueData(products, "discount");
  const ratingNames = getUniqueData(products, "ratings");
  const fitNames = getUniqueData(products, "fit");

  const renderFilterSection = (
    title: string,
    items: string[],
    filterType: keyof FilterState,
    suffix?: string
  ) => {
    const showAll = showAllFilters[filterType] || false;

    return (
      <>
        <div className='flex justify-between py-[16px] text-[#292d35]'>
          <div className='text-base font-medium'>{title}</div>
        </div>
        <div className='category flex flex-col gap-[9px]'>
          {items.slice(0, showAll ? items.length : 5).map((item) => (
            <div key={item} className='text-[#676767] flex items-center'>
              <input 
                className='w-[16px] h-[16px]' 
                type="checkbox" 
                checked={activeFilters[filterType]?.includes(item)}
                onChange={() => handleFilterChange(item, filterType)}
              />
              <label className='ml-[8px]'>
                {item}{suffix && ` ${suffix}`}
              </label>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Toggle */}
        <div className="flex items-center">
          {items.length > 5 && (
            <button
              className="text-red-600 text-sm mt-2 flex items-center md:gap-[100px]"
              onClick={() =>
                setShowAllFilters((prev) => ({
                  ...prev,
                  [filterType]: !prev[filterType],
                }))
              }
            >
              {showAllFilters[filterType] ? "Show Less" : "Show More"}
              {showAllFilters[filterType] ? <IoIosArrowUp  className='w-[18px] h-[18px]'/> : <IoIosArrowDown className='w-[18px] h-[18px]' />}
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <div className='wrapper flex md:mx-[70px] md:flex-row flex-col md:mt-[108px] mt-[150px]'>
        {/* Filters Section */}
        <div className='left-content md:w-[23%] p-[18px] md:p-[0px] md:cursor-default cursor-pointer'>
          <div className='flex justify-between pt-[4px] mb-[20px]' onClick={handleFilter}>
            <div className='text-[#5e5253] text-xl font-semibold'>Filters</div>
            {state.filterData.length > 0 && (
              <div 
                className='px-3 rounded-lg border border-[#c2bcbc] text-red-500 text-[14px] flex items-center justify-center gap-[12px] cursor-pointer'  
                onClick={() => {
                  setActiveFilters({ categories: [], discounts: [], ratings: [], fits: [] }); 
                  dispatch({ type: "CLEAR_FILTERS" });
                }}
              >
                Clear All  {"  "}
                <div className="ml-5px"> <RxCross1></RxCross1></div>
              </div>
            )}
          </div>
          <hr />
          {isMobile ? 
            <div>
              {isFilter && (
                <div>
                  {renderFilterSection("Category", categoryNames, "categories")}
                  {renderFilterSection("Discount", discountNames, "discounts", "Or More")}
                  {renderFilterSection("Ratings", ratingNames, "ratings", "Or More")}
                  {renderFilterSection("Fit", fitNames, "fits")}
                </div>
              )}
            </div>
            :
            <div>
              {renderFilterSection("Category", categoryNames, "categories")}
              {renderFilterSection("Discount", discountNames, "discounts", "Or More")}
              {renderFilterSection("Ratings", ratingNames, "ratings", "Or More")}
              {renderFilterSection("Fit", fitNames, "fits")}
            </div>
          }
        </div>

        {/* Products Grid */}
        <div className='card right-content md:ml-[30px] mt-[26px] md:mt-0'>
          <div className='text-wrpper flex items-center gap-[6px] ml-[10px]'>
            <div className='md:text-xl font-semibold'>Cloths For {categories?.[0] || "Everyone"}</div>
            <div className='text-base font-normal text-gray-400'>{products.length} products </div>
          </div>
          <div className="product-list grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-3 px-[8px] md:mt-0">
            {products.map((product) => (
              <div key={product.product_name} className="product-card bg-white md:p-4 py-[12px] shadow-md rounded-lg cursor-pointer">
                <div 
                  onClick={() => handleProductDetail(product)}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <img 
                    src={product.image} 
                    className="w-[182px] h-[227px] md:mb-4 mb-[2px] rounded-t-lg" 
                    alt={product.product_name} 
                  />
                </div>
                <div className='px-[8px] flex flex-col gap-[2px] md:gap-[6px]'>
                  <h3 
                    className="textclap md:text-lg md:font-semibold cursor-pointer hover:text-blue-600"
                    onClick={() => handleProductDetail(product)}
                  >
                    {product.product_name}
                  </h3>
                  <div className="flex items-center gap-[4px]">
                    <span className="md:text-xl md:font-bold">{product.selling_price}</span>
                    <span className="text-sm text-gray-400 line-through">{product.orignal_price}</span>
                    <span className="text-sm text-green-600">{product.discount}</span>
                  </div>
                  <div className='flex gap-[8px] md:gap-[12px]'>
                    <button 
                      className='bg-white md:font-medium text-[12px] text-black md:p-[4px] flex-grow py-[5px] rounded-[5px] px-[4px] outline flex items-center md:gap-[14px] justify-center outline-gray-300 gap-[6px] cursor-pointer'
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering product detail
                        handleCartToggle(product.product_name);
                      }}
                    >
                      <img 
                        className="md:w-[18px] md:h-[18px] w-[14px] h-[14px]" 
                        src={
                          isInCart(product.product_name)
                            ? "https://icons.veryicon.com/png/o/miscellaneous/mahealth-pro/delete-295.png" 
                            : "https://cdn-icons-png.flaticon.com/512/3081/3081840.png" 
                        }
                        alt="cart"
                      />
                      {isInCart(product.product_name) ? "Remove From Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;