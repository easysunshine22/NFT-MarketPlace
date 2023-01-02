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

import NftCard from "../ayrisdev/nftCard";
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
  useAddress,
} from "@thirdweb-dev/react";

const CategoryItem = ({ collection }) => {
  const { sortedtrendingCategoryItemData } = useSelector(
    (state) => state.counter
  );

  const dispatch = useDispatch();

  const router = useRouter();
  const { collectionId } = router.query;

  const [nftsData, setNftsData] = useState({});
  const [collId, setCollId] = useState({});
  const [contractAddress, setContractAddress] = useState();
  const [ownerAddress, setOwnerAddress] = useState();
  console.log(collectionId, "collectionId");
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState(0);
  console.log(contractAddress, "contractAddress");

  //ThirdWeb
  // Collection Data
  const { contract: collectionData } = useContract(collection);
  // Collection NFT Data
  const { data: nfts, isLoading: loadingNfts } = useNFTs(collectionData);
  // MarketPlace Data
  const { contract: marketplace } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, // Your marketplace contract address here
    "marketplace"
  );
  console.log(collectionData);

  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);
  console.log(nfts, "nfts");

  if (loadingNfts || !nfts)
    return (
      <div className={"flex h-screen items-center justify-center"}>
        <div className="flex-col">
          <x-loading className="w-24 h-24" />
          <svg
            className="inline mr-2 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>

          <div className="mt-3 text-gray-200 font-mono text-sm sm:text-xs">
            Loading...
          </div>
        </div>
      </div>
    );

  return (
    <>
      {loadingNfts ? (
        <div className={"flex h-screen items-center justify-center"}>
          <div className="inset-0 bg-gray-800 fixed flex w-full h-full items-center justify-center duration-300 transition-opacity">
            <div className="flex-col">
              <x-loading className="w-24 h-24" />
              <svg
                className="inline mr-2 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>

              <div className="mt-3 text-gray-200 font-mono text-sm sm:text-xs">
                Loading...
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
          {nfts?.map((nft, id) => (
            <NftCard
              key={id}
              nft={nft}
              contractAddress={collection}
              listings={listings}
              ownerAddress={ownerAddress}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryItem;
