import Link from "next/link";
import React from "react";
import { hero_5_data } from "../../data/coverflow_data";
import Feature_collections from "../collectrions/Feature_collections";
import TuikCarousel from "../sliders/carousel/tuikCarousel";

// ThirdWeb
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const Hero = () => {
  return (
    <div>
      {/* <!-- Hero --> */}
      <section>
        <div class=" min-h-screen py-24 ">
          <div class="grid grid-cols-1  md:grid-cols-2 mt-4 ">
            {/* <!-- Hero --> */}
            <div class="bg-hero bg-cover py-36 lg:py-8   ">
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

            <TuikCarousel />
          </div>
        </div>
      </section>

      {/* <!-- end hero --> */}
    </div>
  );
};

export default Hero;
