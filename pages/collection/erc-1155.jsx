import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Meta from "../../components/Meta";
import { buyModalShow } from "../../redux/counterSlice";
import { RadioGroup } from "@headlessui/react";
import NcImage from "../../components/ayrisdev/NcImage/NcImage";

// ThirdWeb
import { useAddress, useSDK, Web3Button } from "@thirdweb-dev/react";
// sanity
import { client } from "../../lib/sanityClient";

//Components
import BannerUploader from "../../components/ayrisdev/bannerUploader";
import ImageUploader from "../../components/ayrisdev/imageUploader";
import FeaturedUploader from "../../components/ayrisdev/featuredUploader";
// Toaster
import toast, { Toaster } from "react-hot-toast";

const plans = [
  {
    name: "Artlux Collection",
    selCollAddress: "artluxCollectionAddress",
    activeCat: "Artlux Collection",
    selCat: "d15aed69-103f-4de6-98dc-f664f1ae493f",
  },
  {
    name: "Artlux Collection",
    selCollAddress: "artluxCollectionAddress",
    activeCat: "Artlux Collection",
    selCat: "d15aed69-103f-4de6-98dc-f664f1ae493f",
  },
];

const ERC1155Coll = ({ blockchainList, categoryList }) => {
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

  const [selected, setSelected] = useState(plans[1]);
  const dispatch = useDispatch();

  const [selectedChain, setSelectedChain] = useState(null);
  const [selectedCat, setSelectedCat] = useState();
  const [selectedd, setSelectedd] = useState(plans[1]);

  //sanity
  const [collectionName, setCollectionName] = useState();
  const [description, setDescription] = useState();
  const [website, setWebsite] = useState();
  const [twitter, setTwitter] = useState();
  const [telegram, setTelegram] = useState();

  // thirdweb
  const address = useAddress();
  const sdk = useSDK();
  const [collectionAddress, setCollectionAddress] = useState();

  // photo upload
  console.log(selectedChain + "selectedchain");
  console.log(selectedCat + "selectedCat");
  const [preview, setPreview] = useState();
  const [bannerPreview, setBannerPreview] = useState();
  const [featuredPreview, setFeaturedPreview] = useState();
  const [logoImagesAssets, setLogoImagesAssets] = useState(null);
  const [bannerImagesAssets, setBannerImagesAssets] = useState(null);
  const [featuredImagesAssets, setFeaturedImagesAssets] = useState(null);

  const handleLogoImage = (e) => {
    const selectedLogoImage = e.target.files[0];
    setPreview(URL.createObjectURL(e.target.files[0]));
    client.assets
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
    setBannerPreview(URL.createObjectURL(e.target.files[0]));
    client.assets
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
    setFeaturedPreview(URL.createObjectURL(e.target.files[0]));
    client.assets
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
      collectionType: "erc1155",
      twitterAddress: twitter,
      telegramAddress: telegram,
      contractAddress: collectionAddress,
      createdBy: {
        _type: "reference",
        _ref: address,
      },
      categories: {
        _type: "reference",
        _ref: `${selectedCat}`,
      },
      blockchain: {
        _type: "reference",
        _ref: `${selectedChain}`,
      },
      volumeTraded: 0,
      floorPrice: 0,
    };
    await client.create(userDoc);

    await updateLogoImage();
    await updateBannerImage();
    await updateFeaturedImage();
    notify();
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

  async function deployCollection() {
    const contractAddresss = await sdk.deployer.deployEdition({
      name: collectionName,
      primary_sale_recipient: address,
    });

    const data = await contractAddresss.toString();
    console.log(data + "contractAddressssss");
    setCollectionAddress(data);
    createCollection();
  }

  const notify = (collectionAddress) =>
    toast(`Your Collection Deployed`, {
      icon: "👏",
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
      iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
      },
    });

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
          <Toaster />
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

            {/* <!-- Collection Banner Image Upload --> */}

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

              {bannerPreview ? (
                <div className="mb-4">
                  <img
                    src={bannerPreview}
                    onClick={() => {
                      setBannerPreview(undefined);
                      setBannerImagesAssets(undefined);
                    }}
                    className="max-w-full h-auto rounded-lg"
                    alt=""
                  />
                </div>
              ) : (
                <BannerUploader handleBannerImage={handleBannerImage} />
              )}
            </div>

            {/* <!-- Collection Featured Image Upload --> */}

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

              {featuredPreview ? (
                <div className="mb-4">
                  <img
                    src={featuredPreview}
                    onClick={() => {
                      setFeaturedPreview(undefined);
                      setFeaturedImagesAssets(undefined);
                    }}
                    className="max-w-full h-auto rounded-lg"
                    alt=""
                  />
                </div>
              ) : (
                <FeaturedUploader handleFeaturedImage={handleFeaturedImage} />
              )}
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

            <div>
              <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Choose Blockchain
              </label>
              <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                Choose Blockchain
              </div>

              <RadioGroup value={selected} onChange={setSelected}>
                <RadioGroup.Label className="sr-only">
                  Server size
                </RadioGroup.Label>
                <div className="flex overflow-auto py-2 space-x-4 customScrollBar">
                  {blockchainList.length > 0 && (
                    <>
                      {blockchainList.map((collectionList, index) => (
                        <RadioGroup.Option
                          key={index}
                          onClick={() => {
                            setSelectedChain(collectionList.id);
                          }}
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
                                          src={collectionList.icon}
                                        />
                                      </RadioGroup.Description>
                                      {checked && (
                                        <div className="flex-shrink-0 text-white">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 h-6">
                                            <path
                                              fillRule="evenodd"
                                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </div>
                                      )}
                                    </div>
                                    <RadioGroup.Label
                                      as="p"
                                      className={`font-semibold mt-3  ${
                                        checked ? "text-white" : ""
                                      }`}>
                                      {collectionList.chainName}
                                    </RadioGroup.Label>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </>
                  )}
                </div>
              </RadioGroup>
            </div>

            {/* <!-- Category --> */}

            <div>
              <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Choose Categories
              </label>
              <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                Choose Categories
              </div>

              <RadioGroup value={selectedd} onChange={setSelectedd}>
                <RadioGroup.Label className="sr-only">
                  Server size
                </RadioGroup.Label>
                <div className="flex overflow-auto py-2 space-x-4 customScrollBar">
                  {categoryList.length > 0 && (
                    <>
                      {categoryList.map((categoryList, index) => (
                        <RadioGroup.Option
                          key={index}
                          onClick={() => {
                            setSelectedCat(categoryList.id);
                          }}
                          value={categoryList}
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
                                          src={categoryList.icon}
                                        />
                                      </RadioGroup.Description>
                                      {checked && (
                                        <div className="flex-shrink-0 text-white">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-6 h-6">
                                            <path
                                              fillRule="evenodd"
                                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </div>
                                      )}
                                    </div>
                                    <RadioGroup.Label
                                      as="p"
                                      className={`font-semibold mt-3  ${
                                        checked ? "text-white" : ""
                                      }`}>
                                      {categoryList.category}
                                    </RadioGroup.Label>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </>
                  )}
                </div>
              </RadioGroup>
            </div>

            <span> </span>
            {/* <!-- Submit --> */}

            <Web3Button
              contractAddress={process.env.NEXT_PUBLIC_COLLECTION_ADDRESS}
              action={() => deployCollection()}
              onSuccess={notify}>
              Create Collection
            </Web3Button>
          </div>
        </div>
      </section>
      {/* <!-- end create --> */}
    </div>
  );
};

export default ERC1155Coll;

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
