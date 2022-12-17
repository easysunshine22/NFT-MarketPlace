import React, { useContext, useEffect, Component } from "react";
import Slider from "react-slick";
import ArtCarousel from "../../cards/artCarousel";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
const ArtluxBanner = () => {
  const SlickArrowLeft = () => <i className="prev fa fa-arrow-left"></i>;

  const SlickArrowRight = () => <i className="next fa fa-arrow-right"></i>;
  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,

    adaptiveHeight: true,
    dots: false,
    prevArrow: <BsArrowLeftCircle />,
    nextArrow: <BsArrowRightCircle />,
    centerMode: true,
    centerPadding: "150px",
    responsive: [
      {
        breakpoint: 1445,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "50px",
        },
      },
    ],
    className: "banner-sliders",
  };

  return (
    <section id="banner" class="banner-area">
      <div class="banner-left">
        <div>
          <h1>A NFTs Marketplace</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in
            magna
          </p>
          <a href="#" class="primary-btn">
            Get Started
          </a>
        </div>
      </div>
      <div class="banner-right">
        <Slider {...settings}>
          <div class="banner-single-slide">
            <div class="banner-slide-thumb">
              <img src="/images/banner-slide-1.png" alt="" />
              <h3>
                Name of the art <span class="d-block">0.04 ETH</span>
              </h3>
            </div>
          </div>
          <div class="banner-single-slide">
            <div class="banner-slide-thumb">
              <img src="/images/banner-slide-2.png" alt="" />
              <h3>
                Name of the art <span class="d-block">0.04 ETH</span>
              </h3>
            </div>
          </div>
          <div class="banner-single-slide">
            <div class="banner-slide-thumb">
              <img src="/images/banner-slide-3.png" alt="" />
              <h3>
                Name of the art <span class="d-block">0.04 ETH</span>
              </h3>
            </div>
          </div>
          <div class="banner-single-slide">
            <div class="banner-slide-thumb">
              <img src="/images/banner-slide-2.png" alt="" />
              <h3>
                Name of the art <span class="d-block">0.04 ETH</span>
              </h3>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default ArtluxBanner;
