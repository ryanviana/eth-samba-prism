import React, { useState } from "react";
import designApi, { Design } from "../../utils/designApi";

const ArtGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latestDesign, setLatestDesign] = useState<Design | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Create a new design with the provided prompt
      await designApi.createDesign(prompt);
      // After creating, fetch the latest design to update the UI
      const designs = await designApi.getDesigns();
      const newLatestDesign = designs[designs.length - 1];
      setLatestDesign(newLatestDesign);
    } catch (error) {
      console.error("Failed to create or fetch designs", error);
    }
    setLoading(false);
    setShowResult(true);
  };

  // Helper function to convert image data to base64 string
  const imageToBase64 = (imageData: number[]) => {
    return btoa(String.fromCharCode(...new Uint8Array(imageData)));
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
                onChange={e => setPrompt(e.target.value)}
                value={prompt}
              />
            </div>
            <button type="button" onClick={handleSubmit} className="btn btn-secondary btn-sm">
              Create Art ✨
            </button>
          </div>
        </div>
      </div>
      {showResult && (
        <div className="w-full mt-4 flex flex-col items-center gap-4">
          {loading ? (
            <code>Your art is being created...</code>
          ) : latestDesign ? (
            <div className="card w-full bg-base-100 shadow-lg image-full">
              <div className="card-body p-6">
                <div className="flex flex-col items-center card-actions justify-end">
                  <figure>
                    <img
                      src={`data:image/jpeg;base64,${imageToBase64(latestDesign.image.data)}`}
                      alt="Generated Art"
                      style={{ width: "300px", height: "300px" }}
                    />
                  </figure>
                </div>
              </div>
            </div>
          ) : (
            <div>No art generated yet.</div>
          )}
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
