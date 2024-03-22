"use client";

import React from "react";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Hero: React.FC = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex flex-col justify-center items-center px-4">
      <div className="flex flex-col max-w-[600px] items-start justify-start gap-2">
        <h1 className="text-3xl sm:text-5xl">
          Create your unique art. <br /> Make it your own t-shirt.
        </h1>
        <p className="text-left font-light text-lg my-0">
          Make your ideas the art you always dreamed about with our AI tool. <br />
          Then, easily bring those designs to life through expert producers.
        </p>
        <div className="flex justify-center items-center space-x-2">
          <p className="my-2 font-medium">Connected Address:</p>
          <Address address={connectedAddress} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
