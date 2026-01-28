import React from 'react'
import { useCart } from '../Store/CartContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const { state , dispatch} = useCart();

    return (
        <div className="flex gap-[16px] justify-between items-center py-[8px] md:px-[54px] px-[8px] fixed top-0 w-full shadow-[0_0_5px_#00000030] bg-white z-30">
            <Link to="/" className="w-[130px] h-full md:block hidden">
                <img className="w-full h-full" src="vintora_logo.png" alt="" />
            </Link>
            <div className="flex flex-col gap-[12px] w-full">
                <div className="flex gap-[4px] md:justify-end justify-between items-center">
                    <Link to="/" className="w-[130px] h-full md:hidden block" >
                        <img className="w-full h-full" src="vintora_logo.png" alt="" />
                    </Link>
                    <div className="flex gap-[4px] justify-end items-center">
                    <Link to="/Register" className="text-[14px] !text-black hover:!underline font-bold px-[4px] py-[8px] cursor-pointer" >
                            Register
                        </Link>
                        <div>
                            /
                        </div>
                        <Link to="/login" className="text-[14px] !text-black hover:!underline font-bold px-[4px] py-[8px] cursor-pointer" >
                            Login
                        </Link>
                    </div>
                </div>
                <div className="flex md:gap-[24px] gap-[12px] px-[4px] justify-between md:flex-row flex-col-reverse">
                    <div className="flex gap-[16px] items-center w-full md:justify-center">
                        <Link to="" className="text-[14px] !text-black font-medium hover:scale-[1.1] transition-all duration-1000 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                                Home
                        </Link>
                        <Link to="/productList" className="text-[14px] !text-black font-medium hover:scale-[1.1] transition-all duration-1000 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                            Clothes
                        </Link>
                        <div className="text-[14px] !text-black font-medium hover:scale-[1.1] transition-all duration-1000 cursor-pointer" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
                            Contact us
                        </div>
                    </div>
                    <div className="flex  gap-[12px] items-center justify-between">
                        <div className="relative flex-grow">
                            <input className="md:w-[300px] w-full bg-[#f2f4f6]  border-solid rounded-full px-[16px] py-[8px] focus:!outline-[1px] focus:outline-[#000000]" type="search" name="" id="" placeholder="Search..." />
                            <a className="h-[20px] w-[20px] block cursor-pointer absolute right-[12px] top-[5px] md:top-[8px]" href="/">
                                <img className="w-full h-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png" alt="" />
                            </a>
                        </div>
                        <Link to="/cart"className="w-[30px] h-[34px]" >
                             <div>
                             <img className="w-full h-full cursor-pointer rotate-y-[180]" src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/shopping_cart.png" alt="" />
                             </div>

                            {state.cart.length > 0 && (
                            <div className='relative bottom-[39px] left-[12px]  w-[17px] h-[17px] bg-red-600 rounded-full items-center m-auto'>
                                <div className='text-[12px] flex items-center justify-center text-white'>{state.cart.length}</div>
                            </div>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header