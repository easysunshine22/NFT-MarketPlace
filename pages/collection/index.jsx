import React, { useState, useEffect } from "react";
import Meta from "../../components/Meta";
import HeadCollection from "../../components/artlux/myCollection/headCollection";
import MyCards from "../../components/artlux/myCollection/myCollectionCard";
import { useRouter } from "next/router";

//sanity
import { client } from "../../lib/sanityClient";
// thirdweb
import { useAddress } from "@thirdweb-dev/react";

const CollectionMy = () => {
  const address = useAddress();
  const router = useRouter();
  console.log(address, "🔥");
  const [collection, setCollection] = useState({});

  console.log(address, "🔥");
  // Sanity
  const fetchCollectionData = async (sanityClient = client) => {
    const query = `*[_type == "collections" && createdBy._ref == "${address}" ] {
       "logoImageUrl": logoImage.asset->url,
       "bannerImageUrl": bannerImage.asset->url,
       "featuredImageUrl": featuredImage.asset->url,
       volumeTraded,
       createdBy,
        contractAddress,
        creator,
       "createdBy": createdBy->userName,
       title, 
       floorPrice,      
       description
    }`;

    const collectionData = await sanityClient.fetch(query);

    console.log(collectionData, "🔥");

    // the query returns 1 object inside of an array
    await setCollection(collectionData);
  };

  useEffect(() => {
    fetchCollectionData();
  }, [address]);

  // If no session exists, display access denied message

  return (
    <section className="relative lg:pb-48 pb-24">
      {address ? (
        <>
          <Meta title="Create Collection || Ayris.Dev NFT Marketplace" />
          {/* <!-- Create Collection --> */}
          <HeadCollection />

          {collection.length > 0 && <MyCards collection={collection} />}
          {/* <!-- end create --> */}
        </>
      ) : (
        <button>Connect Wallet</button>
      )}
    </section>
  );
};

export default CollectionMy;
