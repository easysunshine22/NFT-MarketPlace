import React, { useEffect, useState } from "react";
import useDarkMode from "../lib/useDarkmode";
import Wallet_modal from "./modal/wallet_modal";
import BidsModal from "./modal/bidsModal";
import BuyModal from "./modal/buyModal";
import Image from "next/image";
import NavHed from "./artlux/NavHead/NavHed";
import Foot from "./artlux/Footer/foot";
// ThirdWeb
// import { useWeb3 } from "@3rdweb/hooks";
import {
  useAddress,
  useActiveListings,
  useContract,
} from "@thirdweb-dev/react";

// sanity
import { client } from "../lib/sanityClient";
import { light } from "@mui/material/styles/createPalette";

export default function Layout({ children }) {
  // const { address, connectWallet } = useWeb3();

  const [colorTheme, setTheme] = useDarkMode();
  const [userAddress, setUserAddress] = useState();

  const { contract: marketplace } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, // Your marketplace contract address here
    "marketplace"
  );
  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);

  const address = useAddress();

  useEffect(() => {
    if (!address) return;
    (async () => {
      const userDoc = {
        _type: "users",
        _id: address,
        userName: "Unnamed",
        walletAddress: address,
        twitterHandle: "Twitter Address",
        bio: "Bio",
        igHandle: "Instagram Address",
        webHandle: "WebSite Address",
        emailAddress: "Email Address",
      };
      const result = await client.createIfNotExists(userDoc);

      localStorage.setItem("userAddress", address);
    })();
  }, [address]);

  useEffect(() => {
    if (colorTheme === "light") return;
    (async () => {
      setTheme("light");
    })();
  }, [colorTheme]);

  return (
    <div>
      <NavHed />
      <Wallet_modal />
      <BidsModal />
      <BuyModal />
      <main>{children}</main>
      <Foot />
    </div>
  );
}
