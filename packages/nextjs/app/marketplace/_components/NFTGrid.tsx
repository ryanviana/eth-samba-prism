"use client";

import React, { useEffect, useState } from "react";
import NFTCard from "../../../components/NFTCard";
import designApi, { Design } from "../../../utils/designApi";

const NFTGrid = () => {
  const [designs, setDesigns] = useState<Design[]>([]);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const fetchedDesigns = await designApi.getDesigns();
        setDesigns(fetchedDesigns); // Here, you don't limit the designs
      } catch (error) {
        console.error("Failed to fetch designs:", error);
      }
    };

    fetchDesigns();
  }, []);

  // Helper function to convert image data to base64 string
  const imageToBase64 = (imageData: number[]) => {
    return btoa(String.fromCharCode(...new Uint8Array(imageData)));
  };

  return (
    <div className="flex flex-col justify-between items-center w-full py-4 px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-start">
        {designs.map(design => (
          <NFTCard
            key={design._id}
            nftItem={{
              id: design._id,
              // Assuming your `designApi` adjusts `image.data` to be directly usable
              // Or use the `imageToBase64` function if needed
              image: `data:image/jpeg;base64,${imageToBase64(design.image.data)}`,
              name: design.image_hash, // Or another property that suits your data model
              likes: 10, // Placeholder for likes, adjust as necessary
              // Additional properties as needed
            }}
            title="Design Collection" // Adjust title as needed
            listings={[]} // Placeholder, adjust according to your component's props
          />
        ))}
      </div>
    </div>
  );
};

export default NFTGrid;
