import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { client } from "../../../lib/sanityClient";

const ArtluxTable = ({ categoryList }) => {
  const [collectionList, setCollectionList] = useState({});
  const [blockchainList, setBlockchainList] = useState({});
  const [selChain, setSelChain] = useState(null);
  const [selTime, setSelTime] = useState(null);
  const [selTrend, setSelTrend] = useState(null);
  console.log(selChain);
  console.log(collectionList + "list");
  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "collections" ] {
   
          "logoImageUrl": logoImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
  "featuredImageUrl": featuredImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description,
      _id
        }`;

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, "🔥");
    await setCollectionList(collectionData);
  };
  const fetchBlockChainData = async (sanityClient = client) => {
    const query = `*[_type == "blockchain"] {
      chainName, 
      "icon": icon.asset->url,
      "id": _id,
      chainID,
    }`;

    const blockchainData = await sanityClient.fetch(query);

    console.log(blockchainData, "🔥");
    await setBlockchainList(blockchainData);
  };

  useEffect(() => {
    if (selChain != null) {
      fetchCollectionDataWithBlockchain();
    }
  }, [selChain]);

  const fetchCollectionDataWithBlockchain = async (sanityClient = client) => {
    const query = `*[_type == "collections" &&  blockchain->chainID == "${selChain}"] {
         
      "logoImageUrl": logoImage.asset->url,
      "blockchain" :  blockchain->chainID,
      title, 
      floorPrice,
      volumeTraded,
        }`;

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, "🔥");
    await setCollectionList(collectionData);
  };

  useEffect(() => {
    fetchCollectionData();
    fetchBlockChainData();
  }, []);

  if (collectionList === undefined && blockchainList === undefined) {
    return <div> There is No Collection</div>;
  }

  return (
    <section id="nft-table-section">
      <img className="shape1" src="/images/shape-right.png" alt="" />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="nft-table">
              <div className="table-top">
                <div className="table-top-left">
                  <button className="primary-btn trending">Trending</button>
                  <button className="primary-btn top">Top</button>
                </div>
                <div className="table-top-right">
                  <select className="form-select">
                    <option value="24hr">24 Hr</option>
                    <option value="12hr">12 Hr</option>
                  </select>
                  <div className="all-chains">
                    {blockchainList.length > 0 && (
                      <div className="all-chain">
                        <button
                          className="w-[30px] h-[20px] cursor-pointer ml-2 rounded-full bg-red text-sm text-white text-center items-center"
                          onClick={() => {
                            fetchCollectionData();
                            setSelChain(null);
                          }}>
                          All
                        </button>
                        {blockchainList?.map((blockchainList) => (
                          <span
                            onClick={() => {
                              setSelChain(blockchainList.chainID);
                            }}>
                            <img
                              src={blockchainList.icon}
                              alt=""
                              className="w-[20px] h-[20px] cursor-pointer ml-2 rounded-full grayscale"
                            />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="primary-btn">
                    <a href="collection/explore_collection">View All</a>
                  </button>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Collection</th>
                    <th>Floor Price</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                {collectionList.length > 0 && (
                  <tbody>
                    {collectionList?.slice(0, 10).map((collectionList) => (
                      <tr>
                        <td className="min-table-width">
                          <div className="nft-table-item">
                            <div className="nft-icon">
                              <Link
                                href={`/collection/${collectionList.title}`}>
                                <img
                                  className="cursor-pointer"
                                  src={collectionList.logoImageUrl}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <h4>
                              <Link
                                href={`/collection/${collectionList.title}`}>
                                <a className="cursor-pointer">
                                  {" "}
                                  {collectionList.title}{" "}
                                </a>
                              </Link>
                            </h4>
                          </div>
                        </td>
                        <td>{collectionList.floorPrice} AD</td>
                        <td>{collectionList.volumeTraded} AD</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtluxTable;
