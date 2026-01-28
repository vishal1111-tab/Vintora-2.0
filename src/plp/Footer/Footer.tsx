
const Footer = () => {
    return (
        <div className="flex flex-col w-full md:mb-[0] mb-[50px]">
            <div className="bg-[#fafafa] px-[30px] py-[12px] flex gap-[20px] justify-around">
                <div className="flex flex-col md:gap-[20px] gap-[12px] justify-start items-center flex-[1_1_30%]">
                    <img className="md:w-[60px] w-[40px] md:h-[60px] h-[40px]" src="https://cdn-icons-png.flaticon.com/512/26/26892.png" alt="" />
                    <div className="md:text-[24px] text-[12px] text-center font-bold uppercase">
                        Vintage
                    </div>
                </div>
                <div className="flex flex-col md:gap-[20px] gap-[12px] justify-start items-center flex-[1_1_30%]">
                    <img className="md:w-[60px] w-[40px] md:h-[60px] h-[40px]" src="https://cdn-icons-png.flaticon.com/512/4185/4185148.png" alt="" />
                    <div className="md:text-[24px] text-[12px] text-center font-bold uppercase">
                        Trusted
                    </div>
                </div>
                <div className="flex flex-col md:gap-[20px] gap-[12px] justify-start items-center flex-[1_1_30%]">
                    <img className="md:w-[60px] w-[40px] md:h-[60px] h-[40px]" src="https://png.pngtree.com/png-vector/20230223/ourmid/pngtree-trust-line-icon-png-image_6615381.png" alt="" />
                    <div className="md:text-[24px] text-[12px] text-center font-bold uppercase">
                        Assured Quality
                    </div>
                </div>
            </div>



            <div className="bg-black text-white text-[14px] md:px-[100px] px-[12px] py-[30px] flex md:flex-row flex-col gap-[20px] justify-around">
                <div className="flex md:flex-nowrap flex-wrap md:gap-[4px] gap-[24px] w-full">
                    <div className="flex-[1_1_25%] flex flex-col gap-[8px]">
                        <div className="font-bold">
                            Vintora
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <a className="!text-[#d2d2d2] hover:!underline hover:!text-white" href="/">About us</a>
                            <a className="!text-[#d2d2d2] hover:!underline hover:!text-white" href="/">Terms & Condition</a>
                            <a className="!text-[#d2d2d2] hover:!underline hover:!text-white" href="/">Fees & Payments</a>
                            <a className="!text-[#d2d2d2] hover:!underline hover:!text-white" href="/">Returns & Refund Policy</a>
                        </div>
                    </div>
                    <div className="flex-[1_1_25%] flex flex-col gap-[8px]">
                        <div className="font-bold">
                            Help
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <a className="!text-[#d2d2d2] hover:!underline hover:!text-white" href="/">Track Order</a>
                            <a className="!text-[#d2d2d2] hover:!underline hover:!text-white" href="/">FAQs</a>
                            <a className="!text-[#d2d2d2] hover:!underline hover:!text-white" href="/">Returns</a>
                            <a className="!text-[#d2d2d2] hover:!underline hover:!text-white" href="/">Cancellations</a>
                            <a className="!text-[#d2d2d2] hover:!underline hover:!text-white" href="/">Payments</a>
                            <a className="!text-[#d2d2d2] hover:!underline hover:!text-white" href="/">Customer Care</a>
                        </div>
                    </div>
                    <div className="flex-[1_1_25%] flex flex-col gap-[8px]">
                        <div className="font-bold">
                            Shop By
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <a className="!text-[#d2d2d2] hover:!underline hover:!text-white" href="/">Men</a>
                            <a className="!text-[#d2d2d2] hover:!underline hover:!text-white" href="/">Women</a>
                        </div>
                    </div>
                    <div className="flex-[1_1_25%] flex flex-col md:gap-[24px] gap-[12px]">
                        <div className="font-bolc">Follow Us On</div>
                        <div className="flex gap-[12px]">
                            <a className="cursor-pointer" href="/">
                                <img className="md:w-[40px] w-[30px] md:h-[40px] h-[30px] rounded-full " src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="" />
                            </a>
                            <a className="cursor-pointer" href="/">
                                <img className="md:w-[40px] w-[30px] md:h-[40px] h-[30px] rounded-full " src="https://cdn-icons-png.freepik.com/256/5968/5968764.png?semt=ais_hybrid" alt="" />
                            </a>
                            <a className="cursor-pointer" href="/">
                                <img className="md:w-[40px] w-[30px] md:h-[40px] h-[30px] rounded-full " src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="h-[2px]" />
            <div className="bg-black w-full px-[24px] py-[15px] flex justify-center items-center text-white font-bold">
                © 2025 Vintora
            </div>

        </div>
    )
}

export default Footer