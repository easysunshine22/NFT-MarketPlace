import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Auctions_dropdown from "../../components/dropdown/Auctions_dropdown";
import Social_dropdown from "../../components/dropdown/Social_dropdown";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Meta from "../../components/Meta";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import MyNFTContainer from "../../components/ayrisdev/myNFTContainer";

//sanity
import { client } from "../../lib/sanityClient";
// thirdweb

const Collection = () => {
  //Sanity
  const router = useRouter();
  const { collectionId } = router.query;
  const [collection, setCollection] = useState({});

  // Theme Component
  const [likesImage, setLikesImage] = useState(false);

  // Sanity
  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "collections" && title == "${collectionId}" ] {
      "logoImageUrl": logoImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
  "featuredImageUrl": featuredImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description,
      _id
    }`;

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, "🔥");
  };

  useEffect(() => {
    fetchCollectionData();
  }, [collectionId]);

  const handleLikes = () => {
    if (!likesImage) {
      setLikesImage(true);
    } else {
      setLikesImage(false);
    }
  };

  return (
    <>
      <div className="pt-[5.5rem] lg:pt-24">
        {/* <!-- Banner --> */}
        <div className="relative h-[300px]">
          <img
            src={
              collection?.bannerImageUrl
                ? collection.bannerImageUrl
                : "/images/cta-bg.jpg"
            }
            alt="banner"
            className="object-fill h-[300px] w-full"
          />
        </div>
        {/* <!-- end banner --> */}

        {/* <!-- Profile --> */}

        <section className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-28">
          {/* <!-- Avatar --> */}
          <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <figure className="relative h-40 w-40 dark:border-jacarta-600 rounded-xl border-[5px] border-white">
              <img
                src={
                  collection?.bannerImageUrl
                    ? collection.bannerImageUrl
                    : "https://via.placeholder.com/200"
                }
                alt={collection.title}
                className="dark:border-jacarta-600 rounded-xl border-[5px] border-white"
              />
            </figure>
          </div>

          <div className="container">
            <div className="text-center">
              <h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white">
                {collection.title}
              </h2>
              <div className="mb-8">
                <span className="text-jacarta-400 text-sm font-bold">
                  Created by{" "}
                </span>
                <Link href={`/user/${collection.creator}`}>
                  <a className="text-accent text-sm font-bold">
                    {collection?.creator ? (
                      <span>{(collection?.creator).slice(0, 10)}</span>
                    ) : (
                      <span>Unnamed</span>
                    )}
                  </a>
                </Link>
              </div>
              {/* <!-- Details --> */}
              <div className="dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border bg-white">
                {/* <!-- ItemsCount --> */}

                <a className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
                  <div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
                    <p>0</p>
                  </div>
                  <div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
                    Items
                  </div>
                </a>

                {/* <!-- Owners --> */}

                <a className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
                  <div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
                    {collection?.allOwners ? collection.allOwners.length : "0"}
                  </div>
                  <div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
                    Owners
                  </div>
                </a>

                {/* <!-- FloorPrice --> */}

                <a className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
                  <div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
                    {collection?.floorPrice}
                  </div>
                  <div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
                    Floor Price
                  </div>
                </a>

                {/* <!-- Volume -->*/}

                <a className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
                  <div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
                    {collection?.volumeTraded}
                  </div>
                  <div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
                    Volume Traded
                  </div>
                </a>
              </div>

              {/* <!-- Description --> */}
              <p className="dark:text-jacarta-300 mx-auto max-w-xl text-lg">
                {collection?.description}
              </p>

              <div className="mt-6 flex items-center justify-center space-x-2.5 relative">
                <div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
                  {/* <Likes data={} /> */}
                  <div
                    className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm"
                    onClick={() => handleLikes()}>
                    <button>
                      {likesImage ? (
                        <svg className="icon dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4">
                          <use xlinkHref="/icons.svg#icon-heart-fill"></use>
                        </svg>
                      ) : (
                        <svg className="icon dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4">
                          <use xlinkHref="/icons.svg#icon-heart"></use>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <Social_dropdown />

                <Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white relative" />
              </div>
            </div>
          </div>
        </section>

        {/* <!-- end profile --> */}
      </div>

      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          {/* <img src="img/gradient_light.jpg" alt="gradient" className="h-full w-full" /> */}
          <Image
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
            layout="fill"
          />
        </picture>

        {/* <!-- Tabs Nav --> */}

        <MyNFTContainer />
      </section>
    </>
  );
};

export default Collection;
