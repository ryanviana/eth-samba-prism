"use client";

import React from "react";
import NFTCard from "../../../components/NFTCard";
import { mockNFTs } from "../../../utils/mockNFTs";

const NFTGrid = () => {
  return (
    <div className="flex flex-col justify-between items-center w-full py-4 px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-start">
        {mockNFTs.map(nft => (
          <NFTCard key={nft.id} nftItem={nft} title="Mock Collection" listings={[]} />
        ))}
      </div>
    </div>
  );
};

export default NFTGrid;
