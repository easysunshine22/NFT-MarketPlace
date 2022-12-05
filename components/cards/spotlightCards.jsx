import React, { useEffect, useState } from "react";
import Link from "next/link";
const SpotlightCards = () => {
  return (
    <article>
      <div className="sm:container   ">
        <div className=" items-center sm:justify-between justify-center flex flex-wrap pb-4 ">
          {" "}
          <h2 className="font-bold sm:text-2xl text-xl s:mb-3 ">
            {" "}
            BNB Chain NFT Spotlight{" "}
          </h2>
          <button className="sm:ml-0 sl:ml-8 px-8 py-4 bg-accent rounded-full flex text-center items-center">
            {" "}
            View All
          </button>{" "}
        </div>
      </div>
      <div className="">
        <div className="flex flex-wrap items-center justify-center ">
          <Link href="#">
            <div class="flex mt-2 ">
              <div class="mx-2 rounded-3xl">
                <img
                  src="nft/rectangle.png"
                  class=" rounded-lg shadow-md object-fill h-full w-full"
                />
                <div>
                  <div class="flex pr-16 justify-center pl-8 md:-mt-20  -mt-16">
                    <div class="flex mx-auto pr-12 text-center items-center lg:-mb-[32px]  lg:shadow-2xl shadow-md bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-l-full rounded-r-[4000px] border-[2px] shadow-blue-400">
                      <img
                        src="https://source.unsplash.com/random/350x350"
                        class=" md:w-[64px] w-[48px] rounded-full border-[2px]"
                      />
                      <h4 class="  lg:text-lg text-[10px] text-white font-semibold uppercase text-center items-center ml-3">
                        The Sandbox California
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href="#">
            <div class="flex mt-2 ">
              <div class="mx-2 rounded-3xl">
                <img
                  src="nft/rectangle.png"
                  class=" rounded-lg shadow-md object-fill h-full w-full"
                />
                <div>
                  <div class="flex pr-16 justify-center pl-8 md:-mt-20  -mt-16">
                    <div class="flex mx-auto pr-12 text-center items-center lg:-mb-[32px]  lg:shadow-2xl shadow-md bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-l-full rounded-r-[4000px] border-[2px] shadow-blue-400">
                      <img
                        src="https://source.unsplash.com/random/350x350"
                        class=" md:w-[64px] w-[48px] rounded-full border-[2px]"
                      />
                      <h4 class="  lg:text-lg text-[10px] text-white font-semibold uppercase text-center items-center ml-3">
                        The Sandbox California
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SpotlightCards;
