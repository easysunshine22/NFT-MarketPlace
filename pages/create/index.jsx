import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Collection_dropdown2 from "../../components/dropdown/collection_dropdown2";
import {
  collectionDropdown2_data,
  EthereumDropdown2_data,
} from "../../data/dropdown";
import { FileUploader } from "react-drag-drop-files";
import Proparties_modal from "../../components/modal/proparties_modal";
import { useDispatch } from "react-redux";
import { showPropatiesModal } from "../../redux/counterSlice";
import Meta from "../../components/Meta";
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useNFTs,
  useStorageUpload,
  Web3Button,
} from "@thirdweb-dev/react";
// sanity
import sanityClient from "@sanity/client";
import { user } from "../../lib/user";
import { client } from "../../lib/sanityClient";
import ChainDropdown from "../../components/cards/chainDropdown";
import CollectionDropdown from "../../components/cards/collectionDropdown";

const Create = ({ blockchainList, categoryList }) => {
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

  const [collection, setCollection] = useState({});
  const [logoImagesAssets, setLogoImagesAssets] = useState(null);
  const [image, setImage] = useState(null);
  const [collectionName, setCollectionName] = useState();
  const [description, setDescription] = useState();
  console.log(address + "" + "test");
  // Sanity
  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "collections" && createdBy._ref == "${address}"] {
      "logoImageUrl": logoImage.asset->url,
     title

  }`;

    const collectionList = await sanityClient.fetch(query);

    console.log(collectionList, "🔥");
    await setCollection(collectionList);
    // the query returns 1 object inside of an array
  };

  useEffect(() => {
    fetchCollectionData();
  }, [address]);

  async function mintNFT() {
    const userDoc = {
      _type: "collections",
      _id: collectionName,
      title: collectionName,
      description: description,

      createdBy: {
        _type: "reference",
        _ref: address,
      },
    };
    await client.createIfNotExists(userDoc);

    updateLogoImage();
  }

  const handleLogoImage = (e) => {
    const selectedLogoImage = e.target.files[0];
    setImage(e.target.files[0]);
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

  const popupItemData = [
    {
      id: 1,
      name: "proparties",
      text: "Textual traits that show up as rectangles.",
      icon: "proparties-icon",
    },
    {
      id: 2,
      name: "levels",
      text: "Numerical traits that show as a progress bar.",
      icon: "level-icon",
    },
    {
      id: 3,
      name: "stats",
      text: "Numerical traits that just show as numbers.",
      icon: "stats-icon",
    },
  ];

  const address = useAddress();
  const { mutateAsync: upload } = useStorageUpload();

  // Fetch the NFT collection from thirdweb via it's contract address.
  const { contract: nftCollection } = useContract(
    // Replace this with your NFT Collection contract address
    "0x03f1612a4343BFdFe3608b6C750e5A58CbadFD3A",
    "nft-collection"
  );

  const { data: nfts, isLoading: loadingNfts } = useNFTs(nftCollection);

  // This function calls a Next JS API route that mints an NFT with signature-based minting.
  // We send in the address of the current user, and the text they entered as part of the request.
  const mintWithSignature = async () => {
    try {
      if (!logoImagesAssets || !collectionName) {
        alert("Please enter a name and upload a file.");
        return;
      }

      // Upload image to IPFS using Storage
      const uris = await upload({
        data: [logoImagesAssets],
      });

      // Make a request to /api/server
      const signedPayloadReq = await fetch(`/api/server`, {
        method: "POST",
        body: JSON.stringify({
          authorAddress: address, // Address of the current user
          nftName: collectionName,
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

      return nft;
    } catch (e) {
      console.error("An error occurred trying to mint the NFT:", e);
    }
  };

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
        <div className="container">
          <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
            Create
          </h1>

          <div className="mx-auto max-w-[48.125rem]">
            {/* <!-- File Upload --> */}
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
                    onChange={handleLogoImage}
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
                placeholder="Item name"
                required
                onChange={(e) => setCollectionName(e.target.value)}
              />
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
                placeholder="https://yoursite.io/item/123"
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

            {/* <!-- Collection --> 
            <div className="relative">
              <div>
                <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                  Collection
                </label>
                <div className="mb-3 flex items-center space-x-2">
                  <p className="dark:text-jacarta-300 text-2xs">
                    This is the collection where your item will appear.
                    <Tippy
                      theme="tomato-theme"
                      content={
                        <span>
                          Moving items to a different collection may take up to
                          30 minutes.
                        </span>
                      }>
                      <span className="inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="dark:fill-jacarta-300 fill-jacarta-500 ml-1 -mb-[3px] h-4 w-4">
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"></path>
                        </svg>
                      </span>
                    </Tippy>
                  </p>
                </div>
              </div>

            
              <div className="dropdown my-1 cursor-pointer">
                <Collection_dropdown2
                  data={collectionDropdown2_data}
                  collection={true}
                />
              </div>
            </div> */}

            {/* <!-- Properties --> 
            {popupItemData.map(({ id, name, text, icon }) => {
              return (
                <div
                  key={id}
                  className="dark:border-jacarta-600 border-jacarta-100 relative border-b py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <svg className="icon fill-jacarta-700 mr-2 mt-px h-4 w-4 shrink-0 dark:fill-white">
                        <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                      </svg>

                      <div>
                        <label className="font-display text-jacarta-700 block dark:text-white">
                          {name}
                        </label>
                        <p className="dark:text-jacarta-300">{text}</p>
                      </div>
                    </div>
                    <button
                      className="group dark:bg-jacarta-700 hover:bg-accent border-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-white hover:border-transparent"
                      onClick={() => dispatch(showPropatiesModal())}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="fill-accent group-hover:fill-white">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })} 

            <Proparties_modal /> */}

            {/* <!-- Properties --> */}

            {/* <!-- Unlockable Content --> 
            <div className="dark:border-jacarta-600 border-jacarta-100 relative border-b py-6">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-accent mr-2 mt-px h-4 w-4 shrink-0">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M7 10h13a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 0 1 13.262-3.131l-1.789.894A5 5 0 0 0 7 9v1zm-2 2v8h14v-8H5zm5 3h4v2h-4v-2z" />
                  </svg>

                  <div>
                    <label className="font-display text-jacarta-700 block dark:text-white">
                      Unlockable Content
                    </label>
                    <p className="dark:text-jacarta-300">
                      Include unlockable content that can only be revealed by
                      the owner of the item.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  value="checkbox"
                  name="check"
                  className="checked:bg-accent checked:focus:bg-accent checked:hover:bg-accent after:bg-jacarta-400 bg-jacarta-100 relative h-6 w-[2.625rem] cursor-pointer appearance-none rounded-full border-none after:absolute after:top-[0.1875rem] after:left-[0.1875rem] after:h-[1.125rem] after:w-[1.125rem] after:rounded-full after:transition-all checked:bg-none checked:after:left-[1.3125rem] checked:after:bg-white focus:ring-transparent focus:ring-offset-0"
                />
              </div>
            </div> */}

            {/* <!-- Explicit & Sensitive Content --> 
            <div className="dark:border-jacarta-600 border-jacarta-100 relative mb-6 border-b py-6">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-700 mr-2 mt-px h-4 w-4 shrink-0 dark:fill-white">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zM11 16v2h2v-2h-2zm0-7v5h2V9h-2z" />
                  </svg>

                  <div>
                    <label className="font-display text-jacarta-700 dark:text-white">
                      Explicit & Sensitive Content
                    </label>

                    <p className="dark:text-jacarta-300">
                      Set this item as explicit and sensitive content.
                      <Tippy
                        content={
                          <span>
                            Setting your asset as explicit and sensitive
                            content, like pornography and other not safe for
                            work (NSFW) content, will protect users with safe
                            search while browsing Ayris.Dev
                          </span>
                        }>
                        <span className="inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            className="dark:fill-jacarta-300 fill-jacarta-500 ml-2 -mb-[2px] h-4 w-4">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"></path>
                          </svg>
                        </span>
                      </Tippy>
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  value="checkbox"
                  name="check"
                  className="checked:bg-accent checked:focus:bg-accent checked:hover:bg-accent after:bg-jacarta-400 bg-jacarta-100 relative h-6 w-[2.625rem] cursor-pointer appearance-none rounded-full border-none after:absolute after:top-[0.1875rem] after:left-[0.1875rem] after:h-[1.125rem] after:w-[1.125rem] after:rounded-full after:transition-all checked:bg-none checked:after:left-[1.3125rem] checked:after:bg-white focus:ring-transparent focus:ring-offset-0"
                />
              </div>
            </div> */}

            {/* <!-- Supply --> */}
            <div className="mb-6">
              <label
                htmlFor="item-supply"
                className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Supply
              </label>

              <div className="mb-3 flex items-center space-x-2">
                <p className="dark:text-jacarta-300 text-2xs">
                  The number of items that can be minted. No gas cost to you!
                  <Tippy
                    content={
                      <span>
                        Setting your asset as explicit and sensitive content,
                        like pornography and other not safe for work (NSFW)
                        content, will protect users with safe search while
                        browsing Ayris.Dev.
                      </span>
                    }>
                    <span className="inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="dark:fill-jacarta-300 fill-jacarta-500 ml-1 -mb-[3px] h-4 w-4">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"></path>
                      </svg>
                    </span>
                  </Tippy>
                </p>
              </div>

              <input
                type="text"
                id="item-supply"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="1"
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
                  <ChainDropdown blockchainList={blockchainList} />
                )}
              </div>
            </div>

            {/* <!-- Collection --> */}
            <div className="mb-6">
              <label
                htmlFor="item-supply"
                className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Collection
              </label>

              {/* dropdown  */}
              <div className="dropdown relative mb-4 cursor-pointer ">
                {collection.length > 0 && (
                  <CollectionDropdown collectionList={collection} />
                )}
              </div>
            </div>

            {/* <!-- Freeze metadata --> */}
            <div className="mb-6">
              <div className="mb-2 flex items-center space-x-2">
                <label
                  htmlFor="item-freeze-metadata"
                  className="font-display text-jacarta-700 block dark:text-white">
                  Freeze metadata
                </label>

                <Tippy
                  content={
                    <span className="bg-jacarta-300">
                      Setting your asset as explicit and sensitive content, like
                      pornography and other not safe for work (NSFW) content,
                      will protect users with safe search while browsing
                      Ayris.Dev.
                    </span>
                  }>
                  <span className="inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="dark:fill-jacarta-300 fill-jacarta-500 mb-[2px] h-5 w-5">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"></path>
                    </svg>
                  </span>
                </Tippy>
              </div>

              <p className="dark:text-jacarta-300 text-2xs mb-3">
                Freezing your metadata will allow you to permanently lock and
                store all of this
                {"item's"} content in decentralized file storage.
              </p>

              <input
                type="text"
                disabled
                id="item-freeze-metadata"
                className="dark:bg-jacarta-700 bg-jacarta-50 border-jacarta-100 dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 dark:text-white"
                placeholder="To freeze your metadata, you must create your item first."
              />
            </div>

            {/* <!-- Submit --> */}

            <Web3Button
              // The contract address
              contractAddress="0x03f1612a4343BFdFe3608b6C750e5A58CbadFD3A"
              action={() => {
                mintWithSignature();
                mintNFT();
              }}

              // Access the contract itself, perform any action you want on it:
            >
              Mint NFT
            </Web3Button>
          </div>
        </div>
      </section>
      {/* <!-- end create --> */}
    </div>
  );
};

export default Create;

export async function getServerSideProps() {
  const categoryListQuery = `*[_type == "category"] {
  category,
  icon,
  url,
}`;

  const blockchainListQuery = `*[_type == "blockchain"] {
  chainName, 
  "icon": icon.asset->url,
  "id": _id,
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
