import "tippy.js/dist/tippy.css";

import {
  BsFillArrowLeftCircleFill,
  BsArrowRight,
  BsArrowRightCircle,
  BsArrowLeft,
} from "react-icons/bs";
import { BiLeftArrowCircle } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ArtsCarousel = ({ collectionItem }) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={40}
        slidesOffsetBefore={350}
        slidesPerView="auto"
        loop={true}
        breakpoints={{
          300: {
            slidesPerView: 1.3,
            spaceBetween: 20,
          },

          400: {
            slidesPerView: 2.6,
            spaceBetween: 10,
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
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next-4",
          prevEl: ".swiper-button-prev-4",
        }}
        className=" -ml-3 relative z-10 ">
        {collectionItem &&
          collectionItem.map((collectionItem, _id) => (
            <SwiperSlide className="w-full h-full ">
              <article className="w-full h-full  rounded-md sm:w-auto ">
                <div className="flex flex-shrink-0  sm:w-auto s:mx-2 sm:mx-0 ">
                  <img
                    src={collectionItem.featuredImageUrl}
                    className="object-fill object-center rounded-[20px] w-full h-[515px]"
                  />

                  <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full px-4 py-4 ">
                    <div className="flex h-full  items-end justify-center pb-2 text-center ">
                      <div className="min-w-[80%] max-h-20  bg-white rounded-xl bg-opacity-10 py-2 backdrop-filter backdrop-blur-lg ">
                        <h1 className="text-base  text-white">
                          {collectionItem.title.slice(0, 15)}
                        </h1>
                        <p className="text-base text-white ">
                          {" "}
                          {collectionItem.floorPrice} BNB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        <div className="swiper-button-prev-4 group absolute top-1/2 4xl:left-[810px] s:left-4 lg:hidden  z-50  flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl shadow-white-volume">
          <BsArrowLeft
            className="icon absolute z-150 "
            size="30px"
            color="black"
          />
        </div>
        <div className="swiper-button-next-4 group absolute top-1/2 right-4 z-10  flex lg:hidden h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl shadow-white-volume ">
          <BsArrowRight className="icon" size="50px" color="black" />
        </div>
      </Swiper>
      <div className="lg:flex   s:hidden">
        <div className="swiper-button-prev-4 group absolute  s:left-4 z-10 lg:ml-[40%] 2xl:ml-[41%] flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl shadow-white-volume">
          <BsArrowLeft
            className="icon absolute z-150 "
            size="30px"
            color="black"
          />
        </div>
        <div className="swiper-button-next-4 group absolute right-4 z-10   flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white p-3 text-jacarta-700 text-xl shadow-white-volume ">
          <BsArrowRight className="icon" size="50px" color="black" />
        </div>
      </div>
      {/* <!-- Slider Navigation --> */}
    </>
  );
};

export default ArtsCarousel;
