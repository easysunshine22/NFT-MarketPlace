import Link from "next/link";
import React from "react";
import { CiFacebook, CiInstagram, CiTwitter, CiLinkedin } from "react-icons/ci";

const Cta = () => {
  return (
    <div>
      {/* <!-- CTA --> */}
      <div className="relative z-10 pt-32 bg-[#1F2330]">
        <div className="container">
          <div className="relative overflow-hidden rounded-2.5xl pt-16 pb-8 shadow-md ">
            <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
              <img
                src="/images/gradient_light.jpg"
                alt="gradient"
                className="h-full w-full"
              />
            </picture>
            <picture className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
              <img
                src="/images/gradient_dark.jpg"
                alt="gradient dark"
                className="h-full w-full"
              />
            </picture>
            <div className="items-center justify-center flex">
              <div className="mb-6 text-center justify-center">
                <h2 className="mb-4 font-display text-2xl text-jacarta-700 dark:text-white sm:text-3xl">
                  Stay In The Loop
                </h2>
                <div className="flex flex-wrap justify-center  sm:flex-nowrap">
                  <input
                    className=" text-lg text-black rounded sm:mr-4 px-4 sm:pr-40 s:pr-0 py-4  bg-gray-900 "
                    placeholder="Enter your email"
                    type="text"
                  />
                  <button
                    type="button"
                    class="text-white bg-gradient-to-br from-purple-600 to-blue-500 
					hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm 
          px-5 s:mt-2 sm:mt-0 flex items-center s:py-2 sm:py-0     ">
                    Sign Up
                  </button>
                </div>
                <div className="py-4 mt-4 sx-mt-0 flex items-center justify-center">
                  <CiFacebook
                    className="icon"
                    style={{
                      top: "20px",
                      right: "20px",
                    }}
                    size="50px"
                    color="black"
                  />
                  <CiInstagram
                    className="icon"
                    style={{
                      top: "20px",
                      right: "20px",
                    }}
                    size="50px"
                    color="black"
                  />
                  <CiTwitter
                    className="icon"
                    style={{
                      top: "20px",
                      right: "20px",
                    }}
                    size="50px"
                    color="black"
                  />
                  <CiLinkedin
                    className="icon"
                    style={{
                      top: "20px",
                      right: "20px",
                    }}
                    size="50px"
                    color="black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end cta --> */}
    </div>
  );
};

export default Cta;
