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
          <a
            href="#_"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-base leading-6 text-white bg-[#D831B3] border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
            View All
          </a>
        </div>
      </div>
      <div className="">
        <div className="flex flex-wrap items-center justify-center ">
          <Link href="#">
            <div className="flex mt-2 ">
              <div className="mx-2 rounded-3xl">
                <img
                  src="nft/rectangle.png"
                  className=" rounded-lg shadow-md object-fill h-full w-full"
                />
                <div>
                  <div className="flex pr-16 justify-center pl-8 md:-mt-20  -mt-16">
                    <div className="flex mx-auto pr-12 text-center items-center lg:-mb-[32px]  lg:shadow-2xl shadow-md bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-l-full rounded-r-[4000px] border-[2px] shadow-blue-400">
                      <img
                        src="https://source.unsplash.com/random/350x350"
                        className=" md:w-[64px] w-[48px] rounded-full border-[2px]"
                      />
                      <h4 className="  lg:text-lg text-[10px] text-white font-semibold uppercase text-center items-center ml-3">
                        The Sandbox California
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href="#">
            <div className="flex mt-2 ">
              <div className="mx-2 rounded-3xl">
                <img
                  src="nft/rectangle.png"
                  className=" rounded-lg shadow-md object-fill h-full w-full"
                />
                <div>
                  <div className="flex pr-16 justify-center pl-8 md:-mt-20  -mt-16">
                    <div className="flex mx-auto pr-12 text-center items-center lg:-mb-[32px]  lg:shadow-2xl shadow-md bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-l-full rounded-r-[4000px] border-[2px] shadow-blue-400">
                      <img
                        src="https://source.unsplash.com/random/350x350"
                        className=" md:w-[64px] w-[48px] rounded-full border-[2px]"
                      />
                      <h4 className="  lg:text-lg text-[10px] text-white font-semibold uppercase text-center items-center ml-3">
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
