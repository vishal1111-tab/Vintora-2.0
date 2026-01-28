import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules'; // Import Autoplay module

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/autoplay'; // Import autoplay CSS



const SingleBannerCarousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const ImageCarousel = [
    {
      img: 'https://static.vecteezy.com/system/resources/previews/002/006/605/large_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-pink-backgroud-for-banner-market-ecommerce-free-vector.jpg',
      mob_img: 'https://cdn.create.vista.com/downloads/827fad9e-16bf-4bc1-b7a8-a52a468489a2_360.jpeg',
    },
    {
      img: 'https://static.vecteezy.com/system/resources/previews/003/240/364/non_2x/shopping-online-on-phone-paper-art-modern-pink-background-gifts-box-free-vector.jpg',
      mob_img: 'https://img.freepik.com/free-psd/mega-sale-banner-template-instagram-stories_69286-184.jpg?t=st=1740219239~exp=1740222839~hmac=f78a3df30bd1448d1b5f77339c653bee871e9750330ad5f2a72eb3e02b6d5925&w=826',
    },
    {
      img: 'https://static.vecteezy.com/system/resources/previews/003/240/364/non_2x/shopping-online-on-phone-paper-art-modern-pink-background-gifts-box-free-vector.jpg',
      mob_img: 'https://img.freepik.com/premium-psd/black-friday-fashion-banner-template_220346-11877.jpg?w=996',
    },
    {
      img: 'https://static.vecteezy.com/system/resources/previews/003/240/364/non_2x/shopping-online-on-phone-paper-art-modern-pink-background-gifts-box-free-vector.jpg',
      mob_img: 'https://img.freepik.com/free-psd/mega-sale-banner-template-instagram-stories_69286-184.jpg?t=st=1740219239~exp=1740222839~hmac=f78a3df30bd1448d1b5f77339c653bee871e9750330ad5f2a72eb3e02b6d5925&w=826',
    },
    {
      img: 'https://static.vecteezy.com/system/resources/previews/003/240/364/non_2x/shopping-online-on-phone-paper-art-modern-pink-background-gifts-box-free-vector.jpg',
      mob_img: 'https://img.freepik.com/free-psd/mega-sale-banner-template-instagram-stories_69286-184.jpg?t=st=1740219239~exp=1740222839~hmac=f78a3df30bd1448d1b5f77339c653bee871e9750330ad5f2a72eb3e02b6d5925&w=826',
    },
  ];

  return (
    <div className="image-banner-carousel md:mt-[116px] mt-[160px]">
      <Swiper
        spaceBetween={10}
        loop={true}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay: 2500
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {ImageCarousel.map((each, i) => {
          return (
            <SwiperSlide key={i + 1}>
              <img
                className="max-h-[350px] md:!block !hidden hover:scale-[1.04] transition-all duration-1000"
                src={each.img}
                alt=""
              />
              <img
                className="!object-cover max-h-[450px] md:!hidden !block hover:scale-[1.04] transition-all duration-1000"
                src={each.mob_img}
                alt=""
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {ImageCarousel.map((each, i) => {
          return (
            <SwiperSlide key={i + 1}>
              <img
                className="max-h-[100px] md:!block !hidden"
                src={each.img}
                alt=""
              />
              <img
                className="object-cover max-h-[80px] md:!hidden !block"
                src={each.mob_img}
                alt=""
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SingleBannerCarousel;
