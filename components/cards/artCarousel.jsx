import Image from "next/image";
import "tippy.js/dist/tippy.css";
import { bidsData } from "../../data/bids_data";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { bidsModalShow } from "../../redux/counterSlice";
import { useDispatch } from "react-redux";
import Likes from "../likes";
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
        className=" banner-sliders ">
        {collectionItem &&
          collectionItem.map((collectionItem, _id) => (
            <SwiperSlide className="banner-single-slide">
              <div class="banner-slide-thumb">
                <img src="/images/banner-slide-1.png" alt="" />
                <h3>
                  Name of the art <span class="d-block">0.04 ETH</span>
                </h3>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* <!-- Slider Navigation --> */}
    </>
  );
};

export default ArtsCarousel;
