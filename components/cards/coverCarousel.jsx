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
    <section className="notable-collection-section">
      {/* <!-- Coverflow Slider --> */}
      <img className="shape2" src="/images/shape-left.png" alt="" />
      <div className="notable-collections">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h2>Notable collections</h2>
              </div>
            </div>
          </div>
        </div>
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
          }}
          className="swiper coverflow-slider !py-5 collection-slider-area">
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
      </div>
    </section>
  );
};

export default coverCarousel;
