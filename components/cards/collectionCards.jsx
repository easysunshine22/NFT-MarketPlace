import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Likes from "../likes";
import Auctions_dropdown from "../dropdown/Auctions_dropdown";
import { useDispatch, useSelector } from "react-redux";
import { buyModalShow } from "../../redux/counterSlice";
import { useRouter } from "next/router";

const CollectionCards = ({ nftItem, title, listings }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState(0);
  const { collectionId } = router.query;

  useEffect(() => {
    const listing = listings.find(
      (listing) => listing.asset.id === nftItem.metadata.id
    );
    if (Boolean(listing)) {
      setIsListed(true);
      setPrice(listing.buyoutCurrencyValuePerToken.displayValue);
    }
  }, [listings, nftItem]);

  return (
    <article>
      <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
        <figure className="relative">
          <Link href={`/assets/${collectionId}/${nftItem.metadata.id}`}>
            <a>
              <img
                src={nftItem.metadata.image}
                alt={nftItem.metadata.name}
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
          <Link href={`/nfts/${nftItem.metadata.id}`}>
            <a>
              <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                {nftItem.metadata.name}
              </span>
            </a>
          </Link>

          {isListed && (
            <div className="mt-2 text-sm">
              <a className="group flex items-center">
                <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
                  <use xlinkHref="/icons.svg#icon-ETH"></use>
                </svg>
                <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">
                  {price} BNB
                </span>
              </a>

              {/* auction dropdown  
            <span className="dark:text-jacarta-300 text-jacarta-500">
              {bidCount}/{bidLimit}
            </span>  */}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            className="text-accent font-display text-sm font-semibold"
            onClick={() => dispatch(buyModalShow())}>
            Buy now
          </button>
          <Link href={`/nfts/${nftItem.metadata.id}`}>
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
    </article>
  );
};

export default CollectionCards;
