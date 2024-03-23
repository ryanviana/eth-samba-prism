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
    }

    Order[] public orders;


    //Chamar essa função 1x por usuário (registro) -> idealmente deveríamos verificar isso de alguma forma
    // Chamado dentro do mintTo
    function register() public notRegistered returns (address) {

        CustomTShirtNFT newNFT = new CustomTShirtNFT(msg.sender, "The Prism", "PRISM");
        deployedNFTsContracts.push(newNFT);
        userToNFTContract[tx.origin] = address(newNFT);
        userAlreadyRegistered[msg.sender] = true;

        return address(newNFT);
    }

    //Chamar toda vez que quiser criar um novo design -> chama função mintTo no contrato do usuário
    //Botao de "Save and Generate NFT"
    function mintTo(string memory uri) public returns (bool) {

        if (!userAlreadyRegistered[tx.origin]) {
            register();
        }

        CustomTShirtNFT nft = CustomTShirtNFT(userToNFTContract[msg.sender]);
        nft._mintTo(uri);

        return true;
    }

    //Botão de comprar camiseta, registrar comprar e pagar
    function buyTShirt(address _NFTContract, uint _itemID, uint _price) public returns (bool) {

        CustomTShirtNFT nft = CustomTShirtNFT(_NFTContract);

        nft._buyTShirt(_price);

        Order memory newOrder = Order(tx.origin, _NFTContract, _itemID, _price);
        orders.push(newOrder);

        return true;
    }

    // Function to withdraw USDT profit from royalties
    function withdrawUSDT() public returns (bool) {
        CustomTShirtNFT nft = CustomTShirtNFT(userToNFTContract[msg.sender]);

        nft._withdrawUSDT();

        return true;
    }

    function getDeployedNFTs() public view returns (CustomTShirtNFT[] memory) {
        return deployedNFTsContracts;
    }

    modifier notRegistered() {
        require(!userAlreadyRegistered[tx.origin], "User already registered");
        _;
    }
}
