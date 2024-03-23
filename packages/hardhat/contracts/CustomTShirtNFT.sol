// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IUSDT.sol";

contract CustomTShirtNFT is ERC721URIStorage, Ownable {
    uint256 public _currentTokenId = 0;

    address public user;
    address public usdtToken;

    constructor(address _user, string memory name, string memory symbol) ERC721(name, symbol) Ownable(tx.origin) {
        user = _user;
        usdtToken = 0xe4A658e9935159e3765D30084c3cC2f7F6968fED; //ALTERAR
    }

    function _mintTo(string memory uri) public onlyUser returns (uint256) {
        uint256 newItemId = _currentTokenId++;
        _mint(tx.origin, newItemId);
        _setTokenURI(newItemId, uri);
        return newItemId;
    }

    function _buyTShirt(uint _price) public {
        require(IUSDT(usdtToken).transferFrom(tx.origin, address(this), _price * 10 ** IUSDT(usdtToken).decimals()), "USDT transfer failed");
    }

    // Function to withdraw USDT from the contract (for admin)
    function _withdrawUSDT() public onlyUser returns (bool) {
        uint256 amount = IERC20(usdtToken).balanceOf(address(this));

        IERC20(usdtToken).transfer(msg.sender, amount);

        return true;
    }

    modifier onlyUser() {
        require(tx.origin == user, "Only user allowed");
        _;
    }

}
