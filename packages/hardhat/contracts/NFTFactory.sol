// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CustomTShirtNFT.sol";
import "./ICustomTShirtNFT.sol";

contract NFTFactory {
    CustomTShirtNFT[] public deployedNFTsContracts;
    mapping(address => address) public userToNFTContract;
    mapping(address => bool) public userAlreadyRegistered;

    struct Order {
        address buyer;
        address NFTContract;
        uint itemID;
        uint price;
        address producer;
    }

    Order[] public orders;

    /**
     * @dev Registers a user and creates a new CustomTShirtNFT contract for him.
     * This function should be called once per user for registration. It ideally should include a verification mechanism.
     * It creates a new CustomTShirtNFT contract, stores its address in mappings, and marks the user as registered.
     * @return The address of the newly created CustomTShirtNFT contract.
     */
    function register() public notRegistered returns (address) {
        CustomTShirtNFT newNFT = new CustomTShirtNFT(tx.origin);
        deployedNFTsContracts.push(newNFT);
        userToNFTContract[tx.origin] = address(newNFT);
        userAlreadyRegistered[tx.origin] = true;
        return address(newNFT);
    }

    /**
     * @dev Mints a new NFT with the specified designed to the caller's associated CustomTShirtNFT contract.
     * If the user is not registered, it first registers the user. This function is typically called
     * for creating a new design, invoking the _mintTo function on the user's NFT contract.
     * @param uri The URI of the NFT metadata to mint.
     * @return A boolean value indicating success.
     */
    function mintTo(string memory uri) public returns (bool) {
        if (!userAlreadyRegistered[tx.origin]) {
            register();
        }
        CustomTShirtNFT nft = CustomTShirtNFT(userToNFTContract[tx.origin]);
        nft._mintTo(uri);
        return true;
    }

    /**
     * @dev Facilitates the purchase of a T-shirt (represented as an NFT) by calling the _buyTShirt function
     * on the specified NFT contract, and records the order details.
     * @param _NFTContract The address of the NFT contract from which the T-shirt is being purchased.
     * @param _itemID The ID of the NFT item being purchased.
     * @param _price The price of the T-shirt.
     * @param _producer The address of the T-shirt producer receiving a portion of the sale.
     * @return A boolean value indicating success.
     */
    function buyTShirt(address _NFTContract, uint _itemID, uint _price, address _producer) public returns (bool) {
        CustomTShirtNFT nft = CustomTShirtNFT(_NFTContract);
        nft._buyTShirt(_price, _producer);
        Order memory newOrder = Order(tx.origin, _NFTContract, _itemID, _price, _producer);
        orders.push(newOrder);
        return true;
    }

    /**
     * @dev Withdraws the USDT profit from royalties by calling the _withdrawUSDT function
     * on the caller's associated CustomTShirtNFT contract.
     * @return A boolean value indicating success.
     */
    function withdrawUSDT() public returns (bool) {
        CustomTShirtNFT nft = CustomTShirtNFT(userToNFTContract[tx.origin]);
        nft._withdrawUSDT();
        return true;
    }

    /**
     * @dev Returns an array of all deployed CustomTShirtNFT contracts.
     * @return An array of CustomTShirtNFT contract addresses.
     */
    function getDeployedNFTs() public view returns (CustomTShirtNFT[] memory) {
        return deployedNFTsContracts;
    }

    /**
     * @dev Modifier that ensures a user is not already registered before allowing registration.
     */
    modifier notRegistered() {
        require(!userAlreadyRegistered[tx.origin], "User already registered");
        _;
    }
}
