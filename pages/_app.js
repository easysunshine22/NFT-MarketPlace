import "../styles/globals.css";

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

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pid = router.asPath;
  const scrollRef = useRef({
    scrollPos: 0,
  });

  useEffect(() => {
    // if (pid === '/home/home_8') {
    // 	const html = document.querySelector('html');
    // 	html.classList.remove('light');
    // 	html.classList.add('dark');
    // }
  }, []);

  return (
    <>
      <Meta title="Artlux  NFT Marketplace " />

      <Provider store={store}>
        <ThemeProvider enableSystem={true} attribute="class">
          <MetaMaskProvider>
            <ThirdwebProvider
              desiredChainId={ChainId.BinanceSmartChainTestnet}
              chainRPC={{
                [ChainId.BinanceSmartChainTestnet]:
                  "https://data-seed-prebsc-1-s3.binance.org:8545	",
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
