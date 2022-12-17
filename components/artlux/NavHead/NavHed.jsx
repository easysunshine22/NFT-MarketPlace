import React from "react";

const NavHed = () => {
  return (
    <header class="header-area" id="header_area">
      <nav class="navbar navbar-expand-xl">
        <div class="container-fluid custom-container">
          <a class="navbar-brand" href="index.html" id="logo">
            <img src="images/logo.png" alt="" />
          </a>
          <ul class="header-meta ms-auto mobile-meta">
            <li class="nav-item">
              <a class="nav-link" href="#">
                <img src="/images/user.png" alt="" />
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <img src="/images/wallet.png" alt="" />
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <img src="/images/cart.png" alt="" />
              </a>
            </li>
          </ul>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main_nav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div class="collapse navbar-collapse" id="main_nav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Explore
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Drops
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Stats
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Resources
                </a>
              </li>
            </ul>
            <ul class="search-meta ms-auto">
              <li>
                <div class="form-group">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search"
                  />
                  <i class="fas fa-search"></i>
                </div>
              </li>
            </ul>
            <ul class="header-meta">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <img src="/images/user.png" alt="" />
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <img src="/images/wallet.png" alt="" />
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <img src="/images/cart.png" alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavHed;
