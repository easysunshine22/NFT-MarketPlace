import React from "react";
import Slider from "react-slick";

const ArtluxBanner = () => {
  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    dots: false,

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
    <section id="banner" className="banner-area">
      <div className="banner-left">
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
      <div className="banner-right">
        <Slider {...settings} className="banner-sliders">
          <div className="banner-single-slide">
            <div class="banner-slide-thumb">
              <img src="/images/banner-slide-1.png" alt="" />
              <h3>
                Name of the art <span class="d-block">0.04 ETH</span>
              </h3>
            </div>
          </div>
          <div className="banner-single-slide">
            <div class="banner-slide-thumb">
              <img src="/images/banner-slide-2.png" alt="" />
              <h3>
                Name of the art <span class="d-block">0.04 ETH</span>
              </h3>
            </div>
          </div>
          <div className="banner-single-slide">
            <div class="banner-slide-thumb">
              <img src="/images/banner-slide-3.png" alt="" />
              <h3>
                Name of the art <span class="d-block">0.04 ETH</span>
              </h3>
            </div>
          </div>
          <div className="banner-single-slide">
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
