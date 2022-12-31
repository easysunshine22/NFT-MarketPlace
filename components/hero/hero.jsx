import Link from "next/link";
import React from "react";
import { hero_5_data } from "../../data/coverflow_data";
import Feature_collections from "../collectrions/Feature_collections";
import ArtCarousel from "../cards/artCarousel";

// ThirdWeb
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const Hero = ({ collectionItem }) => {
  return (
    <section id="banner" className="banner-area">
      <div className="banner-left">
        <div>
          <h1>A NFTs Marketplace</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in
            magna
          </p>
          <a href="#" className="primary-btn">
            Get Started
          </a>
        </div>
      </div>
      <div className="banner-right">
        <div className="banner-sliders">
          <ArtCarousel collectionItem={collectionItem} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
