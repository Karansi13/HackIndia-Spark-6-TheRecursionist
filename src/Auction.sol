// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Auction {
    address public owner;
    address public highestBidder;
    uint256 public highestBid;
    bool public ended;

    mapping(address => uint256) public bids;

    event AuctionStarted();
    event BidPlaced(address indexed bidder, uint256 amount);
    event AuctionEnded(address winner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function startAuction() external {
        require(msg.sender == owner, "Only owner can start the auction");
        require(!ended, "Auction already ended");

        emit AuctionStarted();
    }

    function bid() external payable {
        require(!ended, "Auction ended");
        require(msg.value > highestBid, "There already is a higher bid");

        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
        emit BidPlaced(msg.sender, msg.value);
    }

    function withdraw() external returns (bool) {
        uint256 amount = bids[msg.sender]; // No extra space
        if (amount > 0) {
            bids[msg.sender] = 0;
        }
        return true;
    }

    function endAuction() external {
        require(msg.sender == owner, "Only owner can end the auction");
        require(!ended, "Auction already ended");

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);
    }
}
