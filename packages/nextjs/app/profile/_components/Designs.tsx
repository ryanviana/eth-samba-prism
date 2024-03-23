"use client";

import React, { useEffect, useState } from "react";
import NFTCard from "../../../components/NFTCard";
import designApi, { Design } from "../../../utils/designApi";

const Designs = () => {
  const [designs, setDesigns] = useState<Design[]>([]);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const allDesigns = await designApi.getDesigns();
        // Randomly pick 4 designs from the fetched designs
        const shuffled = allDesigns.sort(() => 0.5 - Math.random());
        setDesigns(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch designs:", error);
      }
    };

    fetchDesigns();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-col items-start sm:w-[70%] w-full sm:px-0 px-4 py-10">
        <h1 className="text-3xl sm:text-4xl text-gradient pb-4">My Designs (NFTs)</h1>
        <div className="justify-between items-center flex flex-grow flex-col p-8 gap-4 bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col p-5 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center items-start">
            {designs.map(design => (
              <NFTCard
                key={design._id}
                nftItem={{
                  id: design._id,
                  image: `data:image/jpeg;base64,${Buffer.from(design.image.data).toString("base64")}`,
                  name: design.image_hash, // Assuming `image_hash` is what you'd like to display as the name
                  likes: 10, // Placeholder for likes; adjust according to your data model or if likes are available
                  // Include other properties as needed by your NFTCard component
                }}
                title="Design Collection" // Adjust the title as necessary
                listings={[]} // Adjust or remove if not applicable
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Designs;
