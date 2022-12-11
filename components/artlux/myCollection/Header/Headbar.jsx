const Headbar = () => {
  return (
    <>
      <header className="header-area" id="header_area">
        <nav className="navbar navbar-expand-xl">
          <div className="container-fluid custom-container">
            <a className="navbar-brand" href="index.html" id="logo">
              <img src="images/logo.png" alt="" />
            </a>
            <ul className="header-meta ms-auto mobile-meta">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <img src="/images/user.png" alt="" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <img src="/images/wallet.png" alt="" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <img src="/images/cart.png" alt="" />
                </a>
              </li>
            </ul>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#main_nav"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="collapse navbar-collapse" id="main_nav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Explore
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Drops
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Stats
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Resources
                  </a>
                </li>
              </ul>
              <ul className="search-meta ms-auto">
                <li>
                  <div className="form-group">
                    <input
                      type="search"
                      name="search"
                      id="search"
                      placeholder="Search"
                    />
                    <i className="fas fa-search"></i>
                  </div>
                </li>
              </ul>
              <ul className="header-meta">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <img src="/images/user.png" alt="" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <img src="/images/wallet.png" alt="" />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <img src="/images/cart.png" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="header-gap"></div>
    </>
  );
};

export default Headbar;
