import React from "react";
import BannerArea from "./Banner/artluxBanner";
import Table from "./Table/artluxTable";
import NotCollection from "./NotableCollection/notCollection";
import BrowseCat from "./BrowseCategory/browseCat";
import Foot from "./Footer/foot";
import Hero from "../hero/hero";
const FrontPage = ({ collectionItem }) => {
  return (
    <>
      <Hero />
      <Table />
      <NotCollection />
      <BrowseCat />
    </>
  );
};

export default FrontPage;
