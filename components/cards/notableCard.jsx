import React, { useEffect, useState } from "react";
import Link from "next/link";
const NotableCard = ({ title, logo, banner }) => {
  return (
    <article>
      <Link href={`/collection/${title}`}>
        <div class="single-collection-slide">
          <img
            class="collection-thumb"
            src="/images/notable-collections/1.png"
            alt=""
          />
          <div class="single-collection-slide-description">
            <img src="/images/s.png" alt="" />
            <h3>The Sandbox California</h3>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default NotableCard;
