import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Meta from "../../components/Meta";
import Link from "next/link";
import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
const CreateCollectionPage = () => {
  const address = useAddress();
  return (
    <div>
      <Meta title="Create || Artlux  NFT Marketplace " />
      {/* <!-- Create --> */}
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        {!address ? (
          <>
            <div className="mx-auto max-w-[48.125rem]">
              <div className="container">
                <h1 className="font-display text-jacarta-700 pt-16 pb-4 text-center text-4xl font-medium dark:text-white">
                  Connect wallet
                </h1>
                <p className="dark:text-jacarta-300 text-2xs mb-3 flex text-center justify-center ">
                  Please connect your blockchain wallet to see this page
                </p>
                {/* <!-- Connect Wallet --> */}
                <div className="my-6">
                  <ConnectWallet
                    accentColor="#d1d5db"
                    colorMode="light"
                    auth={{
                      loginConfig: {
                        // The URL to redirect to on login.
                        redirectTo: "/",
                        // Function to run on error.
                      },
                      // If you want users to sign in after connecting their wallet
                      loginOptional: true,
                      loginOptions: {
                        chainId: process.env.NEXT_PUBLIC_CHAINID,
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="container">
            <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white"></h1>

            <div className="mx-auto max-w-[48.125rem]">
              {/* <!-- File Upload --> */}
              <div className="mb-6">
                <label className="font-display text-3xl text-jacarta-700 mb-2 block dark:text-white">
                  Choose Type
                  <span className="text-red">*</span>
                </label>
                <p className="dark:text-jacarta-300 text-2xs mb-12">
                  Choose “Single” for one of a kind or “Multiple” if you want to
                  sell one collectible multiple times
                </p>

                <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex  s:flex-col sx:flex-row items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                  <Link href="/collection/erc-721" className="cursor-pointer">
                    <div className="h-44 w-32 bg-gray-100 rounded-xl flex flex-col justify-center shadow duration-300 hover:bg-white hover:shadow-xl mx-16">
                      <img
                        src="/images/266f63b07dfa0c7a232b.png"
                        className="h-32"
                      />
                      <span className="mt-6 text-sm ?leading-5 font-semibold text-center">
                        Singe Items
                      </span>
                    </div>
                  </Link>
                  <Link href="/collection/erc-1155">
                    <div className="h-44 w-32 bg-gray-100 rounded-xl flex flex-col justify-center shadow duration-300 hover:bg-white hover:shadow-xl  mx-16">
                      <img
                        src="/images/715e004b0e940213d5a0.png"
                        className="h-32"
                      />
                      <span className="mt-6 text-sm ?leading-5 font-semibold text-center">
                        Multiple Items
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      {/* <!-- end create --> */}
    </div>
  );
};

export default CreateCollectionPage;
