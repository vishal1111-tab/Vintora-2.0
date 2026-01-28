import React, { useState, useMemo, useEffect } from "react";
import { useCart, type Product } from "../../Store/CartContext";

const MyCart = () => {
    const { state, dispatch } = useCart();

    // Get cart items with their quantities
    const cartItemsWithQuantity = useMemo(() => {
        const itemCounts: Record<string, number> = {};
        state.cart.forEach(productName => {
            itemCounts[productName] = (itemCounts[productName] || 0) + 1;
        });

        return state.products.filter(product => 
            itemCounts[product.product_name]
        ).map(product => ({
            ...product,
            quantity: itemCounts[product.product_name] || 1
        }));
    }, [state.cart, state.products]);

    const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<any>(null);

    // Initialize selected sizes when cart items change
    useEffect(() => {
        const initialSizes = cartItemsWithQuantity.reduce((acc, each) => ({ 
            ...acc, 
            [each.product_name]: selectedSize[each.product_name] || 'M' // Keep existing selection or default to M
        }), {});
        setSelectedSize(initialSizes);
    }, [cartItemsWithQuantity.length]); // Only update when number of items changes

    const handleQtyClick = (product: any) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleIncreaseQty = () => {
     
        if (currentProduct) {
               console.log("currentProduct" , currentProduct);
            const currentQty = state.cart.filter(item => item === currentProduct.product_name).length;
            console.log("currentQty" , currentQty);
            if (currentQty < 10) {
                dispatch({ type: 'ADD_TO_CART', payload: currentProduct.product_name });
            }
        }
    };

    const handleDecreaseQty = () => {
        if (currentProduct) {
            const currentQty = state.cart.filter(item => item === currentProduct.product_name).length;
            if (currentQty > 1) {
                dispatch({ type: 'REMOVE_FROM_CART', payload: currentProduct.product_name });
            }
        }
    };



    const handleRemoveItem = (productName: string) => {
        // Remove all instances of this product from cart
        const itemCount = state.cart.filter(item => item === productName).length;
        for (let i = 0; i < itemCount; i++) {
            dispatch({ type: 'REMOVE_FROM_CART', payload: productName });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
    };

    const handleSizeChange = (size: string) => {
        if (currentProduct?.product_name) {
            setSelectedSize(prev => ({
                ...prev,
                [currentProduct.product_name]: size,
            }));
        }
    };

    const { totalPrice, totalDiscountPrice } = useMemo(() => {
        let totalPrice = 0;
        let totalDiscountPrice = 0;

        cartItemsWithQuantity.forEach((each) => {
            const originalPrice = parseFloat(each.orignal_price.replace('₹', '').replace(',', ''));
            const sellingPrice = parseFloat(each.selling_price.replace('₹', '').replace(',', ''));
            const discountAmount = originalPrice - sellingPrice;
            
            totalPrice += originalPrice * each.quantity;
            totalDiscountPrice += discountAmount * each.quantity;
        });

        return { totalPrice, totalDiscountPrice };
    }, [cartItemsWithQuantity]);

    // Available sizes (you can make this dynamic based on product)
    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

    // Get current quantity for modal display
    const getCurrentQuantity = () => {
        if (!currentProduct) return 0;
        return state.cart.filter(item => item === currentProduct.product_name).length;
    };

    if (cartItemsWithQuantity.length === 0) {
        return (
            <section>
                <div className="flex h-100vh w-100vw justify-center mt-[100px] mb-[60px]">
                    <div className="max-w-[1200px] flex flex-col items-center justify-center w-full">
                        <h2 className="text-[24px] font-bold text-[#1A1A1A] mb-4">Your Cart is Empty</h2>
                        <p className="text-[16px] text-[#6d6d6d] mb-8">Add some products to see them here!</p>
                        <a href="/productList" className="bg-[#000000] text-white px-6 py-3 rounded hover:bg-[#333333] transition-colors">
                            Continue Shopping
                        </a>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="flex h-100vh w-100vw justify-center mt-[100px] mb-[60px]">
                <div className="max-w-[1200px] flex md:flex-row flex-col gap-[15px] w-full">
                    <div className="flex-[1_1_75%] flex flex-col gap-[25px]">
                        <div className="">
                            <span className="text-[22px] text-[#1A1A1A] font-[700]">
                                My Cart {' '}
                            </span>
                            <span className="text-[18px] text-[#6d6d6d]">
                                ({cartItemsWithQuantity.length} {cartItemsWithQuantity.length > 1 ? 'items' : 'item'})
                            </span>
                        </div>

                        {cartItemsWithQuantity.map((each) => {
                            const originalPrice = parseFloat(each.orignal_price.replace('₹', '').replace(',', ''));
                            const sellingPrice = parseFloat(each.selling_price.replace('₹', '').replace(',', ''));
                            const discountAmount = originalPrice - sellingPrice;
                            const discountPercentage = Math.round((discountAmount / originalPrice) * 100);
                            
                            const formattedOriginalPrice = (originalPrice * each.quantity).toLocaleString("en-IN", { maximumFractionDigits: 2, style: 'currency', currency: 'INR' });
                            const formattedSellingPrice = (sellingPrice * each.quantity).toLocaleString("en-IN", { maximumFractionDigits: 2, style: 'currency', currency: 'INR' });
                            const formattedDiscountAmount = (discountAmount * each.quantity).toLocaleString("en-IN", { maximumFractionDigits: 2, style: 'currency', currency: 'INR' });

                            return (
                                <div key={each.product_name} className="flex gap-[15px] border-[1px] border-[#CCCCCC50]">
                                    <div className="h-[168px] w-[150px]">
                                        <img className="object-cover w-full h-full" src={each?.image} alt="" />
                                    </div>
                                    <div className="flex flex-col md:gap-[4px] gap-[16px] p-[15px] w-full justify-between">
                                        <div className="flex gap-[8px] md:flex-row flex-col justify-between">
                                            <div className="flex flex-col gap-[2px] text-[#6D6D6D] flex-[1_1_30%]">
                                                <h1 className="!text-[12px] font-[700] uppercase">{each?.product_name}</h1>
                                                <h3 className="!text-[12px]">{each?.category}</h3>
                                                <h3 className="!text-[12px]">{each?.fit} Fit</h3>
                                            </div>
                                            <div className="flex gap-[4px] flex-[1_1_30%]">
                                                <button className="flex gap-[4px] !rounded-[4px] !bg-[#F0F4F7] focus:!outline-0 p-[5px_10px] items-center justify-center" onClick={() => handleQtyClick(each)}> 
                                                    <div className="text-[10px]">Size</div>
                                                    <div className="text-[12px] font-bold flex gap-[8px] items-center">
                                                        <span>{selectedSize[each.product_name] || 'M'}</span>
                                                        <i className="arrow down "></i>
                                                    </div>
                                                </button>
                                                <button className="flex gap-[4px] !rounded-[4px] !bg-[#F0F4F7] focus:!outline-0 p-[5px_10px] items-center justify-center" onClick={() => handleQtyClick(each)}>
                                                    <div className="text-[10px]">Qty</div>
                                                    <div className="text-[12px] font-bold flex gap-[8px] items-center">
                                                        <span>{each.quantity}</span>
                                                        <i className="arrow down "></i>
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="flex flex-col gap-[4px] flex-[1_1_40%] md:items-end">
                                                <div className="flex gap-[4px] text-[12px]">
                                                    <div className="font-bold">{formattedSellingPrice}</div>
                                                    <div className="text-[#6d6d6d] line-through">{formattedOriginalPrice}</div>
                                                    <div className="text-[#008526]">(-{discountPercentage}%)</div>
                                                </div>
                                                <div className="text-[#008526] text-[10px] font-bold">
                                                    You save {formattedDiscountAmount}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full flex gap-[8px] items-center justify-end'>
                                            <button 
                                                className='register-now !rounded-[2px] border-[1px] border-[black] max-w-[150px] flex gap-[8px] !px-[8px]' 
                                                onClick={() => handleRemoveItem(each.product_name)}
                                            >
                                                <img className="w-[25px] h-[25px]" src="https://icons.veryicon.com/png/o/miscellaneous/mahealth-pro/delete-295.png" alt="" />
                                                <span className='register-text z-10'>Remove </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <div className="flex-[1_1_25%]">
                        <div className=" p-[15px] border-[1px] border-[#CCCCCC50] bg-[#fafafa]">
                            <div className="flex flex-col gap-[25px] text-[14px] font-[400]">
                                <div className="font-bold text-[14px]">Order Details</div>
                                <div className="flex flex-col gap-[8px]">
                                    <div className="flex justify-between">
                                        <div className="">Bag Total</div>
                                        <div>
                                            {totalPrice.toLocaleString("en-IN", { maximumFractionDigits: 2, style: 'currency', currency: 'INR' })}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="">Bag Discount</div>
                                        <div className="text-[#008526]">
                                            - {totalDiscountPrice.toLocaleString("en-IN", { maximumFractionDigits: 2, style: 'currency', currency: 'INR' })}
                                        </div>
                                    </div>
                                    <div className="flex justify-between font-bold">
                                        <div className="">Order Total</div>
                                        <div>
                                            {(totalPrice - totalDiscountPrice).toLocaleString("en-IN", { maximumFractionDigits: 2, style: 'currency', currency: 'INR' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:relative fixed bottom-0 w-full flex gap-[12px] bg-white shadow-[0_0_5px_#00000050]">
                            <div className="flex-[1_1_30%] text-[14px] flex flex-col md:hidden px-[12px] py-[4px] gap-[2px] font-bold justify-center">
                                <div>Total</div>
                                <div>{(totalPrice - totalDiscountPrice).toLocaleString("en-IN", { maximumFractionDigits: 2, style: 'currency', currency: 'INR' })}</div>
                            </div>
                            <a className='border-[1px] border-[#CCCCCC50] bg-[#000000] py-[8px] border-t-[0px] w-full flex gap-[8px] !px-[8px] justify-center hover:outline-1 hover:outline-black hover:bg-white hover:!text-black !text-white' href="/">
                                <span className='hover:scale-[1.1] transition-all z-1 w-full uppercase font-bold text-[14px] flex items-center justify-center'>Proceed To Shipping</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="flex fixed top-0 h-[100vh] w-[100vw] z-20 md:items-center items-end justify-center bg-[#00000030] text-[#1A1A1A]">
                    
                    <div className="bg-white rounded-[4px] pt-[15px] md:max-w-[350px] w-full relative flex flex-col gap-[15px]">
                        <div className="absolute right-0 top-0">
                            <button onClick={handleCloseModal} className="text-[14px] font-bold !border-0 hover:!border-0 focus:!outline-0 px-3 py-1">X</button>
                        </div>
                        <div className="mt-[10px] px-[15px] flex flex-col gap-[8px]">
                            <div className="text-[16px] font-bold">Select Size:</div>
                            <div className="flex gap-[8px] overflow-scroll h-[60px] items-center">
                                {availableSizes.map((size: string) => (
                                    <button
                                        key={size}
                                        className={`flex items-center justify-center min-w-[50px] h-[50px] !border-[1px] !rounded-full focus:!outline-0 ${selectedSize[currentProduct?.product_name] === size ? '!bg-[#000000] text-white' : 'bg-[#F0F4F7] text-[#000000]'}`}
                                        onClick={() => handleSizeChange(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="px-[15px] flex flex-col gap-[8px]">
                            <div className="text-[16px] font-bold">Select Quantity</div>
                            <div className="flex justify-start items-center">
                                <button 
                                    onClick={handleDecreaseQty} 
                                    className="text-[18px] !border-0 hover:!border-0 focus:!outline-0 px-3 py-1 bg-gray-100 rounded"
                                    disabled={getCurrentQuantity() <= 1}
                                >
                                    -
                                </button>
                                <span className="mx-[10px] px-3 py-1 border rounded">{getCurrentQuantity()}</span>
                                <button 
                                    onClick={handleIncreaseQty} 
                                    className="text-[18px] !border-0 hover:!border-0 focus:!outline-0 px-3 py-1 bg-gray-100 rounded"
                                    disabled={getCurrentQuantity() >= 10}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center w-full">
                            <button onClick={handleCloseModal} className="!border-[1px] w-full border-[#CCCCCC50] !bg-[#000000] px-[20px] py-[8px] !rounded-[0px] uppercase font-bold text-[14px] hover:outline-1 hover:outline-black hover:!bg-white hover:!text-black !text-white">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MyCart;