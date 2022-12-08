import Link from "next/link";
import React, { useEffect } from "react";
import { rankings_data } from "../../data/rankings_data";
import Image from "next/image";
import Recently_added_dropdown from "../../components/dropdown/recently_added_dropdown";
import Head from "next/head";
import Meta from "../../components/Meta";
import { collectRenkingData } from "../../redux/counterSlice";
import { useSelector, useDispatch } from "react-redux";

const ranksComp = ({ collectionItem, blockchainList }) => {
  const { filteredRenkingData } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const categoryText = [
    {
      id: 1,
      text: "All",
    },
    {
      id: 2,
      text: "Art",
    },
    {
      id: 3,
      text: "Collectibles",
    },
    {
      id: 4,
      text: "Domain",
    },
    {
      id: 5,
      text: "Music",
    },
    {
      id: 6,
      text: "Photography",
    },
    {
      id: 7,
      text: "Virtual World",
    },
  ];
  const blockchainText = [
    {
      id: 1,
      text: "Ethereum",
    },
    {
      id: 2,
      text: "Polygon",
    },
    {
      id: 3,
      text: "Flow",
    },
    {
      id: 4,
      text: "Tezos",
    },
  ];
  const last7DaysRanks = [
    {
      id: 1,
      text: "Last 7 Days",
    },
    {
      id: 2,
      text: "Last 14 Days",
    },
    {
      id: 3,
      text: "Last 30 Days",
    },
    {
      id: 4,
      text: "Last 60 Days",
    },
    {
      id: 5,
      text: "Last 90 Days",
    },
    {
      id: 6,
      text: "Last Year",
    },
    {
      id: 7,
      text: "All Time",
    },
  ];

  useEffect(() => {
    dispatch(collectRenkingData(rankings_data));
  }, [dispatch]);

  return (
    <>
      {/* <!-- Rankings --> */}
      <section className="relative s:px-2  lg:pb-24 pb-24 pt-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image
            src="/images/gradient_light.jpg"
            layout="fill"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <div className="sm:container s:px-4 shadow-2xl shadow-jacarta-500/50 rounded-xl">
          {/* <!-- Filters --> */}
          <div className="mb-8 flex flex-wrap items-center s:justify-center sm:justify-between pt-8">
            <div className="flex flex-wrap items-center  s:justify-center sm:justify-between">
              {/* <!-- Categories --> */}

              <a
                href="#_"
                class="inline-flex items-center mr-2 justify-center w-full px-4 py-2 text-base leading-6 text-white bg-[#FBB70A] border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                Trending
              </a>
              <a
                href="#_"
                class="inline-flex items-center justify-center w-full px-4 py-2 text-base leading-6 text-white bg-[#F7D6F0] border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                Top
              </a>
            </div>
            <div className="flex flex-wrap items-center">
              {/* last 7 days */}
              <div class="flex items-center justify-center mr-4 pr-4 border border-grey shadow-lg rounded-full">
                <h2 className="pl-6 px-4 py-2.5 font-bold">All Chains :</h2>
                {blockchainList.map((blockchainList, index) => (
                  <a
                    href="#_"
                    class="items-center flex rounded-full inline-block pr-2">
                    <img
                      src={blockchainList.icon}
                      className="w-[26px] hover:bg-orange active:bg-blue-800 transition duration-150 ease-in-out rounded-full "
                    />
                  </a>
                ))}
              </div>
              <a
                href="#_"
                class="inline-flex items-center justify-center w-full px-4 py-2 text-base leading-6 text-white bg-[#D831B3] border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                View All
              </a>
            </div>
            {/* <!--  --> */}
          </div>
          {/* <!-- end filters --> */}

          {/* <!-- Table --> */}
          <div className="pb-12  -mx-4 relative">
            <div
              role="table"
              className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100  w-full md:min-w-[736px]  border bg-white text-sm dark:text-white">
              <div className="bg-[#045CF7]  flex text-white" role="row">
                <div className="w-[70%] py-3 px-4" role="columnheader">
                  <span className="text-white dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                    Collection
                  </span>
                </div>
                <div
                  className="sm:w-[20%]  py-3 sm:px-0 s:px-4 s:ml-6 sm:ml-0 "
                  role="columnheader">
                  <span className="text-white  dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                    Volume
                  </span>
                </div>

                <div
                  className="sm:w-[10%]  hidden sm:inline py-3 sm:px-4"
                  role="columnheader">
                  <span className="text-white dark:text-jacarta-100 w-full overflow-hidden text-ellipsis">
                    Floor Price
                  </span>
                </div>
              </div>

              {collectionItem.slice(0, 7).map((collectionItem) => (
                <Link
                  href={`/collection/${collectionItem.title}`}
                  key={collectionItem._id}>
                  <a
                    className="flex transition-shadow hover:shadow-lg"
                    role="row">
                    <div
                      className="dark:border-jacarta-600 border-jacarta-100 flex w-[70%] items-center border-t py-4 px-4"
                      role="cell">
                      <span className="mr-2 lg:mr-4">{collectionItem._id}</span>
                      <figure className="relative mr-2 w-8 shrink-0 self-start lg:mr-5 lg:w-12">
                        <img
                          src={collectionItem.logoImageUrl}
                          alt={collectionItem.title}
                          height={32}
                          width={32}
                          className="rounded-2lg w-[32px] h-[32px]"
                        />
                        {/* <img src={image} alt={title} className="rounded-2lg" loading="lazy" />
                        {collectionItem.logoImageUrl && (
                          <div
                            className="dark:border-jacarta-600  absolute -right-2 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                            data-tippy-content="Verified Collection">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              className="h-[.875rem] w-[.875rem] fill-white">
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                            </svg>
                          </div>
                        )}  */}
                      </figure>
                      <span className="font-display text-jacarta-700 text-sm font-semibold dark:text-white">
                        {collectionItem.title}
                      </span>
                    </div>
                    <div
                      className="dark:border-jacarta-600 border-jacarta-100 flex w-[20%]  items-center whitespace-nowrap border-t py-4 px-4 sm:ml-0 s:ml-6"
                      role="cell">
                      <span className="-ml-1" data-tippy-content="ETH">
                        <svg className="icon mr-1 h-4 w-4">
                          <use xlinkHref="/icons.svg#icon-ETH"></use>
                        </svg>
                      </span>
                      <span className="text-sm font-medium tracking-tight">
                        {collectionItem.volumeTraded}
                      </span>
                    </div>

                    <div
                      className="dark:border-jacarta-600 hidden sm:flex border-jacarta-100 flex sm:w-[10%]  items-center border-t py-4 px-4"
                      role="cell">
                      <span className="-ml-1" data-tippy-content="ETH">
                        <svg className="icon mr-1 h-4 w-4">
                          <use xlinkHref="/icons.svg#icon-ETH"></use>
                        </svg>
                      </span>
                      <span className="text-sm font-medium tracking-tight">
                        {collectionItem.floorPrice}
                      </span>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end rankings --> */}
    </>
  );
};

export default ranksComp;
