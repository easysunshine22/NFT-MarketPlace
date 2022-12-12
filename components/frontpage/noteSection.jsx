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
      <section class="notable-collection-section">
        <img class="shape2" src="/images/shape-left.png" alt="" />
        <div id="notable-collections">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="section-title text-center">
                  <h2>Notable collections</h2>
                </div>
              </div>
            </div>
          </div>

          <div class="collection-slider-area">
            <div class="collection-slides">
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/1.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/2.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/3.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/4.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/5.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/2.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/3.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
              <div class="single-collection-slide">
                <img
                  class="collection-thumb"
                  src="/images/notable-collections/1.png"
                  alt=""
                />
                <div class="single-collection-slide-description">
                  <img src="/images/s.png" alt="" />
                  <h3>The Sandbox California</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="spotlight">
          <div class="container">
            <div class="row sportlight-title-wrap">
              <div class="col-md-12 d-flex justify-content-between align-items-center">
                <div class="section-title">
                  <h2>BNB Chain NFT spotlight</h2>
                </div>
                <a href="#" class="primary-btn">
                  View All
                </a>
              </div>
            </div>
            <div class="row gy-4">
              <div class="col-md-6">
                <div class="spotlight-item">
                  <img src="/images/spotlight/1.png" alt="" />
                  <div class="spotlight-meta">
                    <img src="/images/spotlight/meta-1.png" alt="" />
                    <h4>Pancake Squad</h4>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="spotlight-item">
                  <img src="/images/spotlight/2.png" alt="" />
                  <div class="spotlight-meta">
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
