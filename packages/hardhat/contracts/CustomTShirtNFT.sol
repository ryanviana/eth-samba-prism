// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IUSDT.sol";

contract CustomTShirtNFT is ERC721URIStorage {
    uint256 public _currentTokenId = 0;
    address public user;
    address public usdtToken;

    constructor(address _user) ERC721("The Prism", "PRISM") {
        user = _user;
        usdtToken = 0x9c4BD6453BdbA9E58F4A881A2C6BB0683EdcA0B9;
    }

    /**
     * @dev Mints a new NFT to the caller's address with a specified design.
     * @param uri The URI pointing to the NFT metadata.
     * @return newItemId The ID of the newly minted NFT.
     * 
     * This function can only be called by the designated user. It increments the current token ID,
     * mints a new token to the caller's address, and sets the provided URI as the token's metadata.
     */
    function _mintTo(string memory uri) public onlyUser returns (uint256) {
        uint256 newItemId = _currentTokenId++;
        _mint(tx.origin, newItemId);
        _setTokenURI(newItemId, uri);
        return newItemId;
    }

    /**
     * @dev Purchases a T-Shirt, using USDT.
     * @param _price The price of the T-Shirt in USDT (two decimals. E.g US$40 -> 4000).
     * @param _producer The address of the T-Shirt producer to receive a portion of the payment (5% royalties).
     * @return bool Returns true upon successful purchase.
     * 
     * This function transfers USDT from the buyer to the contract and the producer.
     * 95% of the price is sent to the contract, and 5% is sent to the producer.
     * Requires that the transfer of USDT from the buyer is successful.
     */
    function _buyTShirt(uint _price, address _producer) public returns (bool) {
        require(IUSDT(usdtToken).transferFrom(tx.origin, address(this), (_price * 95/100) * 10 ** 4), "USDT transfer failed");
        require(IUSDT(usdtToken).transferFrom(tx.origin, _producer, (_price * 5/100) * 10 ** 4), "USDT transfer failed");

        return true;
    }

    /**
     * @dev Withdraws all profit from your designs royalties.
     * @return bool Returns true upon successful withdrawal.
     * 
     * This function can only be called by the designated user. It checks the contract's balance of USDT and
     * transfers the entire amount to the caller's address.
     */
    function _withdrawUSDT() public onlyUser returns (bool) {
        uint256 amount = IERC20(usdtToken).balanceOf(address(this));
        IERC20(usdtToken).transfer(msg.sender, amount);

        return true;
    }

    /**
     * @dev Modifier that restricts function access to only the designated user.
     * 
     * This modifier checks that the transaction origin is the user address stored in the contract
     * and reverts if called by any other address.
     */
    modifier onlyUser() {
        require(tx.origin == user, "Only user allowed");
        _;
    }
}