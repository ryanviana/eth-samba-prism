// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CustomTShirtNFT.sol";
import "./ICustomTShirt.sol";

contract NFTFactory {
    CustomTShirtNFT[] public deployedNFTsContracts;
    mapping(address => address) public userToNFTContract;

    //Chamar essa função 1x por usuário (registro)
    function createNFT(address _user, string memory name, string memory symbol) public return (address) {
        CustomTShirtNFT newNFT = new CustomTShirtNFT(name, symbol);
        deployedNFTsContracts.push(newNFT);
        userToNFTContract[_user] = address(newNFT);

        return address(newNFT);
    }

    //Chamar toda vez que quiser criar um novo design -> chama função mintTo no contrato do usuário
    function mintNFT(address _user, string memory uri) public return (bool) {
        CustomTShirtNFT nft = CustomTShirtNFT(userToNFTContract[_user]);
        nft.mintTo(_user, uri);

        return true;
    }

    function getDeployedNFTs() public view returns (CustomTShirtNFT[] memory) {
        return deployedNFTsContracts;
    }
}
