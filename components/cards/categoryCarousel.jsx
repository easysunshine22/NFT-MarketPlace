import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "tippy.js/dist/tippy.css";
import Browse_category_data from "../../data/Browse_category_data";
import Link from "next/link";

const categoryCarousel = () => {
  return (
    <div className="overflow-hidden">
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        loop={true}
        breakpoints={{
          // when window width is >= 640px
          100: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          // when window width is >= 768px
          700: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 7,
            spaceBetween: 30,
          },
        }}
        className=" card-slider-4-columns !py-5"
        style={{ transform: "scaleX(1.2)" }}>
        {Browse_category_data.map((item) => {
          const { id, image, title, bgColor } = item;
          return (
            <SwiperSlide key={id}>
              <article>
                <div class="relative w-[250px] h-[400px] rounded-2xl  overflow-hidden">
                  <img
                    src="nft/2331.png"
                    alt="Avatar"
                    class="object-cover w-full h-full"
                  />
                  <div class="absolute w-full py-6 bottom-0 uppercase inset-x-0 bg-blue-400 bg-opacity-25  backdrop-blur-lg text-white  text-center leading-4">
                    this is a text
                  </div>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default categoryCarousel;
