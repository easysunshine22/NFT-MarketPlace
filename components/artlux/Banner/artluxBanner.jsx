import React, { useContext, useEffect, Component } from "react";
import Slider from "react-slick";
import Link from "next/link";
import ArtCarousel from "../../cards/artCarousel";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ArtluxBanner = ({ listings, collectionList }) => {
  const SlickArrowLeft = ({ onClick }) => (
    <i className="slick-arrow prev fa fa-arrow-left" onClick={onClick}></i>
  );

  const SlickArrowRight = ({ onClick }) => (
    <i className="slick-arrow next fa fa-arrow-right" onClick={onClick}></i>
  );
  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    dots: false,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,

    centerMode: true,
    centerPadding: "200px",
    responsive: [
      {
        breakpoint: 1445,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "50px",
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
          slidesToShow: 1.3,
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
          <a href="/collection/explore_collection" class="primary-btn">
            Get Started
          </a>
        </div>
      </div>
      <div class="banner-right">
        <Slider {...settings}>
          {collectionList?.map((collectionList) => (
            <Link href={`/collection/${collectionList.title}`}>
              <a>
                <div class="banner-single-slide">
                  <div class="banner-slide-thumb">
                    <img src={collectionList.featuredImageUrl} alt="" />
                    <h3>
                      {collectionList.title}{" "}
                      <span class="d-block">
                        {collectionList.floorPrice} AD
                      </span>
                    </h3>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ArtluxBanner;
