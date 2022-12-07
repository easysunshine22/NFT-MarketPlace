import React, { useContext, useState, useEffect } from "react";
import Header from "./header/Header";
import Footer from "./footer";
import Wallet_modal from "./modal/wallet_modal";
import BidsModal from "./modal/bidsModal";
import BuyModal from "./modal/buyModal";
import Image from "next/image";
// ThirdWeb
// import { useWeb3 } from "@3rdweb/hooks";
import {
  useAddress,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
  ConnectWallet,
} from "@thirdweb-dev/react";

// sanity
import { client } from "../lib/sanityClient";
// Toaster
import toast, { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  // const { address, connectWallet } = useWeb3();
  const connectWithMetamask = useMetamask();

  const address = useAddress();
  console.log(address);

  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(`Welcome back ${userName}!`, {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

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
      welcomeUser(result.userName);
    })();
  }, [address]);
  (() => console.log("user created"))();

  return (
    <div>
      <Header />
      <Wallet_modal />
      <BidsModal />
      <BuyModal />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
