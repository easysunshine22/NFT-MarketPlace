import React, { useEffect, useState } from "react";
import Link from "next/link";
const SpotlightCards = () => {
  return (
    <article>
      <div className="container">
        <div className=" items-center justify-between flex flex-wrap pb-4 -mx-12">
          <h2 className="font-bold"> BNB Chain NFT Spotlight </h2>
          <button className="px-8 py-4 bg-accent rounded-full flex text-center items-center">
            {" "}
            View All
          </button>
        </div>
      </div>
      <div className="">
        <div className="flex flex-wrap items-center justify-center ">
          <Link href="#">
            <div class="flex">
              <div class="mx-2 rounded-3xl">
                <img
                  src="nft/rectangle.png"
                  class=" rounded-lg shadow-md h-full w-full"
                />
                <div>
                  <div class="relative pr-24 pl-8 -mt-32  ">
                    <div class="flex mx-auto  text-center items-center -mb-[32px]  shadow-2xl bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-l-full rounded-r-[4000px] border-[2px] shadow-blue-400">
                      <img
                        src="https://source.unsplash.com/random/350x350"
                        class=" w-[96px] rounded-full border-[2px]"
                      />
                      <h4 class="  text-lg text-white font-semibold uppercase text-center items-center ml-3">
                        The Sandbox California
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href="#">
            <div class="flex">
              <div class=" mx-2 rounded-3xl">
                <img
                  src="nft/rectangle.png"
                  class=" rounded-lg shadow-md h-full w-full"
                />
                <div>
                  <div class="relative pr-24 pl-8 -mt-32  ">
                    <div class="flex mx-auto  text-center items-center -mb-[32px]  shadow-2xl bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-l-full rounded-r-[4000px] border-[2px] shadow-blue-400">
                      <img
                        src="https://source.unsplash.com/random/350x350"
                        class=" w-[96px] rounded-full border-[2px]"
                      />
                      <h4 class="  text-lg text-white font-semibold uppercase text-center items-center ml-3">
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
