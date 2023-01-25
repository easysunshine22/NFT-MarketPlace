import React from "react";
import Link from "next/link";

const ArtluxTable = ({ collectionList, categoryList, blockchainList }) => {
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
                    <div className="all-chain">
                      All chains:{" "}
                      {blockchainList?.map((blockchainList) => (
                        <span>
                          <img
                            src={blockchainList.icon}
                            alt=""
                            className="w-[20px] h-[20px] cursor-pointer"
                          />
                        </span>
                      ))}
                    </div>
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
                <tbody>
                  {collectionList?.slice(0, 10).map((collectionList) => (
                    <tr>
                      <td className="min-table-width">
                        <div className="nft-table-item">
                          <div className="nft-icon">
                            <Link href={`/collection/${collectionList.title}`}>
                              <img
                                className="cursor-pointer"
                                src={collectionList.logoImageUrl}
                                alt=""
                              />
                            </Link>
                          </div>
                          <h4>
                            <Link href={`/collection/${collectionList.title}`}>
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
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtluxTable;
