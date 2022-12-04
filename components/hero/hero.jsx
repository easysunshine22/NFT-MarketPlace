import Link from "next/link";
import React from "react";
import { hero_5_data } from "../../data/coverflow_data";
import Feature_collections from "../collectrions/Feature_collections";
import ArtCarousel from "../cards/artCarousel";

// ThirdWeb
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const Hero = ({ collectionItem }) => {
  return (
    <div>
      {/* <!-- Hero --> */}
      <section>
        <div class=" flex min-h-screen pt-24 ">
          {/* <!-- Hero --> */}
          <div class="w-[75%] bg-hero bg-cover bg-center py-24 lg:py-4   ">
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

          <ArtCarousel collectionItem={collectionItem} />
        </div>
      </section>

      {/* <!-- end hero --> */}
    </div>
  );
};

export default Hero;
