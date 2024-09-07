// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/Auction.sol";

contract DeployAuction is Script {
    // function setUp() public {
    //     vm.createSelectFork(vm.rpcUrl("custom_network"));
    // }

    function setUp() public {
        vm.createSelectFork(vm.rpcUrl("lisk_sepolia"));
    }

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_WALLET_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        Auction auction = new Auction();

        console.log("Deployed Auction contract at:", address(auction));

        vm.stopBroadcast();
    }
}
