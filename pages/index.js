import React, { useContext, useEffect } from "react";
import UserContext from "../components/UserContext";
import Meta from "../components/Meta";

// ThirdWeb
import {
  useAddress,
  useContract,
  useActiveListings,
  useListing,
} from "@thirdweb-dev/react";
// sanity
import { client } from "../lib/sanityClient";

// Toaster
import toast, { Toaster } from "react-hot-toast";

import FrontPage from "../components/artlux/frontPage";

const Home = ({ categoryList, blockchainList, collectionList }) => {
  // Connect your marketplace smart contract here (replace this address)
  const { contract: marketplace } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, // Your marketplace contract address here
    "marketplace"
  );

  console.log(categoryList + "category");

  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);

  const { scrollRef } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, scrollRef.current.scrollPos);
    const handleScrollPos = () => {
      scrollRef.current.scrollPos = window.scrollY;
    };
    window.addEventListener("scroll", handleScrollPos);
    return () => {
      window.removeEventListener("scroll", handleScrollPos);
    };
  });

  if (loadingListings) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        load
      </div>
    );
  }

  return (
    <>
      <Meta title=" Artlux  NFT Marketplace " />
      <Toaster position="bottom-center" reverseOrder={false} />

      <FrontPage
        listings={listings}
        collectionList={collectionList}
        categoryList={categoryList}
      />
    </>
  );
};
export default Home;

export async function getServerSideProps() {
  const animalsQuery = `*[_type == "collections"] {
    "logoImageUrl": logoImage.asset->url,
     "bannerImageUrl": bannerImage.asset->url,
    "featuredImageUrl": featuredImage.asset->url,
     volumeTraded,
     createdBy,
     contractAddress,
     creator,
     "createdBy": createdBy->userName,
     title, 
     floorPrice,    
     description
}`;
  const categoryListQuery = `*[_type == "category"] {
  category,
  icon,
  url,
  "featuredImageUrl": featuredImage.asset->url,
}`;

  const blockchainListQuery = `*[_type == "blockchain"] {
  chainName, 
  "icon": icon.asset->url,
  "id": _id,
}`;

  const collectionList = await client.fetch(animalsQuery);
  const categoryList = await client.fetch(categoryListQuery);
  const blockchainList = await client.fetch(blockchainListQuery);

  if (
    !collectionList.length &&
    !categoryList.length &&
    !blockchainList.length
  ) {
    return {
      props: {
        collectionList: [],
        categoryList: [],
        blockchainList: [],
      },
    };
  } else {
    console.log(collectionList + "collections");

    console.log(blockchainList + "blockchain");
    return {
      props: {
        collectionList,
        categoryList,
        blockchainList,
      },
    };
  }
}
