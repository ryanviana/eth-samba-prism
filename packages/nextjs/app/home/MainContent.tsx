"use client";

import ArtGenerator from "./ArtGenerator";
import Hero from "./Hero";

const MainContent = () => {
  return (
    <div className="flex sm:flex-row flex-col sm:items-start items-center sm:justify-start justify-start my-20">
      <Hero />
      <ArtGenerator />
    </div>
  );
};

export default MainContent;
