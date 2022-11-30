import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Feature_collections_data from "../../data/Feature_collections_data";

const ExploreCollections = ({ itemFor, collectionItem }) => {
  return (
    <>
      {collectionItem.map((collectionItem) => (
        <article>
          <div
            className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg"
            key={collectionItem._id}>
            <>
              <Link href={`/collection/${collectionItem.title}`}>
                <a className="flex space-x-[0.625rem]">
                  <span className="w-full">
                    <img
                      src={
                        collectionItem?.featuredImageUrl
                          ? collectionItem.featuredImageUrl
                          : "/images/collections/collection_1_1.jpg"
                      }
                      alt="item 1"
                      className="object-cover h-48 w-96"
                      loading="lazy"
                    />
                  </span>
                </a>
              </Link>

              <Link href={`/collection/${collectionItem.title}`}>
                <a className="font-display hover:text-accent dark:hover:text-accent text-jacarta-700 mt-4 block text-base dark:text-white">
                  {(collectionItem?.title).slice(0, 20)}......
                </a>
              </Link>

              <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                <div className="flex flex-wrap items-center">
                  <a className="mr-2 shrink-0">
                    <img
                      src="/images/avatars/owner_5.png"
                      alt="owner"
                      className="h-5 w-5 rounded-full"
                    />
                  </a>

                  <span className="dark:text-jacarta-400 mr-1">by</span>

                  <a className="text-accent">
                    {collectionItem?.creator ? (
                      <span>{(collectionItem?.creator).slice(0, 10)}</span>
                    ) : (
                      <span>Unnamed</span>
                    )}
                  </a>
                </div>
                {/* 
                <span className="dark:text-jacarta-300 text-sm">
                  {itemsCount} Items
                </span> */}
              </div>
            </>
          </div>
        </article>
      ))}
      ;
    </>
  );
};

export default ExploreCollections;
