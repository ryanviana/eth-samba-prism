"use client";

import Link from "next/link";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ActionSections = () => {
  return (
    <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
      <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
        <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
          <BugAntIcon className="h-8 w-8 fill-secondary" />
          <p>
            Tinker with your smart contract using the{" "}
            <Link href="/debug" passHref className="link">
              Debug Contracts
            </Link>{" "}
            tab.
          </p>
        </div>
        <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
          <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
          <p>
            Explore your local transactions with the{" "}
            <Link href="/blockexplorer" passHref className="link">
              Block Explorer
            </Link>{" "}
            tab.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActionSections;
