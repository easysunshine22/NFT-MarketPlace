/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { categoryFilter } from "../../artluxData/categoryFilter";
import Link from "next/link";
import { HeadLine } from "../../components/component";
import Feature_collections_data from "../../data/Feature_collections_data";
import Collection_dropdown from "../../components/dropdown/collection_dropdown";
import ExploreCollections from "../../components/cards/exploreCollections";
import Head from "next/head";
import Meta from "../../components/Meta";

import { useDispatch } from "react-redux";

import { client } from "../../lib/sanityClient";
//sanity

const Explore_collection = ({ animals }) => {
  const [filterVal, setFilterVal] = useState(0);
  const [catName, setCatName] = useState(null);
  const [collection, setCollection] = useState();

  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "collections" &&  categories->url == "${catName}"] {
   
      "allOwners": owners[]->,
      "logoImageUrl": logoImage.asset->url,
      title, 
        }`;

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, "🔥");
    await setCollection(collectionData);
  };

  const noFilterData = async (sanityClient = client) => {
    const query = `*[_type == "collections" ] {
   
      "allOwners": owners[]->,
      "logoImageUrl": logoImage.asset->url,
      title, 
        }`;

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, "🔥");
    await setCollection(collectionData);
  };

  useEffect(() => {
    noFilterData();
  }, []);

  useEffect(() => {
    if (catName != null) {
      fetchCollectionData();
    }
  }, [catName]);

  // Sanity
  if (collection === undefined) {
    return <div> There is No Collection</div>;
  }
  return (
    <>
      <Meta title="Explore Collection || Artlux  NFT Marketplace " />
      <section className="relative mt-24 lg:pb-48 pb-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full"
          />
        </picture>

        <div className="container">
          <HeadLine
            text="Explore Collections"
            classes="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white"
          />

          {/* <!-- Filter --> */}
          <div className="mb-8 flex flex-wrap items-start justify-between">
            <ul className="flex flex-wrap items-center">
              {categoryFilter.map(({ id, svg, text, url }) => {
                if (text === "all") {
                  return (
                    <li
                      className="my-1 mr-2.5"
                      key={id}
                      onClick={() => {
                        setFilterVal(id);
                        noFilterData();
                      }}>
                      <button
                        className={
                          filterVal === id
                            ? " group bg-accent font-display flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors border-transparent text-white capitalize"
                            : "dark:border-jacarta-600 dark:bg-jacarta-900 dark:hover:bg-accent group hover:bg-accent border-jacarta-100 font-display text-jacarta-500 flex h-9 items-center rounded-lg border bg-white px-4 text-sm font-semibold transition-colors hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent dark:hover:text-white capitalize"
                        }>
                        {text}
                      </button>
                    </li>
                  );
                } else {
                  return (
                    <li
                      className="my-1 mr-2.5"
                      key={id}
                      onClick={() => {
                        setFilterVal(id);
                        setCatName(url);
                      }}>
                      <button
                        className={
                          filterVal === id
                            ? "dark:border-jacarta-600 bg-accent group border-jacarta-100 font-display flex h-9 items-center rounded-lg border px-4 text-sm font-semibold transition-colors border-transparent dark:border-transparent text-white"
                            : "dark:border-jacarta-600 dark:bg-jacarta-900 dark:hover:bg-accent group hover:bg-accent border-jacarta-100 font-display text-jacarta-500 flex h-9 items-center rounded-lg border bg-white px-4 text-sm font-semibold transition-colors hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent dark:hover:text-white"
                        }>
                        <svg
                          className={
                            filterVal === id
                              ? "icon mr-1 h-4 w-4 transition-colors fill-white"
                              : "icon fill-jacarta-700 dark:fill-jacarta-100 mr-1 h-4 w-4 transition-colors group-hover:fill-white"
                          }>
                          <use xlinkHref={`/icons.svg#icon-${svg}`}></use>
                        </svg>
                        <span>{text}</span>
                      </button>
                    </li>
                  );
                }
              })}
            </ul>
            {/* dropdown */}
          </div>

          {/* <!-- Grid --> 
          {animals.length > 0 && (
            <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
              {animals.map((collectionItem, index) => (
                <ExploreCollections
                  itemFor="explore-collection"
                  collectionItem={collectionItem}
                  key={index}
                />
              ))}
            </div>
          )} */}
          {collection.length > 0 && (
            <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
              <ExploreCollections
                itemFor="explore-collection"
                collectionItem={collection}
              />
            </div>
          )}
          {collection.length === 0 && (
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center">
                {" "}
                This Categories Has No Collection{" "}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Explore_collection;

export async function getStaticProps() {
  const animals = await client.fetch(`*[_type == "collections"] {
    "logoImageUrl": logoImage.asset->url,
     "bannerImageUrl": bannerImage.asset->url,
 "featuredImageUrl": featuredImage.asset->url,
     volumeTraded,
   
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
