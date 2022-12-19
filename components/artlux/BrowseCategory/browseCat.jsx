import React from "react";
import Slider from "react-slick";

const browseCat = ({ categoryList }) => {
  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    adaptiveHeight: true,
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
            {categoryList?.map((categoryList) => (
              <div class="category-slide-item">
                <img src={categoryList.featuredImageUrl} alt="" />
                <h3>{categoryList.category}</h3>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default browseCat;
