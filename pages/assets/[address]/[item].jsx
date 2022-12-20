import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { items_data } from "../../../data/items_data";
import Auctions_dropdown from "../../../components/dropdown/Auctions_dropdown";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Items_Countdown_timer from "../../../components/items_countdown_timer";
import { ItemsTabs } from "../../../components/component";
import More_items from "../more_items";
import Likes from "../../../components/likes";
import Meta from "../../../components/Meta";
import { useDispatch } from "react-redux";
import { bidsModalShow } from "../../../redux/counterSlice";
import axios from "axios";
// thirdweb
import {
  MediaRenderer,
  useNetwork,
  useNetworkMismatch,
  useListing,
  useContract,
  useNFT,
  useActiveListings,
  ThirdwebNftMedia,
  useAddress,
  Web3Button,
} from "@thirdweb-dev/react";
import {
  ChainId,
  ListingType,
  Marketplace,
  NATIVE_TOKENS,
} from "@thirdweb-dev/sdk";

//sanity
import { client } from "../../../lib/sanityClient";

const Item = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  //Theme
  const [showModal, setShowModal] = useState(false);
  const [collection, setCollection] = useState({});
  const [nftMeta, setNftMeta] = useState({});
  const [user, setUser] = useState({});
  const address = useAddress();
  const tokenId = router.query.item;
  const collectionAddress = router.query.address;
  const [nftOwnerAddress, setNftOwnerAddress] = useState();
  const [myNft, setMyNft] = useState(false);
  const [isListed, setListed] = useState(router.query.isListed);

  const [tokenPrice, setData] = useState(null);

  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data.ethereum.usd);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [imageModal, setImageModal] = useState(false);
  console.log(
    "tokenId" + tokenId + "" + "collectionAddress" + "" + collectionAddress
  );
  console.log(JSON.stringify(tokenPrice) + "tokenPrice");

  //ThirdWeb
  // Connect to our Collection contract via the useContract hook
  const { contract: nftCollection } = useContract(
    collectionAddress, // Your marketplace contract address here
    "nft-collection"
  );

  const { data: nfts, isLoading: isReadingNfts } = useNFT(
    nftCollection,
    tokenId
  );

  // Sanity
  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "collections" && contractAddress == "${collectionAddress}" ] {
		  "imageUrl": profileImage.asset->url,
		  "bannerImageUrl": bannerImage.asset->url,
      "creatorAddress": createdBy->walletAddress,
		  volumeTraded,
		  createdBy,
		  contractAddress,
		  "creator": createdBy->userName,
		  title, floorPrice,
		  "allOwners": createdBy->profileImage.asset->url,
		  description
		}`;

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, "🔥collection data");

    // the query returns 1 object inside of an array
    await setCollection(collectionData[0]);
  };

  const userData = async (sanityClient = client) => {
    const query = `*[_type == "users" && walletAddress == "${address}"] {
		"imageUrl": profileImage.asset->url,
		"bannerImageUrl": bannerImage.asset->url,
		twitterHandle,
		userName,
		walletAddress,
	  }`;

    const userData = await sanityClient.fetch(query);

    console.log("🔥", "USERDATA", userData);

    // the query returns 1 object inside of an array
    await setUser(userData[0]);
  };
  useEffect(() => {
    fetchCollectionData();
  }, [collectionAddress]);

  useEffect(() => {
    userData();
  }, [address]);

  if (!isReadingNfts && address === nfts.owner) {
    setMyNft(true);
  }

  let webutton;
  if (!isReadingNfts && router.query.isListed === true) {
    webutton = <div>Listeli</div>;
  } else {
    webutton = <div>Listeli degil</div>;
  }

  return (
    <>
      <Meta title={`Artlux  NFT Marketplace `} />
      {/*  <!-- Item --> */}

      {isReadingNfts ? (
        <div> Loading </div>
      ) : (
        <section className="relative lg:mt-24 lg:pt-24 lg:pb-24 mt-24 pt-12 pb-24">
          <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <img
              src="/images/gradient_light.jpg"
              alt="gradient"
              className="h-full"
            />
          </picture>
          <div className="container">
            {/* <!-- Item --> */}

            <div className="md:flex md:flex-wrap">
              {/* <!-- Image --> */}
              <figure className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2 w-full">
                <button className=" w-full" onClick={() => setImageModal(true)}>
                  <img
                    src={nfts.metadata.image}
                    alt={nfts.metadata.name}
                    className="rounded-2xl cursor-pointer  w-full"
                  />
                </button>

                {/* <!-- Modal --> */}
                <div
                  className={
                    imageModal ? "modal fade show block" : "modal fade"
                  }>
                  <div className="modal-dialog !my-0 flex h-full max-w-4xl items-center justify-center">
                    <img
                      src={nfts.metadata.image}
                      alt={nfts.metadata.name}
                      className="h-full rounded-2xl"
                    />
                  </div>

                  <button
                    type="button"
                    className="btn-close absolute top-6 right-6"
                    onClick={() => setImageModal(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="h-6 w-6 fill-white">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                    </svg>
                  </button>
                </div>
                {/* <!-- end modal --> */}
              </figure>

              {/* <!-- Details --> */}
              <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
                {/* <!-- Collection / Likes / Actions --> */}
                <div className="mb-3 flex">
                  {/* <!-- Collection --> */}
                  <div className="flex items-center">
                    <Link href="#">
                      <a className="text-accent mr-2 text-sm font-bold">
                        {collection?.title}
                      </a>
                    </Link>
                    <span
                      className="dark:border-jacarta-600 bg-green inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                      data-tippy-content="Verified Collection">
                      <Tippy content={<span>Verified Collection</span>}>
                        <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                          <use xlinkHref="/icons.svg#icon-right-sign"></use>
                        </svg>
                      </Tippy>
                    </span>
                  </div>

                  {/* <!-- Likes / Actions --> */}
                  <div className="ml-auto flex items-stretch space-x-2 relative">
                    {/* <!-- Actions --> */}
                    <Auctions_dropdown classes="border-jacarta-100 dropdown hover:bg-jacarta-100 rounded-xl border bg-white" />
                  </div>
                </div>

                <h1 className="font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">
                  {nfts.metadata.name}
                </h1>
                {/* <!-- Collection / Likes / Actions --> 
                <div className="mb-8 flex items-center space-x-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Tippy content={<span>ETH</span>}>
                      <span className="-ml-1">
                        <svg className="icon mr-1 h-4 w-4">
                          <use xlinkHref="/icons.svg#icon-ETH"></use>
                        </svg>
                      </span>
                    </Tippy>
                    <span className="text-green text-sm font-medium tracking-tight">
                      1 ETH
                    </span>
                  </div>
                  <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                    Highest bid
                  </span>
                  <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                    1/1 available
                  </span>
                </div>
*/}
                <p className="dark:text-jacarta-300 mb-10">
                  {collection?.description}
                </p>

                {/* <!-- Creator / Owner --> */}
                <div className="mb-8 flex flex-wrap">
                  <div className="mr-8 mb-4 flex">
                    <figure className="mr-4 shrink-0">
                      <Link href="/user/avatar_6">
                        <a className="relative block">
                          <img
                            src={collection?.allOwners}
                            alt={nfts.metadata.ownerName}
                            className="rounded-2lg h-12 w-12"
                            loading="lazy"
                          />
                          <div
                            className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                            data-tippy-content="Verified Collection">
                            <Tippy content={<span>Verified Collection</span>}>
                              <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                                <use xlinkHref="/icons.svg#icon-right-sign"></use>
                              </svg>
                            </Tippy>
                          </div>
                        </a>
                      </Link>
                    </figure>

                    <div className="flex flex-col justify-center">
                      <span className="text-jacarta-400 block text-sm dark:text-white">
                        Creator <strong>10% royalties</strong>
                      </span>
                      <Link href="/user/avatar_6">
                        <a className="text-accent block">
                          <span className="text-sm font-bold">
                            {collection?.creator}
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                  {/* <!-- Owner --> 	  */}
                  <div className="mb-4 flex">
                    <figure className="mr-4 shrink-0">
                      <Link href="/user/123">
                        <a className="relative block">
                          <img
                            src={nfts.metadata.ownerImage}
                            alt={nfts.metadata.ownerName}
                            className="rounded-2lg h-12 w-12"
                            loading="lazy"
                          />
                          <div
                            className="dark:border-jacarta-600 bg-green absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                            data-tippy-content="Verified Collection">
                            <Tippy content={<span>Verified Collection</span>}>
                              <svg className="icon h-[.875rem] w-[.875rem] fill-white">
                                <use xlinkHref="/icons.svg#icon-right-sign"></use>
                              </svg>
                            </Tippy>
                          </div>
                        </a>
                      </Link>
                    </figure>
                    <div className="flex flex-col justify-center">
                      <span className="text-jacarta-400 block text-sm dark:text-white">
                        Owned by
                      </span>
                      <Link href="/user/avatar_6">
                        <a className="text-accent block">
                          <span className="text-sm font-bold">
                            {nfts.owner}
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                {isListed ? (
                  <div>
                    {myNft ? (
                      <div> Listeli değil ve benim değil </div>
                    ) : (
                      <div>
                        {" "}
                        <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
                          <div className="mb-8 sm:flex sm:flex-wrap"></div>

                          <button
                            className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                            onClick={() => setShowModal(true)}>
                            Listeli değil ve benim
                          </button>
                        </div>{" "}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {myNft ? (
                      <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
                        <div className="mb-8 sm:flex sm:flex-wrap">
                          {/* <!-- Highest bid -->  */}
                          <div className="sm:w-1/2 sm:pr-4 lg:pr-8">
                            <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                              <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                                Highest bid by{" "}
                              </span>
                              <Link href="/user/avatar_6">
                                <a className="text-accent text-sm font-bold">
                                  0x695d2ef170ce69e794707eeef9497af2de25df82
                                </a>
                              </Link>
                            </div>
                            <div className="mt-3 flex">
                              <figure className="mr-4 shrink-0">
                                <Link href="#">
                                  <a className="relative block">
                                    <img
                                      src="/images/avatars/avatar_4.jpg"
                                      alt="avatar"
                                      className="rounded-2lg h-12 w-12"
                                      loading="lazy"
                                    />
                                  </a>
                                </Link>
                              </figure>
                              <div>
                                <div className="flex items-center whitespace-nowrap">
                                  <Tippy content={<span>ETH</span>}>
                                    <span className="-ml-1">
                                      <svg className="icon mr-1 h-4 w-4">
                                        <use xlinkHref="/icons.svg#icon-ETH"></use>
                                      </svg>
                                    </span>
                                  </Tippy>
                                  <span className="text-green text-lg font-medium leading-tight tracking-tight">
                                    1 ETH
                                  </span>
                                </div>
                                <span className="dark:text-jacarta-300 text-jacarta-400 text-sm">
                                  ~10,864.10
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* <!-- Countdown --> */}
                          <div className="dark:border-jacarta-600 sm:border-jacarta-100 mt-4 sm:mt-0 sm:w-1/2 sm:border-l sm:pl-4 lg:pl-8">
                            <span className="js-countdown-ends-label text-jacarta-400 dark:text-jacarta-300 text-sm">
                              Auction ends in
                            </span>
                            {/* <!-- Countdown -->  */}
                            <Items_Countdown_timer />
                          </div>
                        </div>

                        <div>
                          <button
                            className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                            onClick={() => setShowModal(true)}>
                            Başkasının NFT Listeli // Make Offer
                          </button>
                        </div>

                        <div>
                          <button
                            className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                            onClick={() => setShowModal(true)}>
                            Benim NFT Listeli Değil // Sell Now
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-full rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                        onClick={() => setShowModal(true)}>
                        Benim NFT Listeli Değil // Sell Now
                      </button>
                    )}
                  </div>
                )}
                {/* <!-- end bid --> */}
              </div>
              {/* <!-- end details --> */}
            </div>
            {/*   <!-- Item --> */}
            <ItemsTabs />
          </div>
        </section>
      )}

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
                        src={nfts.metadata.image}
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
                        {nfts.metadata.name}
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
                        <span className="dark:text-jacarta-100 text-sm font-medium tracking-tight"></span>
                      </span>
                      <div className="dark:text-jacarta-300 text-right text-sm"></div>
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
                        <span className="text-green font-medium tracking-tight"></span>
                      </span>
                      <div className="dark:text-jacarta-300 text-right"></div>
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
                    {webutton}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <More_items />
    </>
  );
};

export default Item;
