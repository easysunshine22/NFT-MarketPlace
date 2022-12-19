import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { bidsModalHide } from "../../redux/counterSlice";
import {
  useContract,
  useNetwork,
  Web3Button,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import {
  ChainId,
  NATIVE_TOKEN_ADDRESS,
  TransactionResult,
} from "@thirdweb-dev/sdk";

const BidsModal = ({ nftCollection, tokenId }) => {
  const router = useRouter();
  const { bidsModal } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [ETHAmount, setETHAmount] = useState(0.05);
  const tokenIds = router.query.item;
  const collectionAddress = router.query.address;

  const handleEThAmount = (e) => {
    e.preventDefault();
    setETHAmount(e.target.value);
  };

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  // Connect to our marketplace contract via the useContract hook
  const { contract: marketplace } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, // Your marketplace contract address here
    "marketplace"
  );

  const tokenAddress = process.env.NEXT_PUBLIC_ARTLUX_TOKEN_ADDRESS;

  async function createDirectListing() {
    try {
      const transaction = await marketplace?.direct.createListing({
        assetContractAddress: collectionAddress, // Contract Address of the NFT
        buyoutPricePerToken: ETHAmount, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: tokenAddress, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        startTimestamp: new Date(0), // When the listing will start
        tokenId: tokenIds, // Token ID of the NFT.
      });

      return transaction;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className={bidsModal ? "modal fade show block" : "modal fade"}>
        <div className="modal-dialog max-w-2xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="placeBidLabel">
                Place a bid
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(bidsModalHide())}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-jacarta-700 h-6 w-6 dark:fill-white">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                </svg>
              </button>
            </div>

            {/* <!-- Body --> */}
            <div className="modal-body p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-jacarta-700 text-sm font-semibold dark:text-white">
                  Price
                </span>
              </div>

              <div className="dark:border-jacarta-600 border-jacarta-100 relative mb-2 flex items-center overflow-hidden rounded-lg border">
                <div className="border-jacarta-100 bg-jacarta-50 flex flex-1 items-center self-stretch border-r px-2">
                  <span>
                    <svg className="icon icon-ETH mr-1 h-5 w-5">
                      <use xlinkHref="/icons.svg#icon-ETH"></use>
                    </svg>
                  </span>
                  <span className="font-display text-jacarta-700 text-sm">
                    ETH
                  </span>
                </div>

                <input
                  type="number"
                  className="focus:ring-accent h-12 w-full flex-[3] border-0 focus:ring-inse dark:text-jacarta-700"
                  placeholder="Amount"
                  value={ETHAmount}
                  onChange={(e) => handleEThAmount(e)}
                />

                <div className="bg-jacarta-50 border-jacarta-100 flex flex-1 justify-end self-stretch border-l dark:text-jacarta-700">
                  <span className="self-center px-2 text-sm">$130.82</span>
                </div>
              </div>

              <div className="text-right">
                <span className="dark:text-jacarta-400 text-sm">
                  Balance: 0.0000 WETH
                </span>
              </div>

              {/* <!-- Terms --> */}
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="checked:bg-accent dark:bg-jacarta-600 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                />
                <label
                  htmlFor="terms"
                  className="dark:text-jacarta-200 text-sm">
                  By checking this box, I agree to {"Ayris.Dev's"}{" "}
                  <a href="#" className="text-accent">
                    Terms of Service
                  </a>
                </label>
              </div>
            </div>
            {/* <!-- end body --> */}

            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => createDirectListing()}
                  type="button"
                  className="bg-accent shadow-accent-volume hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all">
                  Place Bid
                </button>
                <Web3Button
                  contractAddress="0x86215C27fe82B493f9778363A54631218Cafe70E"
                  action={() => createDirectListing()}>
                  Mint NFT With Artlux Collection
                </Web3Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidsModal;
