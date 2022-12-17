import React from "react";
import BannerArea from "./Banner/artluxBanner";
import Table from "./Table/artluxTable";
import NotCollection from "./NotableCollection/notCollection";
import BrowseCat from "./BrowseCategory/browseCat";
import Foot from "./Footer/foot";
const FrontPage = ({ collectionItem }) => {
  return (
    <>
      <BannerArea collectionItem={collectionItem} />
      <Table />
      <NotCollection />
      <BrowseCat />

      <Foot />
    </>
  );
};

export default FrontPage;
