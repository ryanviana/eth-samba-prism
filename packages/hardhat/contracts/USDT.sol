// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDT is ERC20 {
    constructor() ERC20("USDT", "USDT") {
        _mint(0xD3C65FBB3839734785786A32B8BA6e74dbe6E35a, 1000 * 10 ** decimals());
        _mint(0x8cA76F65092a26F42D3AfBe9E6D80D4691Fe635F, 1000 * 10 ** decimals());
    }

    function decimals() public pure override returns(uint8) {
        return 6;
    }
}
