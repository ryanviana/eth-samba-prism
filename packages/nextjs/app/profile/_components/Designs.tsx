"use client";

import React, { useEffect, useState } from "react";
import NFTCard from "../../../components/NFTCard";
import designApi, { Design } from "../../../utils/designApi";

const Designs = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDesigns = async () => {
      setIsLoading(true); // Start loading
      try {
        const allDesigns = await designApi.getDesigns();
        const shuffled = allDesigns.sort(() => 0.5 - Math.random());
        setDesigns(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch designs:", error);
      }
      setIsLoading(false); // End loading
    };

    fetchDesigns();
  }, []);

  const LoadingPlaceholder = () => (
    <div className="animate-pulse flex flex-wrap justify-center items-center gap-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="w-[14rem] h-[22rem] my-5 mx-5 rounded-2xl bg-gray-300">
          <div className="h-64 bg-gray-300 rounded-lg"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-col items-start sm:w-[70%] w-full sm:px-0 px-4 py-10">
        <h1 className="text-3xl sm:text-4xl text-gradient pb-4">My Designs (NFTs)</h1>
        {isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <div className="justify-between items-center flex flex-grow flex-col p-8 gap-4 bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center items-start">
              {designs.map(design => (
                <NFTCard
                  key={design._id}
                  nftItem={{
                    id: design._id,
                    image: `data:image/jpeg;base64,${Buffer.from(design.image.data).toString("base64")}`,
                    name: design.image_hash,
                    likes: 10,
                  }}
                  title="Design Collection"
                  listings={[]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Designs;
