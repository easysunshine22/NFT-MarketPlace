import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Feature_collections_data from "../../data/Feature_collections_data";

const ExploreCollections = ({ itemFor, collectionItem }) => {
  return (
    <>
      {collectionItem.map((collectionItem) => (
        <Link href={`/collection/${collectionItem.title}`}>
          <article className="mx-auto pb-5 max-w-sm transform duration-500 hover:-translate-y-1 border border-orange-50 shadow-2xl cursor-pointer group  bg-black/5">
            <div className="max-h-125 overflow-hidden">
              <img
                className="transform duration-300 group-hover:scale-110 object-fill w-[2400px] h-[360px]"
                src={collectionItem.featuredImageUrl}
                alt=""
              />
            </div>
            <div className="flex justify-between my-5 mx-2 ">
              <div className="text-orange-500 text-base font-semibold">
                {collectionItem.createdBy}
              </div>
              <div className="text-base text-right">
                <span className="font-bold"></span>
              </div>
            </div>
            <h2 className="font-bold text-[16px] mx-2">
              <a target="_blank" href="https://unsplash.com/photos/xYdxw6C3tSA">
                {collectionItem.title.slice(0, 20)}...
              </a>
            </h2>
            <div className="flex justify-between items-center mt-3 mx-2 ">
              <div className="text-orange-500  text-[12px] font-semibold">
                Floor Price
              </div>
              <div className=" text-[12px] text-right">
                <div className="flex ">{collectionItem.floorPrice} BNB</div>
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
