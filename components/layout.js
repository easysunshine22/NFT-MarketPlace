import React, { useContext, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Wallet_modal from "./modal/wallet_modal";
import BidsModal from "./modal/bidsModal";
import BuyModal from "./modal/buyModal";
// ThirdWeb
// import { useWeb3 } from "@3rdweb/hooks";
import {
  useAddress,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
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
        <div>
          {" "}
          <div className="modal-dialog max-w-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="walletModalLabel">
                  Connect your wallet
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => dispatch(walletModalhide())}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-700 h-6 w-6 dark:fill-white">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                  </svg>
                </button>
              </div>

              {/* <!-- Body --> */}
              <div className="modal-body p-6 text-center">
                <svg className="icon icon-metamask mb-4 inline-block h-8 w-8">
                  <use xlinkHref="/icons.svg#icon-metamask"></use>
                </svg>
                <p className="text-center dark:text-white">
                  You {"don't"} have MetaMask in your browser, please download
                  it from
                  <a
                    href="https://metamask.io/"
                    className="text-accent"
                    target="_blank"
                    rel="noreferrer noopener">
                    MetaMask
                  </a>
                </p>
              </div>
              {/* <!-- end body --> */}

              <div className="modal-footer">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => connectWithMetamask()}
                    className="bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
