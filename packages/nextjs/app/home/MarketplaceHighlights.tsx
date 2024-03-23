import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NFTCard from "../../components/NFTCard";
import designApi, { Design } from "../../utils/designApi";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const MarketplaceHighlights: React.FC = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const fetchedDesigns = await designApi.getDesigns();
        const latestDesigns = fetchedDesigns.reverse().slice(0, 5);
        setDesigns(latestDesigns);
      } catch (error) {
        console.error("Failed to fetch designs:", error);
      }
    };

    fetchDesigns();
  }, []);

  const handleViewAll = () => {
    router.push("/marketplace");
  };

  return (
    <div className="py-20">
      <div className="flex flex-grow flex-col items-start justify-start">
        <h1 className="text-3xl sm:text-5xl">Latest Collections</h1>
        <div className="flex items-center justify-between w-full my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 justify-center items-center">
            {designs.map(design => (
              <NFTCard
                key={design._id}
                nftItem={{
                  id: design._id,
                  image: `data:image/jpeg;base64,${Buffer.from(design.image.data).toString("base64")}`,
                  name: design.prompt, // Assuming you want to display the hash as the name
                  likes: 10, // Placeholder for likes, adjust as necessary
                }}
                title="Latest Collection"
                listings={[]} // Assuming this prop is needed for NFTCard, adjust as necessary
              />
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-2 ml-10">
            <button
              className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
              onClick={handleViewAll}
            >
              View All
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHighlights;
