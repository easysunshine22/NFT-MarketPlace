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

// ThirdWeb
import { useAddress } from "@thirdweb-dev/react";
// sanity
import sanityClient from "@sanity/client";
// Toaster
import toast, { Toaster } from "react-hot-toast";

const Home = ({ animals }) => {
  const address = useAddress();

  const { scrollRef } = useContext(UserContext);
  console.log(animals);
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
      <Hero />
      {animals.length > 0 && <RanksComp collectionItem={animals} />}
      {animals.length > 0 && <CoverCarousel collectionItem={animals} />}

      <Collection_category bgWhite={true} />
      <div>
        {/* <!-- Trending Categories --> */}
        <section className="py-24">
          <div className="container">
            <HeadLine
              image="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/26a1.png"
              text="Trending categories"
              classes="mb-8 text-center font-display text-3xl text-jacarta-700 dark:text-white"
            />
            <FilterCategoryItem />
          </div>
        </section>
        {/* <!-- end trending categories --> */}
      </div>
      <Download />
    </>
  );
};
export default Home;

const client = sanityClient({
  projectId: "0m772u15",
  dataset: "production",
  apiVersion: "2022-11-28",
  useCdn: false,
  token:
    "skH5Wp9gafav4DEcSiU1mPIcSWCVN6mLW5KNDw068q233Fz454z4rcctAwLgolQcIlJH5Znwwm3hsscGwBfnIM5f4fOy8240941CK80ro6MpbrDakDhLlp6kTha1EC00yu4KYQxLRpyKGlyZUOFEHgbHZxnGhqJvTyv9VRHlocnb2nBhhGQ2",
});

export async function getStaticProps() {
  const animals = await client.fetch(`*[_type == "collections"] {
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
}`);

  return {
    props: {
      animals,
    },
  };
}
