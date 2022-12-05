import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import ArtData from "../../data/art_data";
import Link from "next/link";
import "swiper/css/autoplay";

const ArtsCarousel = ({ collectionItem }) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView="auto"
        autoplay={{ delay: 2500 }}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          400: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1025: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className=" flex items-center  ">
        {collectionItem.slice(0, 10).map((collectionItem, index) => (
          <SwiperSlide key={collectionItem._id} className="w-full h-full px-2 ">
            <article className="w-full h-full  rounded-md">
              <div className="flex flex-shrink-0  sm:w-auto  ">
                <img
                  src="/nft/nft1.png"
                  alt="black chair and white table"
                  className="object-cover  h-96 w-full rounded-[20px] "
                />
                <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                  <div className="flex h-full  items-end pb-2 text-center mx-auto">
                    <div class="py-4 mx-auto min-w-full max-h-20  bg-white rounded-xl bg-opacity-10 backdrop-filter backdrop-blur-lg ">
                      <h1 class="text-base  text-white">
                        {collectionItem.title.slice(0, 15)}
                      </h1>
                      <p class="text-base text-white ">
                        {collectionItem.floorPrice} BNB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
        {/* <!-- Slider Navigation --> 
        <div className="group swiper-button-prev shadow-white-volume absolute !top-1/2 !-left-4 z-20 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-left-6 after:hidden">
          <MdKeyboardArrowLeft />
        </div>
        <div className="group swiper-button-next shadow-white-volume absolute !top-1/2 !-right-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-right-6 after:hidden">
          <MdKeyboardArrowRight />
        </div> */}
      </Swiper>
    </>
  );
};

export default ArtsCarousel;
