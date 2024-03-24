import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

const source = fs.readFileSync(path.resolve(__dirname, "DesignFunctions.js")).toString();
const router = "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0";

async function main() {
  const DesignFuncions = await ethers.deployContract("DesignFunctions", [router, source]);
  await DesignFuncions.waitForDeployment();
  const designFunctionsAddress = DesignFuncions.target;
  console.log("DesignFuncions deployed to:", designFunctionsAddress);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
