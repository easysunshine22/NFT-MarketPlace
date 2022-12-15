// React
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Tippy from "@tippyjs/react";
import Meta from "../../components/Meta";
import { RadioGroup } from "@headlessui/react";
import NcImage from "../../components/ayrisdev/NcImage/NcImage";
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

const plans = [
  {
    name: "Artlux Collection",
    selCollAddress: "artluxCollectionAddress",
    activeCat: "Artlux Collection",
    selCat: "d35fff87-116e-4c53-a478-21b588b295a4",
  },
  {
    name: "Create Collection",
    href: "/collection/create",
  },
];

const ERC721 = ({ collectionListe }) => {
  const [selected, setSelected] = useState(plans[1]);
  const router = useRouter();
  const createPage = () => {
    router.push(`/collection/create`);
  };
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

  if (collectionListe.includes(nftName)) {
    console.log("✅ array contains apple");
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
              <div>
                <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  Choose collection
                </label>
                <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                  Choose an exiting collection or create a new one
                </div>

                <RadioGroup value={selected} onChange={setSelected}>
                  <RadioGroup.Label className="sr-only">
                    Server size
                  </RadioGroup.Label>
                  <div className="flex overflow-auto py-2 space-x-4 customScrollBar">
                    {collectionList.length > 0 ? (
                      <>
                        {collectionList.map((collectionList, index) => (
                          <RadioGroup.Option
                            key={index}
                            value={collectionList}
                            className={({ active, checked }) =>
                              `${
                                active
                                  ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                                  : ""
                              }
                  ${
                    checked
                      ? "bg-teal-600 text-white"
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }
                    relative flex-shrink-0 w-44 rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-5 cursor-pointer flex focus:outline-none `
                            }>
                            {({ active, checked }) => (
                              <>
                                <div className="flex items-center justify-center w-full">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <div className="flex items-center justify-center">
                                        <RadioGroup.Description
                                          as="div"
                                          className={"w-24 rounded-xl"}>
                                          <NcImage
                                            containerClassName="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden"
                                            src={collectionList.logoImageUrl}
                                          />
                                        </RadioGroup.Description>
                                        {checked && (
                                          <div className="flex-shrink-0 text-white">
                                            <CheckIcon className="w-6 h-6" />
                                          </div>
                                        )}
                                      </div>
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-semibold mt-3  ${
                                          checked ? "text-white" : ""
                                        }`}>
                                        {collectionList.title}
                                      </RadioGroup.Label>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}{" "}
                      </>
                    ) : (
                      <>
                        <RadioGroup.Option
                          value="artlux"
                          onClick={() => {
                            setSelectedCollectionAddress(
                              artluxCollectionAddress
                            );
                            setActiveItem("/images/artlux.png");
                            setActiveCategory("Artlux Collection");
                            setSelectedCat(
                              "d35fff87-116e-4c53-a478-21b588b295a4"
                            );
                            console.log(artluxCollectionAddress);
                          }}
                          className={({ active, checked }) =>
                            `${
                              active
                                ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                                : ""
                            }
                  ${
                    checked
                      ? "bg-teal-600 text-white"
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }
                    relative flex-shrink-0 w-44 rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-5 cursor-pointer flex focus:outline-none `
                          }>
                          {({ active, checked }) => (
                            <>
                              <div className="flex items-center justify-center w-full">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <div className="flex items-center justify-center">
                                      <RadioGroup.Description
                                        as="div"
                                        className={"rounded-full w-16"}>
                                        <NcImage
                                          containerClassName="aspect-w-1 aspect-h-1 rounded-full overflow-hidden"
                                          src="/images/artlux.png"
                                        />
                                      </RadioGroup.Description>
                                      {checked && (
                                        <div className="flex-shrink-0 text-white">
                                          <CheckIcon className="w-6 h-6" />
                                        </div>
                                      )}
                                    </div>
                                    <RadioGroup.Label
                                      as="p"
                                      className={`font-semibold mt-3  ${
                                        checked ? "text-white" : ""
                                      }`}>
                                      Artlux Collection
                                    </RadioGroup.Label>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                        <RadioGroup.Option
                          onClick={() => {
                            createPage();
                          }}
                          value="create"
                          className={({ active, checked }) =>
                            `${
                              active
                                ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                                : ""
                            }
                  ${
                    checked
                      ? "bg-teal-600 text-white"
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }
                    relative flex-shrink-0 w-44 rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-5 cursor-pointer flex focus:outline-none `
                          }>
                          {({ active, checked }) => (
                            <>
                              <div className="flex items-center justify-center w-full">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <div className="flex items-center justify-center">
                                      <RadioGroup.Description
                                        as="div"
                                        className={"rounded-full w-16"}>
                                        <NcImage
                                          containerClassName="aspect-w-1 aspect-h-1 rounded-full overflow-hidden"
                                          src="/images/create.png"
                                        />
                                      </RadioGroup.Description>
                                      {checked && (
                                        <div className="flex-shrink-0 text-white">
                                          <CheckIcon className="w-6 h-6" />
                                        </div>
                                      )}
                                    </div>
                                    <RadioGroup.Label
                                      as="p"
                                      className={`font-semibold mt-3  ${
                                        checked ? "text-white" : ""
                                      }`}>
                                      Create
                                    </RadioGroup.Label>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      </>
                    )}
                  </div>
                </RadioGroup>
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

  const collectionListQuery = `*[_type == "collections" ] {
  "logoImageUrl": logoImage.asset->url,
 title,
 _id,
contractAddress,

}`;

  const categoryList = await client.fetch(categoryListQuery);
  const blockchainList = await client.fetch(blockchainListQuery);
  const collectionListe = await client.fetch(collectionListQuery);

  if (
    !categoryList.length &&
    !blockchainList.length &&
    !collectionListe.length
  ) {
    return {
      props: {
        categoryList: [],
        blockchainList: [],
        collectionListe: [],
      },
    };
  } else {
    return {
      props: {
        categoryList,
        blockchainList,
        collectionListe,
      },
    };
  }
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
