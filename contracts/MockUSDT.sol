// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @dev Test-only stand-in for USDT on Sepolia.
/// Matches the properties WDK cares about: ERC-20, 6 decimals, symbol "USDT".
contract MockUSDT is ERC20 {
    constructor(address treasury) ERC20("Mock USDT", "USDT") {
        _mint(treasury, 1_000_000 * 10 ** decimals()); // 1,000,000 USDT to treasury
    }
}
