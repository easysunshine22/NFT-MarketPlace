import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Meta from "../../components/Meta";
import { Metamask_comp_login } from "../../components/metamask/Metamask";
import { useRouter } from "next/router";
// thirdweb
import {
  useAddress,
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
} from "@thirdweb-dev/react";

const Login = () => {
  const address = useAddress();
  const router = useRouter();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithMetamask = useMetamask();

  useEffect(() => {
    if (address) {
      router.push("/");
    }
  }, [address]);

  return (
    <div>
      <Meta title="Login || Artlux  NFT Marketplace " />
      {/* <!-- Login --> */}
      <section className="relative h-screen">
        <div className="lg:flex lg:h-full">
          {/* <!-- Left --> */}
          <div className="relative text-center lg:w-1/2">
            <img
              src="/images/login.jpg"
              alt="login"
              className="absolute h-full w-full object-cover"
            />
            {/* <!-- Logo --> */}
            <Link href="/">
              <a className="relative inline-block py-36">
                <img
                  src="/images/logo_white.png"
                  className="inline-block max-h-7"
                  alt="Ayris.Dev | NFT Marketplace"
                />
              </a>
            </Link>
          </div>

          {/* <!-- Right --> */}
          <div className="relative flex items-center justify-center p-[10%] lg:w-1/2">
            <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
              <img
                src="/images/gradient_light.jpg"
                alt="gradient"
                className="h-full w-full"
              />
            </picture>

            <div className="w-full max-w-[25.625rem] text-center">
              <h1 className="text-jacarta-700 font-display mb-6 text-4xl dark:text-white">
                Sign in
              </h1>
              <p className="dark:text-jacarta-300 mb-10 text-lg leading-normal">
                Choose one of available wallet providers or create a new wallet.
                <a href="#" className="text-accent">
                  What is a wallet?
                </a>
              </p>

              {/* <!-- Tabs Nav --> */}
              <Tabs className="tabs ">
                {/* <!-- Ethereum --> */}
                <TabPanel>
                  <div className="tab-pane fade show active">
                    <button
                      onClick={connectWithMetamask}
                      className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 dark:hover:bg-accent hover:bg-accent text-jacarta-700 mb-4 flex w-full items-center justify-center rounded-full border-2 bg-white py-4 px-8 text-center font-semibold transition-all hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent">
                      <img
                        src="/images/wallets/metamask_24.svg"
                        className="mr-2.5 inline-block h-6 w-6"
                        alt=""
                      />
                      <span>Metamask</span>
                    </button>

                    <button
                      onClick={connectWithCoinbaseWallet}
                      className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 dark:hover:bg-accent hover:bg-accent text-jacarta-700 mb-4 flex w-full items-center justify-center rounded-full border-2 bg-white py-4 px-8 text-center font-semibold transition-all hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent">
                      <img
                        src="/images/wallets/torus_24.svg"
                        className="mr-2.5 inline-block h-6 w-6"
                        alt=""
                      />
                      <span>Coinbase Wallet</span>
                    </button>

                    <button
                      onClick={connectWithWalletConnect}
                      className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 dark:hover:bg-accent hover:bg-accent text-jacarta-700 mb-4 flex w-full items-center justify-center rounded-full border-2 bg-white py-4 px-8 text-center font-semibold transition-all hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent">
                      <img
                        src="/images/wallets/wallet_connect_24.svg"
                        className="mr-2.5 inline-block h-6 w-6"
                        alt=""
                      />
                      <span>Mobile Wallet</span>
                    </button>
                    {/* 
                    <button className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 dark:hover:bg-accent hover:bg-accent text-jacarta-700 mb-4 flex w-full items-center justify-center rounded-full border-2 bg-white py-4 px-8 text-center font-semibold transition-all hover:border-transparent hover:text-white dark:text-white dark:hover:border-transparent">
                      <span>Show more options</span>
                    </button> <!-- Ethereum end --> */}
                  </div>
                </TabPanel>

                {/* <!-- Torus --> */}
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end login --> */}
    </div>
  );
};

export default Login;
