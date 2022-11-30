import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch } from "react-redux";
import Meta from "../../components/Meta";
import { buyModalShow } from "../../redux/counterSlice";
// ThirdWeb
import { useAddress, useSDK } from "@thirdweb-dev/react";
// sanity
import { client } from "../../lib/sanityClient";
import { user } from "../../lib/user";

// Toaster
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

const Create = () => {
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
        console.log("LogoImage Upload success:");
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
        console.log("LogoImage Upload success:");
      })
      .catch((error) => {
        console.log("Upload failed:", error.message);
      });
  };

  // Function to deploy the proxy contract
  async function deployContract() {
    if (!address || !sdk) {
      return;
    }

    const contractAddress = await sdk.deployer.deployNFTCollection(
      // @ts-ignore - we're excluding custom contracts from the demo

      {
        name: collectionName,
        primary_sale_recipient: address,
        voting_token_address: address,
        description: description,
        // Recipients are required when trying to deploy a split contract
        recipients: [
          {
            address,
            sharesBps: 100 * 100,
          },
        ],
      }
    );

    // This is the contract address of the contract you just deployed
    console.log(`Succesfully deployed at ${contractAddress}`);
    setCaAddress(contractAddress);

    alert(`Succesfully deployed at ${contractAddress}`);
  }

  const deployedContract = (contractAddress, toastHandler = toast) => {
    toastHandler.success(`Contract Deployed To ${contractAddress}!`, {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  useEffect(() => {
    if (!caAddress) return;
    (async () => {
      const userDoc = {
        _type: "collections",
        _id: caAddress,
        title: collectionName,
        contractAddress: caAddress,
        description: description,
        webAddress: website,
        twitterAddress: twitter,
        telegramAddress: telegram,
        fee: fee,
        creator: address,
        volumeTraded: 0,
        floorPrice: 0,
        owners: address,
      };
      const result = await client.createIfNotExists(userDoc);
      deployedContract(result.contractAddress);
      updateLogoImage();
      updateBannerImage();
      updateFeaturedImage();
      dispatch(buyModalShow());
    })();
  }, [caAddress]);
  (() => console.log("collection created"))();

  const updateLogoImage = async (sanityClient = client) => {
    client
      .patch(caAddress)
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
      .patch(caAddress)
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
      .patch(caAddress)
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

              {logoImage ? (
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  successfully uploaded : {logoImage}
                </p>
              ) : (
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  This image will also be used for navigation. 350 x 350
                  recommended.
                </p>
              )}

              <input
                onChange={handleLogoImage}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"></input>
            </div>

            {/* <!-- Collection Banner Image Upload --> */}

            <div className="mb-6">
              <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Banner Image
                <span className="text-red">*</span>
              </label>

              {bannerImage ? (
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  successfully uploaded : {bannerImage}
                </p>
              ) : (
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  This image will appear at the top of your collection page.
                  Avoid including too much text in this banner image, as the
                  dimensions change on different devices. 1400 x 350
                  recommended.
                </p>
              )}

              <input
                onChange={handleBannerImage}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"></input>
            </div>

            {/* <!-- Collection Featured Image Upload --> */}

            <div className="mb-6">
              <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Featured Image
                <span className="text-red">*</span>
              </label>

              {featuredImage ? (
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  successfully uploaded : {featuredImage}
                </p>
              ) : (
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  This image will be used for featuring your collection on the
                  homepage, category pages, or other promotional areas of
                  OpenSea. 600 x 400 recommended.
                </p>
              )}

              <input
                onChange={handleFeaturedImage}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"></input>
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
                placeholder="Collection name"
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
                underneath its image. Markdown syntax is supported.
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
              <p className="dark:text-jacarta-300 text-2xs mb-3"></p>
              <label
                htmlFor="item-external-link"
                className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Website Address
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3"></p>
              <input
                type="url"
                id="item-external-link"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="https://yoursite.io/"
                onChange={(e) => setWebsite(e.target.value)}
              />
              <p className="dark:text-jacarta-300 text-2xs mb-3"></p>
              <label
                htmlFor="item-external-link"
                className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Twitter Address
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3"></p>
              <input
                type="url"
                id="item-external-link"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="Twitter Address"
                onChange={(e) => setTwitter(e.target.value)}
              />
              <p className="dark:text-jacarta-300 text-2xs mb-3"></p>
              <label
                htmlFor="item-external-link"
                className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Telegram Address
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3"></p>
              <input
                type="url"
                id="item-external-link"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="Telegram Address"
                onChange={(e) => setTelegram(e.target.value)}
              />
            </div>

            {/* <!-- Collection --> */}
            <div className="relative">
              <div>
                <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  Creator fees
                </label>
                <div className="mb-3 flex items-center space-x-2">
                  <p className="dark:text-jacarta-300 text-2xs">
                    Collection owners can collect a fee when a user re-sells an
                    item they created. Contact the collection owner to change
                    the fee percentage or the payout address.
                  </p>
                </div>
                <label
                  htmlFor="item-external-link"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  Creator Fee Address
                </label>
                <p className="dark:text-jacarta-300 text-2xs mb-3"></p>
                <input
                  type="url"
                  id="item-external-link"
                  className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                  placeholder={address}
                  onChange={(e) => setFeeAddress(e.target.value)}
                  disabled
                />
                <p className="dark:text-jacarta-300 text-2xs mb-3"></p>
                <label
                  htmlFor="item-external-link"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  %Fee
                </label>
                <p className="dark:text-jacarta-300 text-2xs mb-3"></p>
                <input
                  type="url"
                  id="item-external-link"
                  className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                  placeholder="0"
                  onChange={(e) => setFee(e.target.value)}
                />
              </div>
            </div>
            <p className="dark:text-jacarta-300 text-2xs mb-10"></p>

            <span> </span>
            {/* <!-- Submit --> */}
            <button
              className="bg-accent-lighter hover:bg-jacarta-300 cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
              onClick={() => deployContract()}>
              Create Collection
            </button>
          </div>
        </div>
      </section>
      {/* <!-- end create --> */}
    </div>
  );
};

export default Create;
