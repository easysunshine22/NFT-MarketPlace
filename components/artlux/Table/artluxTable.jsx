import React from "react";
import Link from "next/link";

const ArtluxTable = ({ collectionList }) => {
  return (
    <section id="nft-table-section">
      <img class="shape1" src="/images/shape-right.png" alt="" />
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="nft-table">
              <div class="table-top">
                <div class="table-top-left">
                  <button class="primary-btn trending">Trending</button>
                  <button class="primary-btn top">Top</button>
                </div>
                <div class="table-top-right">
                  <select class="form-select">
                    <option value="24hr">24 Hr</option>
                    <option value="12hr">12 Hr</option>
                  </select>
                  <div class="all-chains">
                    <div class="all-chain">
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
                  <button class="primary-btn">
                    <a href="collection/explore_collection">View All</a>
                  </button>
                </div>
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th>Collection</th>
                    <th>Floor Price</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {collectionList?.map((collectionList) => (
                    <Link href={`/collection/${collectionList.title}`}>
                      <tr>
                        <td class="min-table-width">
                          <div class="nft-table-item">
                            <div class="nft-icon">
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
