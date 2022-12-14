// React
import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import Meta from "../../components/Meta";
//Thirdweb - Blockchain
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useNFTs,
  useStorageUpload,
  Web3Button,
  useSDK,
  ConnectWallet,
} from "@thirdweb-dev/react";
//Sanity - Database
import sanityClient from "@sanity/client";

import { client } from "../../lib/sanityClient";
// Components
import ImageUploader from "../../components/ayrisdev/imageUploader";
// Icons
import { IoCreateOutline } from "react-icons/io5";

const ERC721 = () => {
  //Thirdweb
  const sdk = useSDK();
  const address = useAddress();
  const { mutateAsync: upload } = useStorageUpload();
  const artluxCollectionAddress = "0xA71a329a6F84c4191abE80DC8497D604023bc23B";
  //States
  const [dropdown, setDropdown] = useState(false);
  const [activeItem, setActiveItem] = useState();
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedCollectionAddress, setSelectedCollectionAddress] =
    useState(null);
  //Image States
  const [preview, setPreview] = useState();
  const [image, setImage] = useState(null);
  const [logoImagesAssets, setLogoImagesAssets] = useState(null);
  //Sanity States
  const [collectionList, setCollectionList] = useState({});
  // NFTs States
  const [nftName, setNFTName] = useState();
  const [description, setDescription] = useState();

  // Fetch the NFT collection from thirdweb via it's contract address.
  const { contract: nftCollection } = useContract(
    // Replace this with your NFT Collection contract address
    process.env.NEXT_PUBLIC_COLLECTION_ADDRESS,
    "nft-collection"
  );

  //Sanity
  const handleLogoImage = (e) => {
    const selectedLogoImage = e.target.files[0];
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    client.assets
      .upload("image", selectedLogoImage, {
        contentType: selectedLogoImage.type,
        filename: selectedLogoImage.name,
      })
      .then((document) => {
        setLogoImagesAssets(document);
        console.log("NFTImage Upload success:");
      })
      .catch((error) => {
        console.log("Upload failed:", error.message);
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

  // Upload NFT Details To Sanity
  async function mintUploadNFT() {
    const userDoc = {
      _type: "nft",
      _id: nftName,
      title: nftName,
      description: description,
      createdBy: {
        _type: "reference",
        _ref: address,
      },
      collections: {
        _type: "reference",
        _ref: selectedCat,
      },

      logoImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: logoImagesAssets?._id,
        },
      },
    };
    await client.create(userDoc);
  }

  // Collection Data
  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "collections" && createdBy._ref == "${address}"] {
    "logoImageUrl": logoImage.asset->url,
   title,
   "id": _id,
   contractAddress

}`;

    const collectionList = await sanityClient.fetch(query);

    console.log(collectionList, "🔥");
    await setCollectionList(collectionList);
    // the query returns 1 object inside of an array
  };
  useEffect(() => {
    fetchCollectionData();
  }, [address]);

  // Mint NFT
  const mintWithSignature = async () => {
    try {
      if (!image || !nftName) {
        alert("Please enter a name and upload a file.");
        return;
      }

      // Upload image to IPFS using Storage
      const uris = await upload({
        data: [image],
      });

      // Make a request to /api/server
      const signedPayloadReq = await fetch(`/api/server`, {
        method: "POST",
        body: JSON.stringify({
          authorAddress: address, // Address of the current user
          nftName: nftName,
          description: description,
          imagePath: uris[0],
        }),
      });

      // Grab the JSON from the response
      const json = await signedPayloadReq.json();

      if (!signedPayloadReq.ok) {
        alert(json.error);
      }

      // If the request succeeded, we'll get the signed payload from the response.
      // The API should come back with a JSON object containing a field called signedPayload.
      // This line of code will parse the response and store it in a variable called signedPayload.
      const signedPayload = json.signedPayload;

      // Now we can call signature.mint and pass in the signed payload that we received from the server.
      // This means we provided a signature for the user to mint an NFT with.
      const nft = await nftCollection?.signature.mint(signedPayload);

      alert("Minted succesfully!");
      mintUploadNFT();
      return nft;
    } catch (e) {
      console.error("An error occurred trying to mint the NFT:", e);
    }
  };

  async function mintEditionNFT() {
    // Custom metadata of the NFT, note that you can fully customize this metadata with other properties.
    const metadata = {
      name: nftName,
      description: description,
      image: image, // This can be an image url or file
    };

    const metadataWithSupply = {
      metadata,
      supply: 1, // The number of this NFT you want to mint
    };

    const tx = await nftCollection.mintTo(address, metadataWithSupply);
    const receipt = tx.receipt; // the transaction receipt
    const tokenId = tx.id; // the id of the NFT minted
    const mintedNft = await tx.data(); // (optional) fetch details of minted NFT

    mintUploadNFT();
  }

  let button;
  if (selectedCollectionAddress === artluxCollectionAddress) {
    button = (
      <Web3Button
        contractAddress="0xA71a329a6F84c4191abE80DC8497D604023bc23B"
        action={() => mintWithSignature()}>
        Mint NFT With Artlux Collection
      </Web3Button>
    );
  } else {
    button = (
      <Web3Button
        contractAddress={selectedCollectionAddress}
        action={() => mintEditionNFT()}>
        Mint NFT With Your Collection
      </Web3Button>
    );
  }

  return (
    <div>
      <Meta title="Create || Artlux  NFT Marketplace " />
      {/* <!-- Create --> */}
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        {!address ? (
          <>
            <div className="mx-auto max-w-[48.125rem]">
              <div className="container">
                <h1 className="font-display text-jacarta-700 pt-16 pb-4 text-center text-4xl font-medium dark:text-white">
                  Connect wallet
                </h1>
                <p className="dark:text-jacarta-300 text-2xs mb-3 flex text-center justify-center ">
                  Please connect your blockchain wallet to see this page
                </p>
                {/* <!-- Connect Wallet --> */}
                <div className="my-6">
                  <ConnectWallet
                    accentColor="#d1d5db"
                    colorMode="light"
                    auth={{
                      loginConfig: {
                        // The URL to redirect to on login.
                        redirectTo: "/",
                        // Function to run on error.
                      },
                      // If you want users to sign in after connecting their wallet
                      loginOptional: true,
                      loginOptions: {
                        chainId: process.env.NEXT_PUBLIC_CHAINID,
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="container">
            <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
              Create
            </h1>

            <div className="mx-auto max-w-[48.125rem]">
              {/* <!-- File Upload --> */}
              <div className="mb-6">
                <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  NFT Image
                  <span className="text-red">*</span>
                </label>
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  This image will be used for featuring your collection on the
                  homepage, category pages, or other promotional areas of
                  Artlux.
                </p>
                {preview ? (
                  <div className="mb-4">
                    <img
                      src={preview}
                      onClick={() => {
                        setPreview(undefined);
                        setLogoImagesAssets(undefined);
                      }}
                      className="max-w-full h-auto rounded-lg"
                      alt=""
                    />
                  </div>
                ) : (
                  <ImageUploader handleLogoImage={handleLogoImage} />
                )}
              </div>

              {/* <!-- Name--> */}
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
                  placeholder="Item name"
                  required
                  onChange={(e) => setNFTName(e.target.value)}
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

              {/* <!-- Collections --> */}
              <div className="mb-6">
                <label
                  htmlFor="item-supply"
                  className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  Collections
                </label>
                {/* dropdown */}

                <div className="dropdown relative mb-4 cursor-pointer ">
                  {collectionList.length > 0 ? (
                    <>
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
                              src={
                                activeItem ? activeItem : "/images/artlux.png"
                              }
                              alt="eth"
                              className="mr-2 h-5 w-5 rounded-full"
                            />
                            {activeCategory
                              ? activeCategory
                              : "Select Collection"}
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
                          }
                          onClick={() => handleDropdown()}>
                          <ul className="scrollbar-custom flex max-h-48 flex-col overflow-y-auto">
                            {collectionList.map((collectionList, index) => (
                              <li key={collectionList.id}>
                                <button
                                  href="#"
                                  className="dropdown-item font-display dark:hover:bg-jacarta-600 hover:bg-jacarta-50 flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white"
                                  onClick={() => {
                                    setActiveItem(collectionList.logoImageUrl);
                                    setActiveCategory(collectionList.title);
                                    setSelectedCat(collectionList.id);
                                    setSelectedCollectionAddress(
                                      collectionList.contractAddress
                                    );
                                    console.log(selectedCollectionAddress);
                                  }}>
                                  <span className="flex items-center space-x-3">
                                    <img
                                      src={collectionList.logoImageUrl}
                                      className="h-8 w-8 rounded-full"
                                      loading="lazy"
                                      alt="avatar"
                                    />
                                    <span className="text-jacarta-700 dark:text-white">
                                      {collectionList.title}
                                    </span>
                                  </span>
                                  {activeItem ===
                                    collectionList.logoImageUrl && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="24"
                                      height="24"
                                      className="fill-accent mb-[3px] h-4 w-4">
                                      <path
                                        fill="none"
                                        d="M0 0h24v24H0z"></path>
                                      <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                    </svg>
                                  )}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
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
                              src={
                                activeItem ? activeItem : "/images/artlux.png"
                              }
                              alt="eth"
                              className="mr-2 h-5 w-5 rounded-full"
                            />
                            {activeCategory
                              ? activeCategory
                              : "Select Collection"}
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
                          }
                          onClick={() => handleDropdown()}>
                          <ul className="scrollbar-custom flex max-h-48 flex-col overflow-y-auto">
                            <li>
                              <button
                                onClick={() => {
                                  setSelectedCollectionAddress(
                                    artluxCollectionAddress
                                  );
                                  setActiveItem("/images/artlux.png");
                                  setActiveCategory("Artlux Collection");
                                  setSelectedCat(
                                    "d35fff87-116e-4c53-a478-21b588b295a4"
                                  );
                                }}
                                className="dropdown-item font-display dark:hover:bg-jacarta-600 hover:bg-jacarta-50 flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white">
                                <span className="flex items-center space-x-3">
                                  <img
                                    src="/images/artlux.png"
                                    className="h-8 w-8 rounded-full"
                                    loading="lazy"
                                    alt="avatar"
                                  />
                                  <span className="text-jacarta-700 dark:text-white">
                                    Artlux Collection
                                  </span>
                                </span>

                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  className="fill-accent mb-[3px] h-4 w-4">
                                  <path fill="none" d="M0 0h24v24H0z"></path>
                                  <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                </svg>
                              </button>
                            </li>
                            <li>
                              <button
                                href="/collection/create"
                                className="dropdown-item font-display dark:hover:bg-jacarta-600 hover:bg-jacarta-50 flex w-full items-center justify-between rounded-xl px-5 py-2 text-left text-sm transition-colors dark:text-white">
                                <span className="flex items-center space-x-3">
                                  <IoCreateOutline className="h-8 w-8 rounded-full" />
                                  <span className="text-jacarta-700 dark:text-white">
                                    Create Collection
                                  </span>
                                </span>

                                <IoCreateOutline />
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-6">{button}</div>
            </div>
          </div>
        )}
      </section>
      {/* <!-- end create --> */}
    </div>
  );
};

export default ERC721;

export async function getServerSideProps() {
  const categoryListQuery = `*[_type == "category"] {
  category,
  icon,
  url,
}`;

  const blockchainListQuery = `*[_type == "blockchain"] {
  chainName, 
  "icon": icon.asset->url,
  
}`;

  const categoryList = await client.fetch(categoryListQuery);
  const blockchainList = await client.fetch(blockchainListQuery);

  if (!categoryList.length && !blockchainList.length) {
    return {
      props: {
        categoryList: [],
        blockchainList: [],
      },
    };
  } else {
    return {
      props: {
        categoryList,
        blockchainList,
      },
    };
  }
}
