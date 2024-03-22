// Inside packages/nextjs/app/home/ArtGenerator.tsx
import React, { useState } from "react";
import Image from "next/image";

const ArtGenerator: React.FC = () => {
  const [showResult, setShowResult] = useState(false);
  const [art, setArt] = useState(false);
  const [showLoadingText, setShowLoadingText] = useState(true);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowResult(true);
    setShowLoadingText(true);
    setArt(!art);
    setTimeout(() => setShowLoadingText(false), 3000);
  };

  const handleGenerateNFT = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Generate NFT");
  };

  return (
    <div className="flex flex-col sm:min-w-[700px] items-center justify-center sm:px-5 px-2">
      <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col p-5 w-full">
        <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-1">
          <p className="font-medium my-0 break-words">AI Art Generator</p>
          <div className="flex flex-row items-center gap-1.5 w-full">
            <div className="flex border-2 border-base-300 bg-base-200 rounded-full text-accent w-full">
              <input
                className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                placeholder="Describe your art idea"
                name="describe-art-ai"
              />
            </div>
            <button type="button" onClick={handleSubmit} className="btn btn-secondary btn-sm">
              {art ? "Regenerate Art 💫" : "Create Art ✨"}
            </button>
          </div>
        </div>
      </div>
      {showResult && (
        <div className="w-full mt-4 flex flex-col items-center gap-4">
          <div className="card w-full bg-base-100 shadow-lg image-full">
            <div className="card-body">
              {showLoadingText ? (
                <code>Your art is being created...</code>
              ) : (
                <div className="flex flex-col items-center card-actions justify-end">
                  <Image src="path/to/generated/art.png" alt="Generated Art" fill />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end justify-end">
            <button type="button" onClick={handleGenerateNFT} className="btn btn-secondary btn-sm shadow-xl">
              Save & Generate NFT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtGenerator;
