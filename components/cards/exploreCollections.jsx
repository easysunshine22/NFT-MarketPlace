import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Feature_collections_data from "../../data/Feature_collections_data";

const ExploreCollections = ({ itemFor, collectionItem }) => {
  return (
    <>
      {collectionItem.map((collectionItem) => (
        <Link
          href={`/collection/${collectionItem.title}`}
          key={collectionItem._id}>
          <article class="mx-auto pb-5 max-w-sm transform duration-500 hover:-translate-y-1 border border-orange-50 shadow-2xl cursor-pointer group  bg-black/5">
            <div class="max-h-125 overflow-hidden">
              <img
                class="transform duration-300 group-hover:scale-110 object-fill w-[2400px] h-[360px]"
                src={collectionItem.featuredImageUrl}
                alt=""
              />
            </div>
            <div class="flex justify-between my-5 mx-2 ">
              <div class="text-orange-500 text-base font-semibold">
                {collectionItem.createdBy}
              </div>
              <div class="text-base text-right">
                <span class="font-bold"></span>
              </div>
            </div>
            <h2 class="font-bold text-[16px] mx-2">
              <a target="_blank" href="https://unsplash.com/photos/xYdxw6C3tSA">
                {collectionItem.title.slice(0, 20)}...
              </a>
            </h2>
            <div class="flex justify-between items-center mt-3 mx-2 ">
              <div class="text-orange-500  text-[12px] font-semibold">
                Floor Price
              </div>
              <div class=" text-[12px] text-right">
                <div class="flex ">{collectionItem.floorPrice} BNB</div>
              </div>
            </div>
          </article>
        </Link>
      ))}
      ;
    </>
  );
};

export default ExploreCollections;
