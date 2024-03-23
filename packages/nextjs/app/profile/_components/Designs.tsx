"use client";

import React from "react";
import NFTCard from "../../../components/NFTCard";
import { mockNFTs } from "../../../utils/mockNFTs";

const Designs = () => {
  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-col items-start sm:w-[70%] w-full sm:px-0 px-4 py-10">
        <h1 className="text-3xl sm:text-4xl text-gradient pb-4">My Designs (NFTs)</h1>
        <div className="justify-between items-center flex flex-grow flex-col p-8 gap-4 bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col p-5 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center items-start">
            {mockNFTs.slice(0, 4).map(nft => (
              <NFTCard key={nft.id} nftItem={nft} title="Mock Collection" listings={[]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Designs;
