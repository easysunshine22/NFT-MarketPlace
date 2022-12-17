import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Ally } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { coverflow_data } from "../../data/coverflow_data";
import Link from "next/link";
import Image from "next/image";
import NotableCard from "./notableCard";

const coverCarousel = ({ collectionItem }) => {
  return (
    <section>
      {/* <!-- Coverflow Slider --> */}

      {/* <!-- Slider --> */}
      <Swiper
        breakpoints={{
          // when window width is >= 640px
          100: {
            // width: 640,
            slidesPerView: 1,
          },
          575: {
            // width: 640,
            slidesPerView: 2,
          },
          800: {
            // width: 640,
            slidesPerView: 3,
          },
          1100: {
            // width: 640,
            slidesPerView: 4,
          },
          1360: {
            // width: 640,
            slidesPerView: 5,
          },
          // when window width is >= 768px
        }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={5}
        loop={true}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-4",
          prevEl: ".swiper-button-prev-4",
        }}>
        {collectionItem.map((collectionItem, index) => (
          <SwiperSlide>
            <NotableCard
              title={collectionItem.title}
              logo={collectionItem.logoImageUrl}
              banner={collectionItem.featuredImageUrl}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <!-- end coverflow slider --> */}
    </section>
  );
};

export default coverCarousel;
