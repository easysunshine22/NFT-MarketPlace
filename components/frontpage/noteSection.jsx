import Script from "next/script";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const NoteSection = () => {
  return (
    <>
      <Script src="/scripts/main.js" data-test="script" />{" "}
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
        crossorigin="anonymous"
      />
      <section className="notable-collection-section">
        <img className="shape2" src="/images/shape-left.png" alt="" />
        <div id="notable-collections">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-title text-center">
                  <h2>Notable collections</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="collection-slider-area">
            <div className="collection-slides">
              <div className="single-collection-slide">
                <img
                  className="collection-thumb"
                  src="/images/notable-collections/1.png"
                  alt=""
                />
                <div className="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div className="single-collection-slide">
                <img
                  className="collection-thumb"
                  src="/images/notable-collections/2.png"
                  alt=""
                />
                <div className="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div className="single-collection-slide">
                <img
                  className="collection-thumb"
                  src="/images/notable-collections/3.png"
                  alt=""
                />
                <div className="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div className="single-collection-slide">
                <img
                  className="collection-thumb"
                  src="/images/notable-collections/4.png"
                  alt=""
                />
                <div className="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div className="single-collection-slide">
                <img
                  className="collection-thumb"
                  src="/images/notable-collections/5.png"
                  alt=""
                />
                <div className="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div className="single-collection-slide">
                <img
                  className="collection-thumb"
                  src="/images/notable-collections/2.png"
                  alt=""
                />
                <div className="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div className="single-collection-slide">
                <img
                  className="collection-thumb"
                  src="/images/notable-collections/3.png"
                  alt=""
                />
                <div className="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div className="single-collection-slide">
                <img
                  className="collection-thumb"
                  src="/images/notable-collections/1.png"
                  alt=""
                />
                <div className="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="spotlight">
          <div className="container">
            <div className="row sportlight-title-wrap">
              <div className="col-md-12 d-flex justify-content-between align-items-center">
                <div className="section-title">
                  <h2>BNB Chain NFT spotlight</h2>
                </div>
                <a href="#" className="primary-btn">
                  View All
                </a>
              </div>
            </div>
            <div className="row gy-4">
              <div className="col-md-6">
                <div className="spotlight-item">
                  <img src="/images/spotlight/1.png" alt="" />
                  <div className="spotlight-meta">
                    <img src="/images/spotlight/meta-1.png" alt="" />
                    <h4>Pancake Squad</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="spotlight-item">
                  <img src="/images/spotlight/2.png" alt="" />
                  <div className="spotlight-meta">
                    <img src="/images/spotlight/meta-1.png" alt="" />
                    <h4>Pancake Squad</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NoteSection;
