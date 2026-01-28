import React, {useState, useRef, useEffect} from "react";
import { useCart } from '../Store/CartContext';
import { Navigate, useNavigate } from "react-router-dom";
import ShareIconPopup from "./ShareIconPopup";

interface ProductImage {
    src: string;
    alt: string;
    label: string; // Added label for different views
}

interface Product {
  product_name: string;
  category: string;
  discount: string;
  ratings: string;
  image: string;
  redirection: string;
  selling_price: string;
  orignal_price: string;
  fit: string;
}

interface ImageCarouselProps {
    product?: Product;
    onBackToList?: () => void;
}

const ImageCarousel = ({ product, onBackToList }: ImageCarouselProps) => {
    const { state, dispatch } = useCart();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [shareicon, setShareicon] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Default product data if no product is provided
    const defaultProduct: Product = {
        product_name: "Women Graphic Print Oversized Cotton Crew-Neck T-Shirt",
        category: "DNMX",
        discount: "30% Off",
        ratings: "3.9",
        image: "https://images.bewakoof.com/t640/women-s-baby-lavender-stay-weird-graphic-printed-super-loose-fit-sweater-597240-1726138227-1.jpg",
        redirection: "/product/default",
        selling_price: "₹299",
        orignal_price: "₹428",
        fit: "Oversized"
    };

    // Use the product from props, context, or default
    const currentProduct = product || state?.selectedProduct || defaultProduct;

    // Generate different views of the same product
    const generateProductImages = (baseImage: string, productName: string): ProductImage[] => {
        // For women's clothing, we'll simulate different views with CSS transforms
        const views = [
            { label: "Front View", transform: "" },
            { label: "Back View", transform: "scaleX(-1)" },
            { label: "Side View", transform: "perspective(1000px) rotateY(15deg)" },
            { label: "Close-up", transform: "scale(1.2)" },
            { label: "Flat Lay", transform: "perspective(1000px) rotateX(15deg)" },
            { label: "Model View", transform: "brightness(1.1)" },
            { label: "Detail Shot", transform: "scale(1.3) brightness(1.1)" },
            { label: "Lifestyle", transform: "sepia(0.1)" },
            { label: "Size Guide", transform: "contrast(1.1)" }
        ];

        return views.map((view, index) => ({
            src: baseImage,
            alt: `${productName} - ${view.label}`,
            label: view.label
        }));
    };

    // Create images with different views
    const images: ProductImage[] = generateProductImages(currentProduct.image, currentProduct.product_name);

    // Get CSS transform for different views
    const getImageTransform = (index: number): string => {
        const transforms = [
            "", // Front View - no transform
            "scaleX(-1)", // Back View - flip horizontal
            "perspective(1000px) rotateY(15deg)", // Side View
            "scale(1.2)", // Close-up
            "perspective(1000px) rotateX(15deg)", // Flat Lay
            "brightness(1.1)", // Model View
            "scale(1.3) brightness(1.1)", // Detail Shot
            "sepia(0.1)", // Lifestyle
            "contrast(1.1)" // Size Guide
        ];
        return transforms[index] || "";
    };

    // Cart management functions
    const isInCart = (productName: string): boolean => state?.cart.includes(productName) || false;

    const handleCartToggle = (productName: string): void => {
        if (isInCart(productName)) {
            dispatch({ type: "REMOVE_FROM_CART", payload: productName });
        } else {
            dispatch({ type: "ADD_TO_CART", payload: productName });
        }
    };

    // Calculate discount percentage
    const calculateDiscountPercentage = (originalPrice: string, sellingPrice: string) => {
        const original = parseInt(originalPrice.replace('₹', '').replace(',', ''));
        const selling = parseInt(sellingPrice.replace('₹', '').replace(',', ''));
        const discountPercentage = Math.round(((original - selling) / original) * 100);
        return discountPercentage;
    };

    // Calculate discounted price for offers
    const calculateOfferPrice = (sellingPrice: string, offerDiscount: number) => {
        const selling = parseInt(sellingPrice.replace('₹', '').replace(',', ''));
        const offerPrice = selling - offerDiscount;
        return `₹${offerPrice}`;
    };

    const handleClick = () => {
        setShareicon(!shareicon);
        console.log('Share clicked')
    };

    const handleArrowClick = (direction: 'up' | 'down') => {
        const newIndex = direction === 'up'
            ? Math.max(0, selectedIndex - 1)
            : Math.min(images.length - 1, selectedIndex + 1);
        
        setSelectedIndex(newIndex);
        scrollToThumbnail(newIndex);
    };

    const scrollToThumbnail = (index: number) => {
        if (scrollContainerRef.current) {
            const thumbnailHeight = 57;
            scrollContainerRef.current.scrollTop = index * thumbnailHeight;
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientY);
    };

    const handleTouchEnd = () => {
        const touchDiff = touchStart - touchEnd;
        if (Math.abs(touchDiff) > 50) {
            if (touchDiff > 0) {
                handleArrowClick('down');
            } else {
                handleArrowClick('up');
            }
        }
    };

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const sizeRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                handleArrowClick('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                handleArrowClick('down');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex]);


    const SkeletonLoader = () => {
        return (
            <div className="animate-pulse flex flex-col md:flex-row max-w-[1150px] m-auto mt-[140px] mb-[70px]">
                <div className="md:w-2/5 flex justify-center bg-gray-300 h-[600px] w-full"></div>
                <div className="w-full md:w-3/5 px-[32px] md:px-[40px] text-center md:ml-auto mt-[25px] mb-[30px] bg-white">
                    <div className='md:ml-[100px]'>
                        <div className="h-6 bg-gray-300 justify-center rounded w-4/4 mb-4 gap-[20px]"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
                        <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
                        <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
                        <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
                        <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
                    </div>
                </div>
            </div>
        );
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            setErrorMessage("ℹ️ Please Select a Size");
            setTimeout(() => setErrorMessage(""), 5000);
        } else {
            // Add to cart before buying if not already in cart
            if (!isInCart(currentProduct.product_name)) {
                handleCartToggle(currentProduct.product_name);
            }
            alert(`Proceed to Buy Now with size: ${selectedSize} for ${currentProduct.product_name}`);
        }
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            setErrorMessage("ℹ️ Please Select a Size");
            setTimeout(() => setErrorMessage(""), 5000);
            sizeRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            handleCartToggle(currentProduct.product_name);
            const action = isInCart(currentProduct.product_name) ? "removed from" : "added to";
            alert(`${currentProduct.product_name} - Size ${selectedSize} ${action} cart`);
        }
    }

    if (loading) {
        return <SkeletonLoader />;
    }

    return (
        <div className="flex flex-col md:flex-row justify-center gap-0 md:gap-[90px] mt-[120px] mb-[42px]">
            {/* Back Button */}
            {onBackToList && (
                <div className="fixed top-4 left-4 z-20">
                    <button
                        onClick={onBackToList}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
            )}

            <div className="md:flex mt-0 md:mt-10 justify-between">
                {/* Desktop Thumbnail Navigation */}
                <div className="hidden md:flex md:flex-col h-[460px] w-[200px] mt-[70px]">
                    <div className="mx-auto mb-[25px]">
                        <img className="h-[38px] w-[38px] cursor-pointer transform rotate-180" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQdlCqpbFF6wAjzJXf6daWJl2ZAf2k33NB0Q&s"
                            onClick={() => handleArrowClick('up')}
                            alt="Scroll up"/>
                    </div>
                    <div ref={scrollContainerRef} className="overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}>
                        {images.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className={`cursor-pointer transition-all duration-200 h-full w-[50px] mx-auto mb-[7px] border border-solid border-black
                                    ${selectedIndex === index ? 'opacity-50' : ''}`}
                                    style={{ 
                                        transform: getImageTransform(index),
                                        transformOrigin: 'center'
                                    }}
                                    onClick={() => setSelectedIndex(index)}
                                />
                                {/* Tooltip showing view type */}
                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                    {image.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mx-auto mt-[25px]">
                        <img className="h-[38px] w-[38px] cursor-pointer" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQdlCqpbFF6wAjzJXf6daWJl2ZAf2k33NB0Q&s"
                            onClick={() => handleArrowClick('down')}
                            alt="Scroll down"/>
                    </div>
                </div>

                {/* Mobile Image Swiper */}
                <div className="md:hidden w-full overflow-hidden">
                    <div className="flex transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateY(-${selectedIndex * 100}%)`,
                            width: '100%'
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}>
                        {images.map((image, index) => (
                            <div key={index} className="w-full flex-shrink-0">
                                <img 
                                    src={image.src} 
                                    alt={image.alt} 
                                    className="w-full h-auto"
                                    style={{ 
                                        transform: getImageTransform(index),
                                        transformOrigin: 'center'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Image Display */}
                <div className="relative">
                    <div className="flex justify-between items-center">
                        <div className="relative">
                            <img 
                                className="mx-auto md:mx-0 h-[500px] md:h-[600px] w-fit md:w-[475px] transition-transform duration-300" 
                                src={images[selectedIndex].src}
                                alt="image not found"
                                style={{ 
                                    transform: getImageTransform(selectedIndex),
                                    transformOrigin: 'center'
                                }}
                            />
                            {/* View Label */}
                            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
                                {images[selectedIndex].label}
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-2">
                            <img className="h-[45px] w-[45px]" src="/share.png" onClick={handleClick} alt="Share"/>
                            {shareicon && <ShareIconPopup />}
                        </div>
                    </div>
                </div>   
            </div>

            {/* Product Details Section */}
            <div className='w-full md:w-3/5 px-[32px] md:px-[40px] md:ml-auto mt-[25px] mb-[30px] bg-white'>
                <div className='mb-[10px]'>
                    <h1 className='text-[15px] md:text-[20px] text-[#000000] md:text-center'>{currentProduct.category}</h1>
                    <h2 className='md:overflow-visible text-[18px] font-medium md:text-center text-[#333]'>
                        {currentProduct.product_name}
                    </h2>
                </div>

                <div className='flex md:justify-center items-center mb-[10px]'>
                    <span className='flex bg-green-600 text-white text-[12px] px-[4px] py-[2px] rounded'>
                        {currentProduct.ratings} ★
                    </span>
                    <span className='text-gray-600 text-[12px] px-[7px] py-[4px]'>
                        77 Ratings
                    </span>
                </div>

                <div className='mb-6'>
                    <div className='flex md:justify-center items-center gap-2'>
                        <span className='text-[24px] font-medium'>MRP {currentProduct.selling_price}</span>
                        {currentProduct.orignal_price !== currentProduct.selling_price && (
                            <span className='text-[18px] text-gray-500 line-through'>{currentProduct.orignal_price}</span>
                        )}
                        {currentProduct.orignal_price !== currentProduct.selling_price && (
                            <span className='text-[14px] text-green-600 font-medium'>
                                ({calculateDiscountPercentage(currentProduct.orignal_price, currentProduct.selling_price)}% Off)
                            </span>
                        )}
                    </div>
                    <div>
                        <span className='flex pt-[3px] md:justify-center text-[12px] text-gray-500 text-[#6d6d6d]'>
                            Price inclusive of all taxes
                        </span>
                    </div>

                    <div className='get_offers flex md:justify-center mt-[4px] mb-[8px]'>
                        <div className='w-[218px] border border-dashed border-[#d8d8d8] rounded-lg bg-white'>
                            <div className='bg-[#FFFFFF] px-[10px] py-[1px] text-[13px]'>
                                Get it for <span className='text-[#000000] text-[13px] font-bold'>{calculateOfferPrice(currentProduct.selling_price, 91)}</span>
                                <hr />
                            </div>
                            <p className='text-[12px] text-[#6d6d6d] mt-1 mb-[8px] pl-[10px]'>
                                Get Flat Rs 300 Off on cart value of 990 & Above.{' '}
                                <a href='#' className='text-[#000000] font-medium underline'>
                                    View All Products
                                </a>
                            </p>
                        </div>
                    </div>

                    {showAll && (
                        <>
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className='get_offers flex md:justify-center mt-[4px] mb-[8px]'>
                                    <div className='w-[218px] border border-dashed border-[#d8d8d8] rounded-lg bg-white'>
                                        <div className='bg-[#FFFFFF] px-[10px] py-[1px] text-[13px]'>
                                            Get it for <span className='text-[#000000] text-[13px] font-bold'>{calculateOfferPrice(currentProduct.selling_price, 91)}</span>
                                            <hr />
                                        </div>
                                        <p className='text-[12px] text-[#6d6d6d] mt-1 mb-[8px] pl-[10px]'>
                                            Get Flat Rs 300 Off on cart value of 990 & Above.{' '}
                                            <a href='#' className='text-[#000000] font-medium underline'>
                                                View All Products
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    <button
                        className='text-[#000000] text-[12px] font-medium underline mt-2 flex md:justify-center w-full'
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? 'View Less' : '+4 More'}
                    </button>
                </div>

                <div className='bg-white' ref={sizeRef}>
                    <div className='flex md:justify-center mb-2 text-[14px] m-[10px]'>
                        <h3>Select Size</h3>
                    </div>
                    <div className="flex gap-[4px] mb-4 md:justify-center flex-wrap">
                        {["XS", "S", "M", "L", "XL"].map((size) => (
                            <div key={size} className="relative group">
                                <button
                                    className={`w-[30px] h-[30px] rounded-full border border-gray-300 flex items-center justify-center text-[12px] transition-colors duration-200 ${selectedSize === size
                                        ? "bg-[#000000] text-white"
                                        : "bg-white text-[#2c4152] hover:bg-[#000000] hover:text-white"
                                        }`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                                <div className="absolute bottom-[110%] left-1/2 -translate-x-1/2 w-[80px] bg-black text-white text-[10px] px-1 py-[2px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    Body Measurement
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='mt-[5px] flex md:justify-center'>
                        <button className='text-[#000000] text-sm'>Check Size Chart</button>
                    </div>
                    <div className='flex md:justify-center'>
                        <p className='text-[12px] text-[#000000] bg-[#FFFFFF] p-3 rounded mt-[8px] mb-[10px] md:m-[20px] max-w-[300px] border border-box'>
                            Select your size to know your estimated delivery date.
                        </p>
                    </div>
                    {errorMessage && (
                        <div className="text-[#000000] text-[15px] text-center m-2">{errorMessage}</div>
                    )}
                </div>

                <div className='flex md:justify-center md:px-4'>
                    <a href='#'>
                        <button
                            className="w-[300px] bg-[#FFFFFF] text-[#000000] py-4 mb-[5px] border border-box hover:bg-[#000000] hover:text-[#FFFFFF] hover:border-[#FFFFFF] transition-all"
                            onClick={(e) => {
                                e.preventDefault();
                                handleBuyNow();
                            }}
                        >
                            BUY NOW
                        </button>
                    </a>
                </div>
                <div className='flex justify-center'>
                    <span className='w-[300px] text-[12px] text-[#6d6d6d] text-center mb-[20px]'>
                        HANDPICKED STYLES | ASSURED QUALITY
                    </span>
                </div>
                <div className='flex md:justify-center md:px-4'>
                    <a href='#'>
                        <button 
                            className={`border border-solid border-box w-[300px] py-4 rounded mb-[5px] transition-all flex items-center justify-center gap-2 ${
                                isInCart(currentProduct.product_name)
                                    ? 'bg-red-300 text-white hover:bg-red-600'
                                    : 'bg-[#FFFFFF] text-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF] hover:border-[#FFFFFF]'
                            }`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart();
                            }}
                        >
                            <img 
                                className="w-[18px] h-[18px]" 
                                src={
                                    isInCart(currentProduct.product_name)
                                        ? "https://icons.veryicon.com/png/o/miscellaneous/mahealth-pro/delete-295.png" 
                                        : "https://cdn-icons-png.flaticon.com/512/3081/3081840.png" 
                                }
                                alt="cart"
                            />
                            {isInCart(currentProduct.product_name) ? "REMOVE FROM CART" : "ADD TO CART"}
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;