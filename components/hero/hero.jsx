import Link from "next/link";
import React from "react";
import { hero_5_data } from "../../data/coverflow_data";
import Feature_collections from "../collectrions/Feature_collections";
import ArtCarousel from "../cards/artCarousel";

// ThirdWeb
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const Hero = ({ collectionItem }) => {
  return (
    <div class=" flex flex-col pt-16   lg:flex-row lg:items-center">
      <div class="flex flex-col items-center min-h-screen  justify-center w-full lg:flex-row lg:w-[44%] bg-hero bg-cover bg-center   ">
        <div class="max-w-lg lg:mx-12 lg:order-2 s:mx-6">
          <h1 class="text-3xl font-bold  text-white dark:text-white lg:text-7xl">
            A NFTs Marketplace
          </h1>
          <p class="mt-4 text-white text-xl dark:text-gray-300">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut quia
            asperiores alias vero magnam
          </p>
          <div class="mt-6">
            <a
              href="#"
              class="px-16 py-2.5 mt-6 text-sm font-bold shadow-lg shadow-blue-500/50 leading-5 text-center text-white capitalize bg-[#D831B3] rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none">
              Get Started
            </a>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center w-full min-h-screen  bg-sliderbg bg-cover lg:w-[56%]">
        <ArtCarousel collectionItem={collectionItem} />
      </div>
    </div>
  );
};

export default Hero;
