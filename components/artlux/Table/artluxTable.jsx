import React from "react";

const ArtluxTable = () => {
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
                    <div>
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
                  <button class="primary-btn">View All</button>
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
                  <tr>
                    <td class="min-table-width">
                      <div class="nft-table-item">
                        <div class="nft-icon">
                          <span>1</span>
                          <img src="/images/nft-icon.png" alt="" />
                        </div>
                        <h4>Aboard NFTs</h4>
                      </div>
                    </td>
                    <td>0.01 ETH</td>
                    <td>3ETH</td>
                  </tr>
                  <tr>
                    <td class="min-table-width">
                      <div class="nft-table-item">
                        <div class="nft-icon">
                          <span>2</span>
                          <img src="/images/nft-icon.png" alt="" />
                        </div>
                        <h4>Aboard NFTs</h4>
                      </div>
                    </td>
                    <td>0.01 ETH</td>
                    <td>3ETH</td>
                  </tr>
                  <tr>
                    <td class="min-table-width">
                      <div class="nft-table-item">
                        <div class="nft-icon">
                          <span>3</span>
                          <img src="/images/nft-icon.png" alt="" />
                        </div>
                        <h4>Aboard NFTs</h4>
                      </div>
                    </td>
                    <td>0.01 ETH</td>
                    <td>3ETH</td>
                  </tr>
                  <tr>
                    <td class="min-table-width">
                      <div class="nft-table-item">
                        <div class="nft-icon">
                          <span>4</span>
                          <img src="/images/nft-icon.png" alt="" />
                        </div>
                        <h4>Aboard NFTs</h4>
                      </div>
                    </td>
                    <td>0.01 ETH</td>
                    <td>3ETH</td>
                  </tr>
                  <tr>
                    <td class="min-table-width">
                      <div class="nft-table-item">
                        <div class="nft-icon">
                          <span>5</span>
                          <img src="/images/nft-icon.png" alt="" />
                        </div>
                        <h4>Aboard NFTs</h4>
                      </div>
                    </td>
                    <td>0.01 ETH</td>
                    <td>3ETH</td>
                  </tr>
                  <tr>
                    <td class="min-table-width">
                      <div class="nft-table-item">
                        <div class="nft-icon">
                          <span>6</span>
                          <img src="/images/nft-icon.png" alt="" />
                        </div>
                        <h4>Aboard NFTs</h4>
                      </div>
                    </td>
                    <td>0.01 ETH</td>
                    <td>3ETH</td>
                  </tr>
                  <tr>
                    <td class="min-table-width">
                      <div class="nft-table-item">
                        <div class="nft-icon">
                          <span>7</span>
                          <img src="/images/nft-icon.png" alt="" />
                        </div>
                        <h4>Aboard NFTs</h4>
                      </div>
                    </td>
                    <td>0.01 ETH</td>
                    <td>3ETH</td>
                  </tr>
                  <tr>
                    <td class="min-table-width">
                      <div class="nft-table-item">
                        <div class="nft-icon">
                          <span>8</span>
                          <img src="/images/nft-icon.png" alt="" />
                        </div>
                        <h4>Aboard NFTs</h4>
                      </div>
                    </td>
                    <td>0.01 ETH</td>
                    <td>3ETH</td>
                  </tr>
                  <tr>
                    <td class="min-table-width">
                      <div class="nft-table-item">
                        <div class="nft-icon">
                          <span>9</span>
                          <img src="/images/nft-icon.png" alt="" />
                        </div>
                        <h4>Aboard NFTs</h4>
                      </div>
                    </td>
                    <td>0.01 ETH</td>
                    <td>3ETH</td>
                  </tr>
                  <tr>
                    <td class="min-table-width">
                      <div class="nft-table-item">
                        <div class="nft-icon">
                          <span>10</span>
                          <img src="/images/nft-icon.png" alt="" />
                        </div>
                        <h4>Aboard NFTs</h4>
                      </div>
                    </td>
                    <td>0.01 ETH</td>
                    <td>3ETH</td>
                  </tr>
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
