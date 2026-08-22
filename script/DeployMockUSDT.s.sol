// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/MockUSDT.sol";

contract DeployMockUSDT is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address treasury = vm.envAddress("TREASURY_ADDRESS");

        vm.startBroadcast(deployerKey);
        MockUSDT token = new MockUSDT(treasury);
        vm.stopBroadcast();

        console.log("MockUSDT deployed:", address(token));
        console.log("Treasury:", treasury);
        console.log("Treasury balance:", token.balanceOf(treasury));
    }
}
