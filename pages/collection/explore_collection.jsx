/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { tranding_category_filter } from "../../data/categories_data";
import Link from "next/link";
import { HeadLine } from "../../components/component";
import Feature_collections_data from "../../data/Feature_collections_data";
import Collection_dropdown from "../../components/dropdown/collection_dropdown";
import ExploreCollections from "../../components/cards/exploreCollections";
import Head from "next/head";
import Meta from "../../components/Meta";
import { collectCollectionData } from "../../redux/counterSlice";
import { useDispatch } from "react-redux";

import { client } from "../../lib/sanityClient";
//sanity

const Explore_collection = ({ animals }) => {
  const dispatch = useDispatch();
  const { value } = 5;
  const [collectionFilteredData, setCollectionFilteredData] = useState(
    Feature_collections_data
  );
  const [filterVal, setFilterVal] = useState(0);

  const handleItemFilter = (text) => {
    if (text === "all") {
      setCollectionFilteredData(Feature_collections_data);
    } else {
      setCollectionFilteredData(
        Feature_collections_data.filter((item) => item.category === text)
      );
    }
  };

  useEffect(() => {
    dispatch(collectCollectionData(collectionFilteredData.slice(0, 8)));
  }, [dispatch, collectionFilteredData]);

  // Sanity
  const [collection, setCollection] = useState();

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
              {tranding_category_filter.map(({ id, svg, text }) => {
                if (text === "all") {
                  return (
                    <li
                      className="my-1 mr-2.5"
                      key={id}
                      onClick={() => {
                        handleItemFilter(text);
                        setFilterVal(id);
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
                        handleItemFilter(text);
                        setFilterVal(id);
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
            <Collection_dropdown />
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
          {animals.length > 0 && (
            <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
              <ExploreCollections
                itemFor="explore-collection"
                collectionItem={animals}
              />
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
