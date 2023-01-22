import React, { useContext, useEffect, Component } from "react";
import Slider from "react-slick";
import Link from "next/link";
import ArtCarousel from "../../cards/artCarousel";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { homeSliderData, settings } from "../../../artluxData/homeSliderData";

const ArtluxBanner = () => {
  return (
    <section id="banner" className="banner-area">
      <div className="banner-left">
        <div>
          <h1>A NFTs Marketplace</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in
            magna
          </p>
          <a href="/collection/explore_collection" className="primary-btn">
            Get Started
          </a>
        </div>
      </div>
      <div className="banner-right">
        <Slider {...settings}>
          {homeSliderData?.map((collectionList) => (
            <Link href={`/collection/${collectionList.title}`}>
              <a>
                <div className="banner-single-slide">
                  <div className="banner-slide-thumb">
                    <img src={collectionList.featuredImageUrl} alt="" />
                    <h3>
                      {collectionList.title}{" "}
                      <span className="d-block">
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
