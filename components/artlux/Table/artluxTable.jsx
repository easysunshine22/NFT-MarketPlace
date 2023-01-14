import React from "react";
import Link from "next/link";

const ArtluxTable = ({ collectionList }) => {
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
                      <span>
                        <img src="/images/collections/1.png" alt="" />
                      </span>{" "}
                      <span>
                        <img src="/images/collections/2.png" alt="" />
                      </span>
                      <span>
                        <img src="/images/collections/3.png" alt="" />
                      </span>{" "}
                      <span>
                        <img src="/images/collections/4.png" alt="" />{" "}
                      </span>
                      <span>
                        <img src="/images/collections/5.png" alt="" />
                      </span>
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
                    <Link href={`/collection/${collectionList.title}`}>
                      <tr>
                        <td className="min-table-width">
                          <div className="nft-table-item">
                            <div className="nft-icon">
                              <span>1</span>
                              <img src={collectionList.logoImageUrl} alt="" />
                            </div>
                            <h4>
                              <a> {collectionList.title} </a>
                            </h4>
                          </div>
                        </td>
                        <td>{collectionList.floorPrice} AD</td>
                        <td>{collectionList.volumeTraded} AD</td>
                      </tr>
                    </Link>
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
