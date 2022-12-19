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
  const [contractAddress, setContractAddress] = useState();
  const [ownerAddress, setOwnerAddress] = useState();

  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState(0);
  // Sanity
  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "collections" && title == "${collectionId}" ] {
      "logoImageUrl": logoImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
  "featuredImageUrl": featuredImage.asset->url,
      volumeTraded,
      "creatorAddress": createdBy->walletAddress,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description,
      _id
    }`;

    const collectionData = await sanityClient.fetch(query);

    await setContractAddress(collectionData[0].contractAddress);
    await setOwnerAddress(collectionData[0].creatorAddress);
    await setCollection(collectionData[0]);
    await setCollId(collectionData[0]._id);

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

  //ThirdWeb
  // Collection Data
  const { contract: collectionData } = useContract(contractAddress);
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

  if (loadingNfts || !nfts)
    return (
      <div className={"flex h-screen items-center justify-center"}>
        Loading ...
      </div>
    );

  return (
    <>
      {loadingNfts ? (
        <div className={"flex h-screen items-center justify-center"}>
          Loading ...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
          {nfts?.map((nft, id) => (
            <NftCard
              key={id}
              nft={nft}
              contractAddress={contractAddress}
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
