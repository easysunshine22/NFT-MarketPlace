import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import Auctions_dropdown from "../dropdown/Auctions_dropdown";

import { Web3Button, useContract, useAddress } from "@thirdweb-dev/react";

import toast, { Toaster } from "react-hot-toast";

const NftCard = ({ nft, contractAddress, listings, ownerAddress }) => {
  //Theme
  const [showModal, setShowModal] = useState(false);
  //Toast
  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  // Thirdweb
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState(0);
  const [symbol, setSymbol] = useState();
  const [listId, setListId] = useState();
  const address = useAddress();

  const { contract: marketplace } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, // Your marketplace contract address here
    "marketplace"
  );

  async function createBuy() {
    try {
      const transaction = await marketplace.buyoutListing(listId, 1);
      return transaction;
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (!listings) return;
    (async () => {
      const listing = listings.find(
        (listing) => listing.id === nft.metadata.id
      );
      if (Boolean(listing)) {
        setIsListed(true);
        setPrice(listing.buyoutCurrencyValuePerToken.displayValue);
        setSymbol(listing.buyoutCurrencyValuePerToken.symbol);
        setListId(listing.id);
      }
    })();
  }, [listings, nft]);

  return (
    <article key={nft.metadata.id}>
      <Toaster position="bottom-left" reverseOrder={false} />
      <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
        <figure className="relative">
          <button
            href={`/assets/${contractAddress}/${nft.metadata.id}`}
            onClick={() => {
              Router.push({
                pathname: `/assets/${contractAddress}/${nft.metadata.id}`,
              });
            }}>
            <a>
              <img
                src={nft.metadata.image}
                alt="item 5"
                className="w-full h-[230px] rounded-[0.625rem] object-cover"
              />
            </a>
          </button>

          <div className="absolute left-3 -bottom-3">
            <div className="flex -space-x-2">
              <div
                onClick={() => {
                  Router.push({
                    pathname: `/assets/${contractAddress}/${nft.metadata.id}`,
                  });
                }}>
                <a></a>
              </div>
              <div
                onClick={() => {
                  Router.push({
                    pathname: `/assets/${contractAddress}/${nft.metadata.id}`,
                  });
                }}>
                <a></a>
              </div>
            </div>
          </div>
        </figure>
        <div className="mt-7 flex items-center justify-between">
          <button
            href={`/assets/${contractAddress}/${nft.metadata.id}`}
            onClick={() => {
              Router.push({
                pathname: `/assets/${contractAddress}/${nft.metadata.id}`,
              });
            }}>
            <a>
              <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                {nft.metadata.name}
              </span>
            </a>
          </button>

          {/* auction dropdown  */}
          <Auctions_dropdown classes="dark:hover:bg-jacarta-600 dropup hover:bg-jacarta-100 rounded-full" />
        </div>

        <div className="mt-2 text-sm">
          {isListed && (
            <span className="dark:text-jacarta-200 text-jacarta-700 mr-1">
              {price}
            </span>
          )}
          <span className="dark:text-jacarta-300 text-jacarta-500">
            {" "}
            {symbol}
          </span>
        </div>

        <div className="mt-8 flex items-center justify-between">
          {isListed && (
            <button
              className="text-accent font-display text-sm font-semibold"
              onClick={() => setShowModal(true)}>
              Buy now
            </button>
          )}

          <button
            href={`/item/${nft.metadata.name}`}
            onClick={() => {
              Router.push({
                pathname: `/assets/${contractAddress}/${nft.metadata.id}`,
              });
            }}>
            <a className="group flex items-center">
              <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
                <use xlinkHref="/icons.svg#icon-history"></use>
              </svg>
              <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">
                View Details
              </span>
            </a>
          </button>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="modal fade show block">
            <div className="modal-dialog max-w-2xl">
              {/*content*/}
              <div className="modal-content">
                {/*header*/}
                <div className="modal-header">
                  <h5 className="modal-title" id="placeBidLabel">
                    Complete Checkout
                  </h5>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="fill-jacarta-700 h-6 w-6 dark:fill-white">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                    </svg>
                  </button>
                </div>
                {/*body*/}
                <div className="modal-body p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-display text-jacarta-700 text-sm font-semibold dark:text-white">
                      Item
                    </span>
                    <span className="font-display text-jacarta-700 text-sm font-semibold dark:text-white">
                      Subtotal
                    </span>
                  </div>

                  <div className="dark:border-jacarta-600 border-jacarta-100 relative flex items-center border-t border-b py-4">
                    <figure className="mr-5 self-start">
                      <img
                        src={nft.metadata.image}
                        alt="avatar 2"
                        className="rounded-2lg w-[150px] h-[150px] object-fill"
                        loading="lazy"
                      />
                    </figure>

                    <div>
                      <a
                        href="collection.html"
                        className="text-accent text-sm"></a>
                      <h3 className="font-display text-jacarta-700 mb-1 text-base font-semibold dark:text-white">
                        {nft.metadata.name}
                      </h3>
                      <div className="flex flex-wrap items-center">
                        <span className="dark:text-jacarta-300 text-jacarta-500 mr-1 block text-sm">
                          Creator Earnings: 5%
                        </span>
                        <span data-tippy-content="The creator of this collection will receive 5% of the sale total from future sales of this item.">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="dark:fill-jacarta-300 fill-jacarta-700 h-4 w-4">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="ml-auto">
                      <span className="mb-1 flex items-center whitespace-nowrap">
                        <span data-tippy-content="ETH">
                          <svg className="h-4 w-4">
                            <use xlinkHref="/icons.svg#icon-ETH"></use>
                          </svg>
                        </span>
                        <span className="dark:text-jacarta-100 text-sm font-medium tracking-tight">
                          {price} {symbol}
                        </span>
                      </span>
                      <div className="dark:text-jacarta-300 text-right text-sm">
                        {symbol}
                      </div>
                    </div>
                  </div>

                  {/* <!-- Total --> */}
                  <div className="dark:border-jacarta-600 border-jacarta-100 mb-2 flex items-center justify-between border-b py-2.5">
                    <span className="font-display text-jacarta-700 hover:text-accent font-semibold dark:text-white">
                      Total
                    </span>
                    <div className="ml-auto">
                      <span className="flex items-center whitespace-nowrap">
                        <span data-tippy-content="ETH">
                          <svg className="h-4 w-4">
                            <use xlinkHref="/icons.svg#icon-ETH"></use>
                          </svg>
                        </span>
                        <span className="text-green font-medium tracking-tight">
                          {price} {symbol}
                        </span>
                      </span>
                      <div className="dark:text-jacarta-300 text-right">
                        {symbol}
                      </div>
                    </div>
                  </div>

                  {/* <!-- Terms --> */}
                  <div className="mt-4 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="buyNowTerms"
                      className="checked:bg-accent dark:bg-jacarta-600 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                    />
                    <label
                      htmlFor="buyNowTerms"
                      className="dark:text-jacarta-200 text-sm">
                      By checking this box, I agree to {"Ayris.Dev's"}{" "}
                      <Link href="/tarms">
                        <a className="text-accent">Terms of Service</a>
                      </Link>
                    </label>
                  </div>
                </div>
                {/*footer*/}
                <div className="modal-footer">
                  <div className="flex items-center justify-center space-x-4">
                    <Web3Button
                      contractAddress={
                        process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS
                      }
                      action={() => createBuy()}
                      onSuccess={(result) => {
                        console.log("Success", result);
                        confirmPurchase();
                        setShowModal(false);
                      }}>
                      Confirm Checktout
                    </Web3Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </article>
  );
};

export default NftCard;
