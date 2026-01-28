import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

const ProductCardsCarousel = () => {

    const ProductImageCarousel =
        [
            {
                img: 'https://cdn.mos.cms.futurecdn.net/whowhatwear/posts/304843/best-hm-items-2023-304843-1690460710525-main-320-80.jpg'
            },
            {
                img: 'https://image.hm.com/assets/hm/05/ce/05ce26a9f60d762cffe44ffb2c87c608715df155.jpg?imwidth=2160'
            },
            {
                img: 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/737b478a86334341d97e45c78c772c6286482034_xxl-1.jpg'
            },
            {
                img: 'https://akns-images.eonline.com/eol_images/Entire_Site/2022917/rs_640x640-221017110215-e-comm-14hm.jpg?fit=around%7C400:400&output-quality=90&crop=400:400;center,top'
            },
            {
                img: 'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/large/a74ff96db7cc2c27c4c400e3fc7425a01b90d327_xxl-1.jpg'
            },
        ]


    return (
        <div className='product-carousel bg-white bg-no-repeat bg-cover' style={{backgroundImage: `url('https://cdn.vectorstock.com/i/500p/84/65/abstract-white-monochrome-background-vector-32028465.jpg')`}}>
            <div className='text-center p-[16px] text-[14px] font-bold hover:scale-[1.1] transition-all duration-1000'>
                <h1>H&M</h1>
            </div>
            <Swiper
                pagination={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}

                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {ProductImageCarousel.map((each, i) => {
                    return (
                        <SwiperSlide key={i + 1}>
                            <img className='h-[300px] object-cover hover:scale-[1.04] transition-all duration-1000' src={each.img} alt="" />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    );
}

export default ProductCardsCarousel