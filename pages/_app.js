import "../styles/globals.css";
import "../styles/style.css";
import "../styles/responsive.css";
import "../styles/slick.css";
import "../styles/slick-theme.css";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useRouter } from "next/router";
import { MetaMaskProvider } from "metamask-react";
import Meta from "../components/Meta";
import UserContext from "../components/UserContext";
import { useEffect, useRef } from "react";
// import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import {
  ChainId,
  ThirdwebProvider,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import * as dotenv from "dotenv";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pid = router.asPath;
  const scrollRef = useRef({
    scrollPos: 0,
  });

  return (
    <>
      <Meta title="Artlux  NFT Marketplace " />

      <Provider store={store}>
        <ThemeProvider enableSystem={true} attribute="class">
          <MetaMaskProvider>
            <ThirdwebProvider
              desiredChainId={ChainId.BinanceSmartChainTestnet}
              authConfig={{
                domain: process.env.NEXT_PUBLIC_DOMAIN,
                authUrl: "/api/auth",
              }}
              autoConnect="true"
              chainRPC={{
                [ChainId.BinanceSmartChainTestnet]:
                  process.env.NEXT_PUBLIC_RPC_URL,
              }}>
              <UserContext.Provider value={{ scrollRef: scrollRef }}>
                {pid === "/login" ? (
                  <Component {...pageProps} />
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </UserContext.Provider>
            </ThirdwebProvider>
          </MetaMaskProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
