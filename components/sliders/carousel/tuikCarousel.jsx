import React, { useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsArrowLeftCircle,
} from "react-icons/bs";

const TuikCarousel = ({ collectionItem }) => {
  return (
    <div className="w-full lg:py-40 md:py-6 py-0 bg-sliderbg bg-cover">
      <div className="flex items-center justify-center w-full h-full ">
        {/* Carousel for desktop and large size devices */}
        <CarouselProvider
          className="lg:block hidden"
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={5}
          visibleSlides={2}
          step={2}
          infinite={true}>
          <div className="w-full relative flex items-center justify-center">
            <ButtonBack
              role="button"
              aria-label="slide backward"
              className="absolute  w-full flex justify-between z-20"
              id="prev">
              <BsFillArrowLeftCircleFill
                size={60}
                color="white"
                className=" -translate-x-8 bg-black/50 rounded-full active:translate-y-0.5 "
              />
            </ButtonBack>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
              <Slider>
                <div
                  id="slider"
                  className="h-full w-[75%] flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                  {collectionItem.slice(0, 5).map((collectionItem, index) => (
                    <Slide index={0}>
                      <div className="flex flex-shrink-0 relative w-full sm:w-auto ">
                        <img
                          src="/nft/nft1.png"
                          alt="black chair and white table"
                          className="object-cover  h-[512px] w-[512px] rounded-[20px] "
                        />
                        <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                          <div className="flex h-full  items-end pb-2 text-center mx-auto">
                            <div className="py-4 mx-auto min-w-full max-h-20  bg-white rounded-xl bg-opacity-10 backdrop-filter backdrop-blur-lg ">
                              <h1 className="text-base  text-white">
                                {collectionItem.title.slice(0, 15)}
                              </h1>
                              <p className="text-base text-white ">
                                {collectionItem.floorPrice} BNB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Slide>
                  ))}
                  {/*/ 
                  <Slide index={1}>
                    <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                      <img
                        src="/nft/nft1.png"
                        alt="black chair and white table"
                        className="object-cover  h-[512px] w-[512px] rounded-[20px] "
                      />
                      <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                        <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">
                          Test 1
                        </h2>
                        <div className="flex h-full items-end pb-6">
                          <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white">
                            Minimal Interior
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Slide>
                  <Slide index={2}>
                    <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                      <img
                        src="/nft/nft1.png"
                        alt="black chair and white table"
                        className="object-cover  h-[512px] w-[512px] rounded-[20px] "
                      />
                      <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                        <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">
                          Test 1
                        </h2>
                        <div className="flex h-full items-end pb-6">
                          <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white">
                            Minimal Interior
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Slide>
                  <Slide index={3}>
                    <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                      <img
                        src="/nft/nft1.png"
                        alt="black chair and white table"
                        className="object-cover  h-[512px] w-[512px] rounded-[20px] "
                      />
                      <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                        <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">
                          Test 1
                        </h2>
                        <div className="flex h-full items-end pb-6">
                          <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white">
                            Minimal Interior
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Slide>
                  <Slide index={4}>
                    <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                      <img
                        src="/nft/nft1.png"
                        alt="black chair and white table"
                        className="object-cover  h-[512px] w-[512px] rounded-[20px] "
                      />
                      <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                        <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">
                          Test 1
                        </h2>
                        <div className="flex h-full items-end pb-6">
                          <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white">
                            Minimal Interior
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Slide>
                  <Slide index={5}>
                    <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                      <img
                        src="/nft/nft1.png"
                        alt="black chair and white table"
                        className="object-cover  h-[512px] w-[512px] rounded-[20px] "
                      />
                      <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                        <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">
                          Test 1
                        </h2>
                        <div className="flex h-full items-end pb-6">
                          <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white">
                            Minimal Interior
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Slide> */}
                </div>
              </Slider>
            </div>
            <ButtonNext
              role="button"
              aria-label="slide forward"
              className="absolute z-30 right-0 mr-8 "
              id="next">
              <BsFillArrowRightCircleFill
                size={60}
                color="white"
                className="translate-x-5 bg-black/50 rounded-full active:translate-y-0.5 "
              />
            </ButtonNext>
          </div>
        </CarouselProvider>

        {/* Carousel for tablet and medium size devices */}
        <CarouselProvider
          className="lg:hidden md:block hidden"
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={5}
          visibleSlides={2}
          step={1}
          infinite={true}>
          <div className="w-full relative flex items-center justify-center">
            <ButtonBack
              role="button"
              aria-label="slide backward"
              className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
              id="prev">
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 1L1 7L7 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonBack>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
              <Slider>
                <div
                  id="slider"
                  className="h-full w-[75%] flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                  {collectionItem.slice(0, 5).map((collectionItem, index) => (
                    <Slide index={0}>
                      <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                        <img
                          src="https://i.ibb.co/fDngH9G/carosel-1.png"
                          alt="black chair and white table"
                          className="object-cover object-center w-full"
                        />
                        <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                          <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">
                            Catalog 1
                          </h2>
                          <div className="flex h-full items-end pb-6">
                            <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white">
                              Minimal Interior
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Slide>
                  ))}
                </div>
              </Slider>
            </div>
            <ButtonNext
              role="button"
              aria-label="slide forward"
              className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              id="next">
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1L7 7L1 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>

        {/* Carousel for mobile and Small size Devices */}
        <CarouselProvider
          className="block md:hidden "
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={12}
          visibleSlides={1}
          step={1}
          infinite={true}>
          <div className="w-full relative flex items-center justify-center">
            <ButtonBack
              role="button"
              aria-label="slide backward"
              className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
              id="prev">
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 1L1 7L7 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonBack>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
              <Slider>
                <div
                  id="slider"
                  className="h-full w-full flex lg:gap-8 md:gap-6 items-center justify-start transition ease-out duration-700">
                  {collectionItem.slice(0, 5).map((collectionItem, index) => (
                    <Slide index={0}>
                      <div className="flex flex-shrink-0 relative w-full sm:w-auto ">
                        <img
                          src="/nft/nft1.png"
                          alt="black chair and white table"
                          className="object-cover  h-[512px] w-[512px] rounded-[20px] "
                        />
                        <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                          <div className="flex h-full  items-end pb-2 text-center mx-auto">
                            <div className="py-4 mx-auto min-w-full max-h-20  bg-white rounded-xl bg-opacity-10 backdrop-filter backdrop-blur-lg ">
                              <h1 className="text-base  text-white">
                                {collectionItem.title.slice(0, 15)}
                              </h1>
                              <p className="text-base text-white ">
                                {collectionItem.floorPrice} BNB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Slide>
                  ))}
                </div>
              </Slider>
            </div>
            <ButtonNext
              role="button"
              aria-label="slide forward"
              className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              id="next">
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1L7 7L1 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>
    </div>
  );
};

export default TuikCarousel;
