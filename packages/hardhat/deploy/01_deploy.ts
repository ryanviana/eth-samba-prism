import { ethers } from "hardhat";

async function main() {
  // Deploy USDT
  const USDT = await ethers.getContractFactory("USDT");
  const usdt = await USDT.deploy();
  await usdt.deployed();
  console.log(`USDT deployed to ${usdt.address}`);
  console.log(`Block explorer URL: https://sepolia.scrollscan.com/address/${usdt.address}`);

  // Deploy NFTFactory
  const NFTFactory = await ethers.getContractFactory("NFTFactory");
  const nftFactory = await NFTFactory.deploy();
  await nftFactory.deployed();
  console.log(`NFTFactory deployed to ${nftFactory.address}`);
  console.log(`Block explorer URL: https://sepolia.scrollscan.com/address/${nftFactory.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
