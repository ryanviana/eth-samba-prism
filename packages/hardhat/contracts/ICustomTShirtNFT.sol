// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICustomTShirtNFT {
    function mintTo(address recipient, string memory uri) external returns (uint256);
}
