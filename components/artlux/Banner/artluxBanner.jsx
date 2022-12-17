import React, { useContext, useEffect } from "react";
import Slider from "react-slick";
import ArtCarousel from "../../cards/artCarousel";
const ArtluxBanner = () => {
  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    prevArrow: "",
    nextArrow: "",
    centerMode: true,
    centerPadding: "300px",
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
        <div class="banner-sliders">
          <ArtCarousel />
        </div>
      </div>
    </section>
  );
};

export default ArtluxBanner;
