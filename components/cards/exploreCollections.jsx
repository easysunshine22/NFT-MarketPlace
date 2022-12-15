import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Feature_collections_data from "../../data/Feature_collections_data";

const ExploreCollections = ({ collectionItem }) => {
  return (
    <>
      {collectionItem.map((collectionItem, id) => (
        <article key={collectionItem.id}>
          <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
            <Link href={`/collection/${collectionItem.title}`}>
              <a className="flex space-x-[0.625rem]">
                <span className="w-[100%]">
                  <img
                    src={collectionItem.logoImageUrl}
                    alt="item 1"
                    className="h-[250px] w-full rounded-[0.625rem] object-cover"
                    loading="lazy"
                  />
                </span>
              </a>
            </Link>

            <Link href={`/collection/${collectionItem.title}`}>
              <a className="font-display hover:text-accent dark:hover:text-accent text-jacarta-700 mt-4 block text-base dark:text-white">
                {collectionItem.title}
              </a>
            </Link>

            <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
              <div className="flex flex-wrap items-center">
                <Link href={`/user/${collectionItem.createdBy}`}>
                  <a className="mr-2 shrink-0">
                    <img
                      src={collectionItem.logoImageUrl}
                      alt="owner"
                      className="h-5 w-5 rounded-full"
                    />
                  </a>
                </Link>
                <span className="dark:text-jacarta-400 mr-1">by</span>
                <Link href={`/user/${collectionItem.createdBy}`}>
                  <a className="text-accent">
                    <span>{collectionItem.createdBy}</span>
                  </a>
                </Link>
              </div>
              <span className="dark:text-jacarta-300 text-sm">10 Items</span>
            </div>
          </div>
        </article>
      ))}
      ;
    </>
  );
};

export default ExploreCollections;
