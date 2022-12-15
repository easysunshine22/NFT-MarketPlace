import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Likes from "../likes";
import Auctions_dropdown from "../dropdown/Auctions_dropdown";
import { useDispatch, useSelector } from "react-redux";
import { buyModalShow } from "../../redux/counterSlice";

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
  useContractMetadata,
} from "@thirdweb-dev/react";

const CategoryItem = () => {
  const { sortedtrendingCategoryItemData } = useSelector(
    (state) => state.counter
  );

  const dispatch = useDispatch();

  const router = useRouter();
  const { collectionId } = router.query;
  const [collection, setCollection] = useState({});
  const [nftsData, setNftsData] = useState({});
  const [collId, setCollId] = useState({});

  const { contract: collectionData } = useContract(
    "0x163E91439ab6CA73F823E0fF9261FBdE59dF46f4"
  );

  const { data: nfts, isLoading: loadingNfts } = useNFTs(collectionData);

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

    // the query returns 1 object inside of an array
    await setCollection(collectionData[0]);
    await setCollId(collectionData[0]._id);
    console.log(collId, "collId");
    const nftQuery = `*[_type == "nft" && collections._ref=="${collId}"] {
      title,
        logoImage,
        collections,
      }`;
    const nftsDataa = await sanityClient.fetch(nftQuery);
    console.log(nftsDataa, "nftsDataa🔥");
    await setNftsData(nftsDataa);
  };

  useEffect(() => {
    fetchCollectionData();
  }, [collectionId]);
  {
    /* 
  if (loadingNfts || !nfts)
    return (
      <div className={"flex h-screen items-center justify-center"}>
        Loading ...
      </div>
    ); */
  }

  return (
    <>
      {loadingNfts ? (
        <div className={"flex h-screen items-center justify-center"}>
          Loading ...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
          {nfts?.map((nft) => (
            <article key={nft.metadata.tokenId}>
              <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                <figure className="relative">
                  <Link href={`/item/${nft.metadata.name}`}>
                    <a>
                      <img
                        src={nft.metadata.image}
                        alt="item 5"
                        className="w-full h-[230px] rounded-[0.625rem] object-cover"
                      />
                    </a>
                  </Link>

                  <div className="absolute left-3 -bottom-3">
                    <div className="flex -space-x-2">
                      <Link href={`/item/${nft.metadata.name}`}>
                        <a>
                          {/* 
                      <Tippy content={<span>creator: {creator.name}</span>}>
                        <img
                          src={creator.image}
                          alt="creator"
                          className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                        />
                      </Tippy> */}
                        </a>
                      </Link>
                      <Link href={`/item/${nft.metadata.name}`}>
                        <a>
                          {/* 
                      <Tippy content={<span>creator: {owner.name}</span>}>
                        <img
                          src={owner.image}
                          alt="owner"
                          layout="fill"
                          className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                        />
                      </Tippy> */}
                        </a>
                      </Link>
                    </div>
                  </div>
                </figure>
                <div className="mt-7 flex items-center justify-between">
                  <Link href={`/item/${nft.metadata.name}`}>
                    <a>
                      <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                        {nft.metadata.name}
                      </span>
                    </a>
                  </Link>

                  {/* auction dropdown  */}
                  <Auctions_dropdown classes="dark:hover:bg-jacarta-600 dropup hover:bg-jacarta-100 rounded-full" />
                </div>
                <div className="mt-2 text-sm">
                  <span className="dark:text-jacarta-200 text-jacarta-700 mr-1">
                    10 eth
                  </span>
                  <span className="dark:text-jacarta-300 text-jacarta-500">
                    1/3
                  </span>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button
                    className="text-accent font-display text-sm font-semibold"
                    onClick={() => dispatch(buyModalShow())}>
                    Buy now
                  </button>
                  <Link href={`/item/${nft.metadata.name}`}>
                    <a className="group flex items-center">
                      <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
                        <use xlinkHref="/icons.svg#icon-history"></use>
                      </svg>
                      <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">
                        View History
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryItem;
