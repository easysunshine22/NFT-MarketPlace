import Link from "next/link";
import React from "react";
import { hero_5_data } from "../../data/coverflow_data";
import Feature_collections from "../collectrions/Feature_collections";
import ArtCarousel from "../cards/artCarousel";

// ThirdWeb
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const Hero = ({ collectionItem }) => {
  return (
    <div class=" flex flex-col pt-16 pb-8   lg:pt-28 lg:flex-row lg:items-center">
      <div class="flex flex-col items-center  justify-center w-full lg:flex-row lg:w-1/2 bg-hero bg-cover bg-center h-[550px]">
        <div class="max-w-lg lg:mx-12 lg:order-2 s:mx-6">
          <h1 class="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl">
            The best Apple Watch apps
          </h1>
          <p class="mt-4 text-gray-600 dark:text-gray-300">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut quia
            asperiores alias vero magnam recusandae adipisci ad vitae laudantium
            quod rem voluptatem eos accusantium cumque.
          </p>
          <div class="mt-6">
            <a
              href="#"
              class="px-6 py-2.5 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none">
              Download from App Store
            </a>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center w-full h-[550px]  lg:w-1/2">
        <ArtCarousel collectionItem={collectionItem} />
      </div>

      {/* <!-- Hero -->
      <section>
        <div class=" flex flex-col  mx-auto space-y-6   lg:flex-row lg:items-center  ">
          {/* <!-- Hero --> 
          <div class=" bg-hero bg-cover bg-center flex items-center justify-center w-full h-full lg:w-1/2   ">
            <div class="lg:my-[250px] mx-auto max-w-xl  text-center ">
              <h2 class="lg:text-7xl font-bold text-left text-white md:text-3xl">
                A NFTs Marketplace
              </h2>

              <p class="hidden text-white/90 text-left sm:mt-4 sm:block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
                egestas tempus tellus etiam sed. Quam a scelerisque amet
                ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
                quisque ut interdum tincidunt duis.
              </p>

              <div class="mt-4 text-left md:mt-8">
                <a
                  href="#"
                  class="inline-block rounded-[24px]  shadow-[0px_22px_70px_10px_rgba(0,0,0,0.56)]  shadow-jacarta-100/50  bg-[#d831b3] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#f364d4] hover:text-white focus:outline-none focus:ring focus:ring-yellow-400">
                  Get Started
                </a>
              </div>
            </div>
          </div>
          <div className="bg-sliderbg bg-cover bg-center flex flex-col items-center mx-auto  w-full h-full lg:flex-row lg:w-1/2">
           
            <ArtCarousel collectionItem={collectionItem} />
          </div>
        </div>
      </section>
       */}

      {/* <!-- end hero --> */}
    </div>
  );
};

export default Hero;
