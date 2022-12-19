import React from "react";
import Slider from "react-slick";
import Link from "next/link";
const notCollection = ({ collectionList }) => {
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
          slidesToShow: 1.1,
          slidesToScroll: 1,
          centerPadding: "30px",
        },
      },
    ],
    className: "collection-slides",
    adaptiveHeight: true,
  };
  return (
    <section className="notable-collection-section">
      <img className="shape2" src="/images/shape-left.png" alt="" />
      <div id="notable-collections">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h2>Notable collections</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="collection-slider-area">
          <Slider {...settings}>
            {collectionList?.map((collectionList) => (
              <Link href={`/collection/${collectionList.title}`}>
                <div className="single-collection-slide">
                  <img
                    className="collection-thumb"
                    src={collectionList.featuredImageUrl}
                    alt=""
                  />
                  <div className="single-collection-slide-description">
                    <img src={collectionList.logoImageUrl} alt="" />
                    <h3>{collectionList.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>

      <div id="spotlight">
        <div className="container">
          <div className="row sportlight-title-wrap">
            <div className="col-md-12 d-flex justify-content-between align-items-center">
              <div className="section-title">
                <h2>BNB Chain NFT spotlight</h2>
              </div>
              <a href="#" className="primary-btn">
                View All
              </a>
            </div>
          </div>
          <div className="row gy-4">
            <div className="col-md-6">
              <div className="spotlight-item">
                <img src="/images/spotlight/1.png" alt="" />
                <div className="spotlight-meta">
                  <img src="/images/spotlight/meta-1.png" alt="" />
                  <h4>Pancake Squad</h4>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="spotlight-item">
                <img src="/images/spotlight/2.png" alt="" />
                <div className="spotlight-meta">
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
