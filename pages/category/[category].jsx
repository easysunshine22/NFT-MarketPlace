/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Meta from "../../components/Meta";

const Category = () => {
  const router = useRouter();
  const { collectionId } = router.query;
  return (
    <>
      <Meta title="Explore Collection || Artlux  NFT Marketplace " />
      <section className="relative mt-24 lg:pb-48 pb-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full"
          />
        </picture>
        <div>{collectionId}</div>
      </section>
    </>
  );
};

export default Category;
