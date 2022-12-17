import React from "react";

const foot = () => {
  return (
    <footer id="footer">
      <div class="cta-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="cta-content text-center">
                <h2>Stay in the loop</h2>
                <form action="">
                  <input
                    class="form-control"
                    type="email"
                    placeholder="Your Email"
                  />
                  <button class="btn btn-primary" type="submit">
                    Sign Up
                  </button>
                </form>
                <div class="social-media">
                  <a href="#" target="_blank">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="#" target="_blank">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-section text-white">
        <div class="container">
          <div class="row">
            <div class="col-xl-4">
              <div class="footer-about">
                <img src="/images/footer-logo.png" alt="" />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus ultricies mauris non interdum fringilla. Morbi et
                  euismod
                </p>
              </div>
            </div>
            <div class="col-xl-2 col-lg-3 col-sm-6">
              <div class="footer-widget">
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
            <div class="col-xl-2 col-lg-3 col-sm-6">
              <div class="footer-widget">
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
            <div class="col-xl-2 col-lg-3 col-sm-6">
              <div class="footer-widget">
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
            <div class="col-xl-2 col-lg-3 col-sm-6">
              <div class="footer-widget">
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

      <div class="copyright-section text-white">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="copyright-text">
                <p>&copy; 2018 - 2022 Name Of Company</p>
              </div>
            </div>
            <div class="col-md-6 text-end">
              <div class="terms">
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
