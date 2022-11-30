import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { collection_item_data } from "../../data/collection_data";
import Auctions_dropdown from "../../components/dropdown/Auctions_dropdown";
import Social_dropdown from "../../components/dropdown/Social_dropdown";
import CollectionCards from "../../components/cards/collectionCards";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Meta from "../../components/Meta";

//sanity
import { client } from "../../lib/sanityClient";
// thirdweb
import {
  MediaRenderer,
  useNetwork,
  useNetworkMismatch,
  useListing,
  useContract,
  useNFTs,
  useActiveListings,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import {
  ChainId,
  ListingType,
  Marketplace,
  NATIVE_TOKENS,
} from "@thirdweb-dev/sdk";

const Collection = () => {
  //Sanity
  const router = useRouter();
  const { collectionId } = router.query;
  const [collection, setCollection] = useState({});

  // Theme Component
  const [likesImage, setLikesImage] = useState(false);
  const pid = router.query.collection;

  //ThirdWeb
  // Connect to our Collection contract via the useContract hook
  const { contract: nftCollection } = useContract(
    collectionId, // Your marketplace contract address here
    "nft-collection"
  );
  const { data: nfts, isLoading: isReadingNfts } = useNFTs(nftCollection);

  // Connect your marketplace smart contract here (replace this address)
  const { contract: marketplace } = useContract(
    "0xa744878C6e516317c2F74807d013c53a51200bCb", // Your marketplace contract address here
    "marketplace"
  );

  const { data: listings, isLoading: isLoadingListing } =
    useActiveListings(marketplace);

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
      description
    }`;

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, "🔥");

    // the query returns 1 object inside of an array
    await setCollection(collectionData[0]);
  };

  useEffect(() => {
    fetchCollectionData();
  }, [collectionId]);

  console.log(router.query);
  console.log(router.query.collectionId);
  console.log("nftler🔥" + nfts);
  console.log("listings" + listings);

  const handleLikes = () => {
    if (!likesImage) {
      setLikesImage(true);
    } else {
      setLikesImage(false);
    }
  };

  return (
    <div>
      <Meta title={`${collection.name} || Ayris.Dev NFT Marketplace `} />

      <div className="pt-[5.5rem] lg:pt-24">
        {/* <!-- Banner --> */}
        <div className="relative h-[300px]">
          <img
            src={
              collection?.bannerImageUrl
                ? collection.bannerImageUrl
                : "https://via.placeholder.com/200"
            }
            alt="banner"
            layout="fill"
            objectFit="cover"
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
                layout="fill"
                objectFit="contain"
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
                    {isReadingNfts ? <p>0</p> : <div>{nfts.length}</div>}
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

      <section className="relative mt-24 lg:pb-48 pb-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          {/* <img src="img/gradient_light.jpg" alt="gradient" className="h-full w-full" /> */}
          <Image
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
            layout="fill"
          />
        </picture>
        {/* <!-- end profile --> */}
        <div className="container">
          {!isLoadingListing ? (
            <div className="">
              {isReadingNfts ? (
                <div className="items-center justify-center text-black flex bg-white p-[1.1875rem]">
                  This Collection Hasnt NFTs
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
                    {nfts.map((nftItem) => (
                      <CollectionCards
                        key={nftItem.metadata.id}
                        nftItem={nftItem}
                        title={collection?.title}
                        listings={listings}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
              Loading
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Collection;
