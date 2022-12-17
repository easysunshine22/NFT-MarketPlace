import React from "react";
import Slider from "react-slick";

const browseCat = () => {
  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1445,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 445,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "100px",
        },
      },
    ],
  };
  return (
    <section id="browse-category" class="browse-category">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-title text-center">
              <h2>Browse by category</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="category-slider-area">
        <div class="category-slider">
          <Slider {...settings}>
            <div class="category-slide-item">
              <img src="/images/category/1.png" alt="" />
              <h3>Art</h3>
            </div>
            <div class="category-slide-item">
              <img src="/images/category/2.png" alt="" />
              <h3>Music</h3>
            </div>
            <div class="category-slide-item">
              <img src="/images/category/3.png" alt="" />
              <h3>Photography</h3>
            </div>
            <div class="category-slide-item">
              <img src="/images/category/4.png" alt="" />
              <h3>Trading Card</h3>
            </div>
            <div class="category-slide-item">
              <img src="/images/category/5.png" alt="" />
              <h3>Domain Name</h3>
            </div>
            <div class="category-slide-item">
              <img src="/images/category/6.png" alt="" />
              <h3>Sports</h3>
            </div>
            <div class="category-slide-item">
              <img src="/images/category/3.png" alt="" />
              <h3>Travel</h3>
            </div>
            <div class="category-slide-item">
              <img src="/images/category/2.png" alt="" />
              <h3>Business</h3>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default browseCat;
