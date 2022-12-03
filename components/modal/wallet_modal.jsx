import { display } from "@mui/system";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { walletModalhide } from "../../redux/counterSlice";
import {
  useAddress,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
  ConnectWallet,
} from "@thirdweb-dev/react";

const Wallet_modal = () => {
  const walletModal = useSelector((state) => state.counter.walletModal);
  const dispatch = useDispatch();
  return (
    <div>
      {/* <!-- Wallet Modal --> */}
      <div
        className={
          walletModal ? "block modal fade show " : "modal fade hidden"
        }>
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
              <img
                class="inline-flex  w-[144px] h-[144px] fill-current rounded-full box-content shadow mb-3"
                src="/artlux.png"
              />
              <p className="text-center dark:text-white">
                You are not connected to the network
              </p>
              <a
                className="text-accent"
                target="_blank"
                rel="noreferrer noopener">
                Please connect your wallet to the network
              </a>
            </div>
            {/* <!-- end body --> */}

            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4">
                <ConnectWallet className="bg-jacarta-200 shadow-jacarta-200 hover:bg-accent-dark rounded-full py-3 px-8 text-center font-semibold text-white transition-all" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet_modal;
