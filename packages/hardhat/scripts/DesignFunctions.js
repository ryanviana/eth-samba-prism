import { ethers } from "ethers";

const backendUrl = "https://the-prism-backend.vercel.app/designs";
const designPrompt = args[0];
const newDesignId = args[1];

const response = await Functions.makeHttpRequest({
  url: backendUrl,
  method: "POST",
  data: {
    prompt: designPrompt,
    designId: newDesignId,
  },
  timeout: 9000,
});

// return Functions.encodeString(response["data"].image_hash);

const encoded = ethers.AbiCoder.defaultAbiCoder().encode(
  ["string", "string"],
  [String(data.prompt), String(data.image_hash)],
);

// return the encoded data as Uint8Array
return ethers.getBytes(encoded);
