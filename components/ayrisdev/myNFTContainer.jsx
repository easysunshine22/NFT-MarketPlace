import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { truncateEthAddress } from "../../lib/truncAddress";
import FilterCategoryItem from "../categories/filterCategoryItem";
import Activity_item from "../collectrions/Activity_item";

const MyNFTContainer = ({ nfts, collection }) => {
  const router = useRouter();
  const [itemsTabs, setItemsTabs] = useState(1);

  const collectionItemsTabs = [
    {
      id: 1,
      text: "Items",
      icon: "items",
    },
  ];

  return (
    <>
      <section className="relative pb-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          {/* <img src="img/gradient_light.jpg" alt="gradient" className="h-full w-full" /> */}
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full object-fill"
          />
        </picture>
        <div className="container">
          {/* <!-- Tabs Nav --> */}
          <Tabs className="tabs">
            <TabList className="nav nav-tabs dark:border-jacarta-600 border-jacarta-100 mb-12 flex items-center justify-center border-b">
              {collectionItemsTabs.map(({ id, text, icon }) => {
                return (
                  <Tab
                    className="nav-item"
                    key={id}
                    onClick={() => setItemsTabs(id)}>
                    <button
                      className={
                        itemsTabs === id
                          ? "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                          : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                      }>
                      <svg className="icon icon-items mr-1 h-5 w-5 fill-current">
                        <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                      </svg>
                      <span className="font-display text-base font-medium">
                        {text}
                      </span>
                    </button>
                  </Tab>
                );
              })}
            </TabList>

            <TabPanel>
              <div>
                <FilterCategoryItem nfts={nfts} collection={collection} />
              </div>
            </TabPanel>
            <TabPanel>
              <Activity_item nfts={nfts} />
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default MyNFTContainer;
