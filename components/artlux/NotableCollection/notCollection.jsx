import React from "react";
import Slider from "react-slick";
const notCollection = () => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    centerMode: true,
    centerPadding: "200px",
    responsive: [
      {
        breakpoint: 1445,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "100px",
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
    <section class="notable-collection-section">
      <img class="shape2" src="/images/shape-left.png" alt="" />
      <div id="notable-collections">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="section-title text-center">
                <h2>Notable collections</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="collection-slider-area">
          <div class="collection-slides">
            <Slider {...settings}>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/1.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/2.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/3.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/4.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/5.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/2.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/3.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/1.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>

      <div id="spotlight">
        <div class="container">
          <div class="row sportlight-title-wrap">
            <div class="col-md-12 d-flex justify-content-between align-items-center">
              <div class="section-title">
                <h2>BNB Chain NFT spotlight</h2>
              </div>
              <a href="#" class="primary-btn">
                View All
              </a>
            </div>
          </div>
          <div class="row gy-4">
            <div class="col-md-6">
              <div class="spotlight-item">
                <img src="/images/spotlight/1.png" alt="" />
                <div class="spotlight-meta">
                  <img src="/images/spotlight/meta-1.png" alt="" />
                  <h4>Pancake Squad</h4>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="spotlight-item">
                <img src="/images/spotlight/2.png" alt="" />
                <div class="spotlight-meta">
                  <img src="/images/spotlight/meta-1.png" alt="" />
                  <h4>Pancake Squad</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default notCollection;
