import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import "tippy.js/dist/tippy.css";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import Feature_collections_data from "../../../data/Feature_collections_data";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroCarousel = () => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}>
        <SwiperSlide>
          <section class="container mx-auto p-10 md:py-20 px-0 md:p-20 md:px-0 antialiased">
            <section class="grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-40 ">
              <article class="mx-auto max-w-sm shadow-xl bg-hero bg-cover bg-center min-h-150 transform duration-500 hover:-translate-y-2 cursor-pointer group">
                <div class="bg-black bg-opacity-20 min-h-150 px-10 flex flex-wrap flex-col pt-96 hover:bg-opacity-75 transform duration-300">
                  <h1 class="text-white text-3xl mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300">
                    On A Day Like Today
                  </h1>
                  <div class="w-16 h-2 bg-yellow-500 rounded-full mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300"></div>
                  <p class="opacity-0 text-white text-xl group-hover:opacity-80 transform duration-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime, beatae!
                  </p>
                </div>
              </article>
            </section>
          </section>
        </SwiperSlide>
      </Swiper>

      {/* <!-- Slider Navigation --> */}
      <div className="group swiper-button-prev shadow-white-volume absolute !top-1/2 !-left-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-left-6 after:hidden">
        <MdKeyboardArrowLeft />
      </div>
      <div className="group swiper-button-next shadow-white-volume absolute !top-1/2 !-right-4 z-10 -mt-6 flex !h-12 !w-12 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl sm:!-right-6 after:hidden">
        <MdKeyboardArrowRight />
      </div>
    </>
  );
};

export default HeroCarousel;
