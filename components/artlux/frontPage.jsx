import React from "react";
import BannerArea from "./Banner/artluxBanner";
import Table from "./Table/artluxTable";
import NotCollection from "./NotableCollection/notCollection";
import BrowseCat from "./BrowseCategory/browseCat";
import Foot from "./Footer/foot";
import Hero from "../hero/hero";
const FrontPage = ({
  listings,
  collectionList,
  categoryList,
  blockchainList,
}) => {
  return (
    <>
      <BannerArea listings={listings} collectionList={collectionList} />
      <Table
        collectionList={collectionList}
        categoryList={categoryList}
        blockchainList={blockchainList}
      />
      <NotCollection collectionList={collectionList} />
      <BrowseCat categoryList={categoryList} />
    </>
  );
};

export default FrontPage;
