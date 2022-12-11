import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
// sanity
import sanityClient from "@sanity/client";
import { client } from "../../../lib/sanityClient";
// thirdweb
import { useAddress } from "@thirdweb-dev/react";

const CollectionCardsMy = ({ collection }) => {
  return (
    <article>
      {" "}
      <div className="container">
        <div className="">
          <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
            {collection.map((nftItem) => (
              <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
                <figure className="relative">
                  <Link href={`/collection/${nftItem.title}`}>
                    <a>
                      <img
                        src={nftItem.featuredImageUrl}
                        alt={nftItem.title}
                        className="w-full h-[230px] rounded-[0.625rem] object-cover"
                      />
                    </a>
                  </Link>
                  {/* auction dropdown  
              <Likes like={nftItem.likes} />
             
              <div className="absolute left-3 -bottom-3">
                <div className="flex -space-x-2">
                 
                    <Link href={`/nfts/${nftItem.metadata.id}`}>
                      <a>
                        <Tippy content={<span>creator: {creator.name}</span>}>
                          <img
                            src={creator.image}
                            alt="creator"
                            className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                          />
                        </Tippy>
                      </a>
                    </Link>
                    <Link href={`/nfts/${nftItem.metadata.id}`}>
                      <a>
                        <Tippy content={<span>creator: {owner.name}</span>}>
                          <img
                            src={owner.image}
                            alt="owner"
                            layout="fill"
                            className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                          />
                        </Tippy>
                      </a>
                    </Link> 
                </div>
              </div> */}
                </figure>
                <div className="mt-7 flex items-center justify-between">
                  <Link href={`/collection/${nftItem.title}`}>
                    <a>
                      <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white"></span>
                    </a>
                  </Link>
                </div>

                <div className="mt-8 flex items-center justify-center">
                  <Link href={`/collection/${nftItem.title}`}>
                    <a className="group flex items-center">
                      <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
                        <use xlinkHref="/icons.svg#icon-history"></use>
                      </svg>
                      <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">
                        View Details
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default CollectionCardsMy;
