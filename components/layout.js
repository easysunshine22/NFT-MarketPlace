import React, { useContext, useEffect } from "react";
import Navbar from "./navbar";
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
      {address ? (
        <div>
          <Navbar />
          <Wallet_modal />
          <BidsModal />
          <BuyModal />
          <main>{children}</main>
          <Footer />
        </div>
      ) : (
        <section class="flex flex-col justify-center antialiased bg-jacarta-500 text-gray-600 min-h-screen p-4">
          <div class="h-full">
            <div class="max-w-[360px] mx-auto">
              <div class="bg-white shadow-lg rounded-lg mt-9">
                <header class="text-center px-5 pb-5">
                  <img
                    class="inline-flex  w-[144px] h-[144px] fill-current rounded-full box-content shadow mb-3"
                    src="/artlux.png"
                  />

                  <h3 class="text-xl font-bold text-gray-900 mb-1">
                    Please Connect Your Wallet
                  </h3>
                  <div class="text-sm font-medium text-gray-500"></div>
                </header>

                <div class="bg-gray-100 text-center px-5 py-6">
                  <div class="text-sm mb-6">
                    <strong class="font-semibold"></strong>
                  </div>
                  <form class="space-y-3">
                    <ConnectWallet />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
