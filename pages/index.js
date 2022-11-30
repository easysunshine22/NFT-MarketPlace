import React, { useContext, useEffect } from "react";
import UserContext from "../components/UserContext";

import Collection_category from "../components/collectrions/collection_category";
import { Feature_collections, HeadLine } from "../components/component";
import Meta from "../components/Meta";
import Hero from "../components/hero/hero";
import Process from "../components/blog/process";
import FilterCategoryItem from "../components/categories/filterCategoryItem";
import Download from "../components/blog/download";

// ThirdWeb
import { useAddress } from "@thirdweb-dev/react";
// sanity
import { client } from "../lib/sanityClient";
// Toaster
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
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
      <Meta title="Home 5 || Ayris.Dev NFT Marketplace " />
      <Toaster position="bottom-center" reverseOrder={false} />
      <Hero />
      <Process />
      <Feature_collections />
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
}
