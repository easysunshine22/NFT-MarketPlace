import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Confirm_checkout } from "../metamask/Metamask";

export default function BuyNftModal({ setOpenModal }) {
  // Thirdweb

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Complete checkout</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}>
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="modal-body p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-jacarta-700 text-sm font-semibold dark:text-white">
                  Item
                </span>
                <span className="font-display text-jacarta-700 text-sm font-semibold dark:text-white">
                  Subtotal
                </span>
              </div>

              <div className="dark:border-jacarta-600 border-jacarta-100 relative flex items-center border-t border-b py-4">
                <figure className="mr-5 self-start">
                  <img
                    src="/images/avatars/avatar_2.jpg"
                    alt="avatar 2"
                    className="rounded-2lg"
                    loading="lazy"
                  />
                </figure>

                <div>
                  <a href="collection.html" className="text-accent text-sm"></a>
                  <h3 className="font-display text-jacarta-700 mb-1 text-base font-semibold dark:text-white">
                    Lazyone Panda
                  </h3>
                  <div className="flex flex-wrap items-center">
                    <span className="dark:text-jacarta-300 text-jacarta-500 mr-1 block text-sm">
                      Creator Earnings: 5%
                    </span>
                    <span data-tippy-content="The creator of this collection will receive 5% of the sale total from future sales of this item.">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="dark:fill-jacarta-300 fill-jacarta-700 h-4 w-4">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="ml-auto">
                  <span className="mb-1 flex items-center whitespace-nowrap">
                    <span data-tippy-content="ETH">
                      <svg className="h-4 w-4">
                        <use xlinkHref="/icons.svg#icon-ETH"></use>
                      </svg>
                    </span>
                    <span className="dark:text-jacarta-100 text-sm font-medium tracking-tight"></span>
                  </span>
                  <div className="dark:text-jacarta-300 text-right text-sm"></div>
                </div>
              </div>

              {/* <!-- Total --> */}
              <div className="dark:border-jacarta-600 border-jacarta-100 mb-2 flex items-center justify-between border-b py-2.5">
                <span className="font-display text-jacarta-700 hover:text-accent font-semibold dark:text-white">
                  Total
                </span>
                <div className="ml-auto">
                  <span className="flex items-center whitespace-nowrap">
                    <span data-tippy-content="ETH">
                      <svg className="h-4 w-4">
                        <use xlinkHref="/icons.svg#icon-ETH"></use>
                      </svg>
                    </span>
                    <span className="text-green font-medium tracking-tight">
                      1.55 ETH
                    </span>
                  </span>
                  <div className="dark:text-jacarta-300 text-right">
                    $130.82
                  </div>
                </div>
              </div>

              {/* <!-- Terms --> */}
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="buyNowTerms"
                  className="checked:bg-accent dark:bg-jacarta-600 text-accent border-jacarta-200 focus:ring-accent/20 dark:border-jacarta-500 h-5 w-5 self-start rounded focus:ring-offset-0"
                />
                <label
                  htmlFor="buyNowTerms"
                  className="dark:text-jacarta-200 text-sm">
                  By checking this box, I agree to {"Ayris.Dev's"}{" "}
                  <Link href="/tarms">
                    <a className="text-accent">Terms of Service</a>
                  </Link>
                </label>
              </div>
            </div>
            {/*footer*/}
            <div className="modal-footer">
              <div className="flex items-center justify-center space-x-4">
                Confirm CheckOut
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
