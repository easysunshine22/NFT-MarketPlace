import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch } from "react-redux";
import Meta from "../../components/Meta";
import { buyModalShow } from "../../redux/counterSlice";
// ThirdWeb
import {
  useAddress,
  useContract,
  getContract,
  useSDK,
} from "@thirdweb-dev/react";
// sanity
import { client } from "../../lib/sanityClient";
import { user } from "../../lib/user";
// sanity
import sanityClient from "@sanity/client";
import ChainDropdown from "../../components/cards/chainDropdown";
import CategoryDropdown from "../../components/cards/categoryDropdown";

// Toaster
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

const CreateColl = ({ blockchainList, categoryList }) => {
  const fileTypes = [
    "JPG",
    "PNG",
    "GIF",
    "SVG",
    "MP4",
    "WEBM",
    "MP3",
    "WAV",
    "OGG",
    "GLB",
    "GLTF",
  ];
  const [file, setFile] = useState("");

  const dispatch = useDispatch();

  const [dropdown, setDropdown] = useState(false);
  const [bdropdown, setBdropdown] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeBlockItem, setActiveBlockItem] = useState(null);
  const [activeChain, setActiveChain] = useState(null);
  const [selectedChain, setSelectedChain] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);

  const handleBlockDropdown = () => {
    window.addEventListener("click", (w) => {
      if (w.target.closest(".dropdown-toggle")) {
        if (bdropdown) {
          setBdropdown(false);
        } else {
          setBdropdown(true);
        }
      } else {
        setBdropdown(false);
      }
    });
  };
  const handleDropdown = () => {
    window.addEventListener("click", (w) => {
      if (w.target.closest(".dropdown-toggle")) {
        if (dropdown) {
          setDropdown(false);
        } else {
          setDropdown(true);
        }
      } else {
        setDropdown(false);
      }
    });
  };

  //sanity

  const [collectionName, setCollectionName] = useState();
  const [description, setDescription] = useState();
  const [website, setWebsite] = useState();
  const [twitter, setTwitter] = useState();
  const [telegram, setTelegram] = useState();
  const [feeAddress, setFeeAddress] = useState();
  const [fee, setFee] = useState();
  const [logoImage, setLogoImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [featuredImage, setFeaturedImage] = useState();

  const [caAddress, setCaAddress] = useState();
  // thirdweb
  const router = useRouter();
  const address = useAddress();
  const sdk = useSDK();

  // photo upload
  console.log(selectedChain + "selected");
  const [logoImagesAssets, setLogoImagesAssets] = useState(null);
  const [bannerImagesAssets, setBannerImagesAssets] = useState(null);
  const [featuredImagesAssets, setFeaturedImagesAssets] = useState(null);

  const handleLogoImage = (e) => {
    const selectedLogoImage = e.target.files[0];
    user.assets
      .upload("image", selectedLogoImage, {
        contentType: selectedLogoImage.type,
        filename: selectedLogoImage.name,
      })
      .then((document) => {
        setLogoImagesAssets(document);
        console.log("LogoImage Upload success:");
      })
      .catch((error) => {
        console.log("Upload failed:", error.message);
      });
  };

  const handleBannerImage = (e) => {
    const selectedBannerImage = e.target.files[0];
    user.assets
      .upload("image", selectedBannerImage, {
        contentType: selectedBannerImage.type,
        filename: selectedBannerImage.name,
      })
      .then((documentBanner) => {
        setBannerImagesAssets(documentBanner);
        console.log("BannerImage Upload success:");
      })
      .catch((error) => {
        console.log("Upload failed:", error.message);
      });
  };

  const handleFeaturedImage = (e) => {
    const selectedFeaturedImage = e.target.files[0];
    user.assets
      .upload("image", selectedFeaturedImage, {
        contentType: selectedFeaturedImage.type,
        filename: selectedFeaturedImage.name,
      })
      .then((documentFeatured) => {
        setFeaturedImagesAssets(documentFeatured);
        console.log("FeaturedImage Upload success:");
      })
      .catch((error) => {
        console.log("Upload failed:", error.message);
      });
  };

  async function createCollection() {
    const userDoc = {
      _type: "collections",
      _id: collectionName,
      title: collectionName,
      description: description,
      webAddress: website,
      twitterAddress: twitter,
      telegramAddress: telegram,
      createdBy: {
        _type: "reference",
        _ref: address,
      },
      categories: {
        _type: "reference",
        _ref: selectedCat,
      },
      blockchain: {
        _type: "reference",
        _ref: selectedChain,
      },
      volumeTraded: 0,
      floorPrice: 0,
    };
    await client.createIfNotExists(userDoc);

    updateLogoImage();
    updateBannerImage();
    updateFeaturedImage();
    dispatch(buyModalShow());
  }

  const updateLogoImage = async (sanityClient = client) => {
    client
      .patch(collectionName)
      .set({
        logoImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: logoImagesAssets?._id,
          },
        },
      })
      .commit()
      .then(() => {
        console.log("Banner Image Done!");
      });
  };

  const updateBannerImage = async (sanityClient = client) => {
    client
      .patch(collectionName)
      .set({
        bannerImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: bannerImagesAssets?._id,
          },
        },
      })
      .commit()
      .then(() => {
        console.log("Banner Image Done!");
      });
  };

  const updateFeaturedImage = async (sanityClient = client) => {
    client
      .patch(collectionName)
      .set({
        featuredImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: featuredImagesAssets?._id,
          },
        },
      })
      .commit()
      .then(() => {
        console.log("Banner Image Done!");
      });
  };

  return (
    <div>
      <Meta title="Create Collection || Ayris.Dev NFT Marketplace" />
      {/* <!-- Create Collection --> */}
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <div className="container">
          <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
            Create NFT Collection
          </h1>

          <div className="mx-auto max-w-[48.125rem]">
            {/* <!-- Collection Logo Upload --> */}

            <div className="mb-6">
              <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Logo image
                <span className="text-red">*</span>
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3">
                This image will also be used for navigation. 350 x 350
                recommended.
              </p>

              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col  w-32 h-32 items-center justify-center rounded-full border-2 border-dashed bg-white px-5 text-center">
                <div className="relative z-10 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-500 mb-4 inline-block rounded-full dark:fill-white">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                  </svg>
                </div>
                <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded-full w-24 h-24 flex items-center justify-end opacity-0 group-hover:opacity-100 ">
                  <input
                    accept="image/*"
                    className="relative z-10 opacity-0 h-full w-full cursor-pointer"
                    type="file"
                    name="bgfile"
                    id="bgfile"
                    onChange={handleLogoImage}
                  />
                </div>
              </div>
            </div>

            {/* <!-- Collection Banner Image Upload --> */}

            <div className="mb-6">
              <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Featured image
                <span className="text-red">*</span>
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3">
                This image will be used for featuring your collection on the
                homepage, category pages, or other promotional areas of OpenSea.
                600 x 400 recommended.
              </p>

              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                <div className="relative z-10 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-500 mb-4 inline-block dark:fill-white">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                  </svg>
                  <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                    JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max
                    size: 100 MB
                  </p>
                </div>
                <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100 ">
                  <input
                    accept="image/*"
                    className="relative z-10 opacity-0 h-full w-full cursor-pointer"
                    type="file"
                    name="bgfile"
                    id="bgfile"
                    onChange={handleFeaturedImage}
                  />
                </div>
              </div>
            </div>

            {/* <!-- Collection Featured Image Upload --> */}

            <div className="mb-6">
              <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Banner image
                <span className="text-red">*</span>
              </label>

              <p className="dark:text-jacarta-300 text-2xs mb-3">
                This image will appear at the top of your collection page. Avoid
                including too much text in this banner image, as the dimensions
                change on different devices. 1400 x 350 recommended.
              </p>

              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                <div className="relative z-10 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-500 mb-4 inline-block dark:fill-white">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                  </svg>
                  <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                    JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max
                    size: 100 MB
                  </p>
                </div>
                <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100 ">
                  <input
                    accept="image/*"
                    className="relative z-10 opacity-0 h-full w-full cursor-pointer"
                    type="file"
                    name="bgfile"
                    id="bgfile"
                    onChange={handleBannerImage}
                  />
                </div>
              </div>
            </div>

            {/* <!-- Name --> */}
            <div className="mb-6">
              <label
                htmlFor="item-name"
                className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Name<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="item-name"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="Example : Artlux Yatch Club"
                required
                onChange={(e) => setCollectionName(e.target.value)}
              />
            </div>

            {/* <!-- Description --> */}
            <div className="mb-6">
              <label
                htmlFor="item-description"
                className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Description
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3">
                The description will be included on the {"item's"} detail page
                underneath its image. 0 of 1000 characters used.
              </p>
              <textarea
                id="item-description"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                rows="4"
                required
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a detailed description of your item."></textarea>
            </div>

            {/* <!-- External Link --> */}
            <div className="mb-6">
              <label
                htmlFor="item-external-link"
                className="font-display text-jacarta-700 mb-2 block dark:text-white">
                External link
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3">
                We will include a link to this URL on this {"item's"} detail
                page, so that users can click to learn more about it. You are
                welcome to link to your own webpage with more details.
              </p>

              <input
                type="url"
                id="item-external-link"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="https://yoursite.io/"
                onChange={(e) => setWebsite(e.target.value)}
              />

              <input
                type="url"
                id="item-external-link"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="Twitter Address"
                onChange={(e) => setTwitter(e.target.value)}
              />

              <input
                type="url"
                id="item-external-link"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="Telegram Address"
                onChange={(e) => setTelegram(e.target.value)}
              />
            </div>

            {/* <!-- Blockchain --> */}
            <div className="mb-6">
              <label
                htmlFor="item-supply"
                className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Blockchain
              </label>

              {/* dropdown */}
              <div className="dropdown relative mb-4 cursor-pointer ">
                {blockchainList.length > 0 && (
                  <div>
                    <div
                      className={
                        bdropdown
                          ? "overlay h-[100vh] dropdown-toggle w-[100vw] fixed top-0 left-0 opacity-0 show bg-red z-40 cursor-default"
                          : "overlay h-[100vh] w-[100vw] fixed top-0 left-0 opacity-0 hidden bg-red z-40 cursor-default"
                      }
                      onClick={() => handleBlockDropdown()}></div>

                    <div
                      className="dark:bg-jacarta-700 dropdown-toggle border-jacarta-100 dark:border-jacarta-600 flex items-center justify-between rounded-lg border bg-white py-3.5 px-3 text-base dark:text-white"
                      onClick={() => handleBlockDropdown()}>
                      <span className="flex items-center">
                        <img
                          src={
                            activeBlockItem
                              ? activeBlockItem
                              : "/images/chains/ETH.png"
                          }
                          alt="eth"
                          className="mr-2 h-5 w-5 rounded-full"
                        />
                        {activeChain ? activeChain : "Ethereum Mainnet"}
                      </span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="fill-jacarta-500 h-4 w-4 dark:fill-white">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                      </svg>
                    </div>

                    <div
                      className={
                        bdropdown
                          ? "absolute dark:bg-jacarta-800 whitespace-nowrap w-full rounded-xl bg-white py-4 px-2 text-left shadow-xl show z-50"
                          : "absolute dark:bg-jacarta-800 whitespace-nowrap w-full rounded-xl bg-white py-4 px-2 text-left shadow-xl hidden z-50"
                      }>
                      <ul className="scrollbar-custom flex max-h-48 flex-col overflow-y-auto">
                        {blockchainList.map((blockchainList, index) => (
                          <li key={blockchainList.id}>
                            <button
                              href="#"
                              className="dropdown-item font-display dark:hover:bg-jacarta-600 hover:bg-jacarta-50 flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white"
                              onClick={() => {
                                setActiveBlockItem(blockchainList.icon);
                                setActiveChain(blockchainList.chainName);
                                setSelectedChain(blockchainList.id);
                              }}>
                              <span className="flex items-center space-x-3">
                                <img
                                  src={blockchainList.icon}
                                  className="h-8 w-8 rounded-full"
                                  loading="lazy"
                                  alt="avatar"
                                />
                                <span className="text-jacarta-700 dark:text-white">
                                  {blockchainList.chainName}
                                </span>
                              </span>
                              {activeBlockItem === blockchainList.icon && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  className="fill-accent mb-[3px] h-4 w-4">
                                  <path fill="none" d="M0 0h24v24H0z"></path>
                                  <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                </svg>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* <!-- Category --> */}
            <div className="mb-6">
              <label
                htmlFor="item-supply"
                className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Categories
              </label>

              {/* dropdown */}
              <div className="dropdown relative mb-4 cursor-pointer ">
                {categoryList.length > 0 && (
                  <div>
                    <div
                      className={
                        dropdown
                          ? "overlay h-[100vh] dropdown-toggle w-[100vw] fixed top-0 left-0 opacity-0 show bg-red z-40 cursor-default"
                          : "overlay h-[100vh] w-[100vw] fixed top-0 left-0 opacity-0 hidden bg-red z-40 cursor-default"
                      }
                      onClick={() => handleDropdown()}></div>

                    <div
                      className="dark:bg-jacarta-700 dropdown-toggle border-jacarta-100 dark:border-jacarta-600 flex items-center justify-between rounded-lg border bg-white py-3.5 px-3 text-base dark:text-white"
                      onClick={() => handleDropdown()}>
                      <span className="flex items-center">
                        <img
                          src={activeItem ? activeItem : "/images/art.webp"}
                          alt="eth"
                          className="mr-2 h-5 w-5 rounded-full"
                        />
                        {activeCategory ? activeCategory : "Art"}
                      </span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="fill-jacarta-500 h-4 w-4 dark:fill-white">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path>
                      </svg>
                    </div>

                    <div
                      className={
                        dropdown
                          ? "absolute dark:bg-jacarta-800 whitespace-nowrap w-full rounded-xl bg-white py-4 px-2 text-left shadow-xl show z-50"
                          : "absolute dark:bg-jacarta-800 whitespace-nowrap w-full rounded-xl bg-white py-4 px-2 text-left shadow-xl hidden z-50"
                      }>
                      <ul className="scrollbar-custom flex max-h-48 flex-col overflow-y-auto">
                        {categoryList.map((categoryList, index) => (
                          <li key={categoryList.id}>
                            <button
                              href="#"
                              className="dropdown-item font-display dark:hover:bg-jacarta-600 hover:bg-jacarta-50 flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white"
                              onClick={() => {
                                setActiveItem(categoryList.icon);
                                setActiveCategory(categoryList.category);
                                setSelectedCat(categoryList.id);
                              }}>
                              <span className="flex items-center space-x-3">
                                <img
                                  src={categoryList.icon}
                                  className="h-8 w-8 rounded-full"
                                  loading="lazy"
                                  alt="avatar"
                                />
                                <span className="text-jacarta-700 dark:text-white">
                                  {categoryList.category}
                                </span>
                              </span>
                              {activeItem === categoryList.icon && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  className="fill-accent mb-[3px] h-4 w-4">
                                  <path fill="none" d="M0 0h24v24H0z"></path>
                                  <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                </svg>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <span> </span>
            {/* <!-- Submit --> */}
            <button
              className="bg-accent-lighter hover:bg-jacarta-300 cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
              onClick={() => createCollection()}>
              Create Collection
            </button>
          </div>
        </div>
      </section>
      {/* <!-- end create --> */}
    </div>
  );
};

export default CreateColl;

export async function getStaticProps() {
  const blockchainList = await client.fetch(`*[_type == "blockchain"] {
      chainName,
      
        
          "icon": icon.asset->url,
    "id": _id,
    }`);
  const categoryList = await client.fetch(`*[_type == "category"] {
        category,
        
          
            "icon": icon.asset->url,
      "id": _id,
      }`);

  return {
    props: {
      blockchainList,
      categoryList,
    },
  };
}
