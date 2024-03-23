// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomTShirtNFT is ERC721URIStorage, Ownable {
    uint256 public _currentTokenId = 0;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mintTo(address recipient, string memory uri) public onlyOwner returns (uint256) {
        uint256 newItemId = _currentTokenId++;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, uri);
        return newItemId;
    }
}
