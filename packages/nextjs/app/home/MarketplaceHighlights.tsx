import React from "react";
import { useRouter } from "next/navigation";
import NFTCard from "../../components/NFTCard";
import { mockNFTs } from "../../utils/mockNFTs";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface NFTItem {
  id: string;
  image: string;
  name: string;
  likes: number;
  price: string;
  isListed: boolean;
}

const MarketplaceHighlights: React.FC = () => {
  const latestNFTs: NFTItem[] = [...mockNFTs].reverse().slice(0, 5);

  const router = useRouter();

  const handleViewAll = () => {
    return () => {
      router.push("/marketplace");
    };
  };

  return (
    <div className="py-20">
      <div className="flex flex-grow flex-col items-start justify-start">
        <h1 className="text-3xl sm:text-5xl">Latest Collections</h1>
        <div className="flex items-center justify-between w-full my-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 justify-center items-center">
            {latestNFTs.map((nft: NFTItem) => (
              <NFTCard key={nft.id} nftItem={nft} title="Latest Collection" listings={[]} />
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-2 ml-10">
            <button
              className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
              onClick={handleViewAll()}
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
