import React from "react";
import BannerArea from "./Banner/artluxBanner";
import Table from "./Table/artluxTable";
import NotCollection from "./NotableCollection/notCollection";
import BrowseCat from "./BrowseCategory/browseCat";
import Foot from "./Footer/foot";
import Hero from "../hero/hero";
const FrontPage = ({ listings, collectionList, categoryList }) => {
  return (
    <>
      <BannerArea listings={listings} collectionList={collectionList} />
      <Table collectionList={collectionList} />
      <NotCollection collectionList={collectionList} />
      <BrowseCat categoryList={categoryList} />
    </>
  );
};

export default FrontPage;
