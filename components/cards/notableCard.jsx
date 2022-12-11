import React, { useEffect, useState } from "react";
import Link from "next/link";
const NotableCard = ({ title, logo, banner }) => {
  return (
    <article>
      <Link href={`/collection/${title}`}>
        <div className="bg-gray-400 antialiased text-gray-900">
          <img
            src={banner ? banner : "/images/collections/collection_1_1.jpg"}
            alt=" random imgee"
            className="sm:h-[500px] s:h-[250px] w-full object-fill rounded-lg"
          />
          <div>
            <div className="relative px-6 -mt-20  ">
              <div className="flex mx-auto items-center justify-center -mb-[32px] ">
                <img
                  src={logo ? logo : "/images/collections/collection_1_1.jpg"}
                  className="rounded-full border-white border-[4px] shadow-lg shadow-jacarta-500/50 w-[64px]  h-[64px]"
                />
              </div>
              <div className="bg-white  p-6 rounded-lg shadow-lg shadow-jacarta-500/50">
                <h4 className=" font-bold s:text-[14px]  uppercase leading-tight text-center mt-5">
                  {title}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default NotableCard;
