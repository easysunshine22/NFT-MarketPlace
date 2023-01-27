import React from "react";

const foot = () => {
  return (
    <footer id="footer">
      <div className="cta-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="cta-content text-center">
                <h2>Stay in the loop</h2>
                <form action="">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Your Email"
                  />
                  <button className="btn btn-primary" type="submit">
                    Sign Up
                  </button>
                </form>
                <div className="social-media">
                  <a href="#" target="_blank">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-section text-white">
        <div className="container">
          <div className="row">
            <div className="col-xl-4">
              <div className="footer-about">
                <img src="/images/footer-logo.png" alt="" />
                <p>
                  Create, sell and collect rare digital arts on Artlux NFT
                  marketplace. Play and earn with your NFTs on the Artlux NFT
                  lottery platform.
                </p>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-6">
              <div className="footer-widget">
                <h3>Marketplace</h3>
                <ul>
                  <li>
                    <a href="#">All</a>
                  </li>
                  <li>
                    <a href="#">NFTs</a>
                  </li>
                  <li>
                    <a href="#">Art</a>
                  </li>
                  <li>
                    <a href="#">Collectibles</a>
                  </li>
                  <li>
                    <a href="#">Domain Names</a>
                  </li>
                  <li>
                    <a href="#">Music</a>
                  </li>
                  <li>
                    <a href="#">Photography</a>
                  </li>
                  <li>
                    <a href="#">Sports</a>
                  </li>
                  <li>
                    <a href="#">Trading Cards</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-6">
              <div className="footer-widget">
                <h3>My Account</h3>
                <ul>
                  <li>
                    <a href="#">Profile</a>
                  </li>
                  <li>
                    <a href="#">Favorites</a>
                  </li>
                  <li>
                    <a href="#">Watchlist</a>
                  </li>
                  <li>
                    <a href="#">My Collections</a>
                  </li>
                  <li>
                    <a href="#">Create</a>
                  </li>
                  <li>
                    <a href="#">Settings</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-6">
              <div className="footer-widget">
                <h3>Resources</h3>
                <ul>
                  <li>
                    <a href="#">Learn</a>
                  </li>
                  <li>
                    <a href="#">Help Center</a>
                  </li>
                  <li>
                    <a href="#">Platform Status</a>
                  </li>
                  <li>
                    <a href="#">Partners</a>
                  </li>
                  <li>
                    <a href="#">Taxes Blog</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-sm-6">
              <div className="footer-widget">
                <h3>Company</h3>
                <ul>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                  <li>
                    <a href="#">Ventures</a>
                  </li>
                  <li>
                    <a href="#">Grants</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-section text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="copyright-text">
                <p>&copy; 2023 Artlux Inc</p>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <div className="terms">
                <ul>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Terms of Service</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default foot;
