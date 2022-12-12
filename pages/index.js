import React, { useContext, useEffect } from "react";
import UserContext from "../components/UserContext";
import Collection_category from "../components/collectrions/collection_category";
import { Feature_collections, HeadLine } from "../components/component";
import Meta from "../components/Meta";
import Hero from "../components/hero/hero";
import Process from "../components/blog/process";
import FilterCategoryItem from "../components/categories/filterCategoryItem";
import Download from "../components/blog/download";
import RanksComp from "../components/cards/ranksComp";
import CoverCarousel from "../components/cards/coverCarousel";
import SpotlightCards from "../components/cards/spotlightCards";
import ListCategories from "../components/cards/listCategories";
import NoteSection from "../components/frontpage/noteSection";
// ThirdWeb
import { useAddress } from "@thirdweb-dev/react";
// sanity
import { client } from "../lib/sanityClient";

// Toaster
import toast, { Toaster } from "react-hot-toast";
import Cta from "../components/cta/cta";

const Home = ({ animals, categoryList, blockchainList }) => {
  const address = useAddress();

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

  return (
    <>
      <Meta title=" Artlux  NFT Marketplace " />
      <Toaster position="bottom-center" reverseOrder={false} />

      {animals.length > 0 && <Hero collectionItem={animals} />}
      {animals.length && blockchainList.length > 0 && (
        <RanksComp collectionItem={animals} blockchainList={blockchainList} />
      )}
      <h2 className="items-center justify-center flex py-5 bg-white font-bold text-4xl">
        {" "}
        Notable Collections{" "}
      </h2>
      {animals.length > 0 && <CoverCarousel collectionItem={animals} />}

      <SpotlightCards />
      <ListCategories />
      <Cta />
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
     title, floorPrice,
    
     description
}`;
  const categoryListQuery = `*[_type == "category"] {
  category,
  icon,
  url,
}`;

  const blockchainListQuery = `*[_type == "blockchain"] {
  chainName, 
  "icon": icon.asset->url,
  "id": _id,
}`;

  const animals = await client.fetch(animalsQuery);
  const categoryList = await client.fetch(categoryListQuery);
  const blockchainList = await client.fetch(blockchainListQuery);

  if (!animals.length && !categoryList.length && !blockchainList.length) {
    return {
      props: {
        animals: [],
        categoryList: [],
        blockchainList: [],
      },
    };
  } else {
    console.log(animals + "collections");
    console.log(categoryList + "category");
    console.log(blockchainList + "blockchain");
    return {
      props: {
        animals,
        categoryList,
        blockchainList,
      },
    };
  }
}
