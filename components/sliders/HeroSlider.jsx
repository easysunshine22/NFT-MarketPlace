import React from "react";
import HeadLine from "../headLine";
import Feature_collections_carousel from "../carousel/Feature_collection_carousel";
import Image from "next/image";
import HeroCarousel from "./carousel/heroCarousel";

const HeroSlider = ({ bgWhite = false }) => {
  return (
    <div>
      <section className="h-20 w-full object-cover sm:h-56 md:h-full">
        <div className="container">
          <div className="relative">
            <HeroCarousel />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSlider;
