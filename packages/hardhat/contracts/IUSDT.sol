// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

pragma solidity ^0.8.0;

interface IUSDT is IERC20 {
    function decimals() external view returns (uint8);
}