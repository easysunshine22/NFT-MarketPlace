import Link from "next/link";
import React from "react";
import { hero_5_data } from "../../data/coverflow_data";
import Feature_collections from "../collectrions/Feature_collections";
import ArtCarousel from "../cards/artCarousel";

// ThirdWeb
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const Hero = ({ collectionItem }) => {
  return (
    <div className=" flex flex-col pt-[110px]  lg:flex-row lg:items-center">
      <div className="flex flex-col items-center min-h-[800px]  relative z-10 justify-center w-full lg:flex-row lg:w-[44%] bg-hero bg-cover bg-center  shadow-[90px_0px_40px_0px_rgba(255,255,255,0.8)]  ">
        <div className="max-w-lg lg:mx-12 lg:order-2 s:mx-6">
          <h1 className="text-3xl font-bold  text-white dark:text-white lg:text-7xl">
            A NFTs Marketplace
          </h1>
          <p className="mt-4 text-white text-xl dark:text-gray-300">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut quia
            asperiores alias vero magnam
          </p>
          <div className="mt-12">
            <a
              href="/help_center"
              className="px-12 py-4 mt-6 text-lg font-bold shadow-lg shadow-blue-500/50 leading-5 text-center text-white capitalize bg-[#D831B3] rounded-full hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none">
              Get Started
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full min-h-[800px]   bg-sliderbg bg-cover lg:w-[56%] ">
        <ArtCarousel collectionItem={collectionItem} />
      </div>
    </div>
  );
};

export default Hero;
