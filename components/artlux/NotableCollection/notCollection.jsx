import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import {
  notableCollection,
  settings,
} from "../../../artluxData/notableCollection";
import { spotlight } from "../../../artluxData/spotlight";
const notCollection = () => {
  console.log(notableCollection);
  return (
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
          <Slider {...settings}>
            {notableCollection?.map((collectionList) => (
              <Link href={`${collectionList.path}`}>
                <a>
                  <div className="single-collection-slide">
                    <img
                      className="collection-thumb"
                      src={collectionList.img}
                      alt=""
                    />
                    <div className="single-collection-slide-description">
                      <img src={collectionList.logo} alt="" />
                      <h3>{collectionList.title}</h3>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </Slider>
        </div>
      </div>

      <div id="spotlight">
        <div className="container">
          <div className="row sportlight-title-wrap">
            <div className="col-md-12 d-flex justify-content-between align-items-center">
              <div className="section-title">
                <h2>BNB Chain NFT spotlight</h2>
              </div>
              <a href="/collection/explore_collection" className="primary-btn">
                View All
              </a>
            </div>
          </div>
          <div className="row gy-4">
            {spotlight?.map((spotlight) => (
              <div className="col-md-6">
                <Link href={`${spotlight.path}`}>
                  <a>
                    <div className="spotlight-item">
                      <img src={spotlight.img} alt="" />
                      <div className="spotlight-meta">
                        <img src={spotlight.logo} alt="" />
                        <h4>{spotlight.title}</h4>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default notCollection;
