// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";

import "../../src/Core/EESCore.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import {Options} from "openzeppelin-foundry-upgrades/Options.sol";
import {Upgrades} from "openzeppelin-foundry-upgrades/Upgrades.sol";

contract EESCoreTests is Test {

    string constant ENDORSEMENT_TYPE = "Developer";
    uint256 constant ENDORSEMENT_PRICE = 0.00042 ether;
    uint256 constant DONATION_FEE_PERCENTAGE = 1;
    address constant EAS_ADDRESS = 0xC2679fBD37d54388Ce493F1DB75320D236e1815e;
    string constant ENDORSEMENT_COMMENT = "One of the best I know.";
    string constant ENDORSEMENT_SOCIAL = "fc:kersic.eth";
    bytes32 constant SCHEMA_UID = 0x28bb35c3774b2963e8703dccbe93a3d1620ddf91ee3eee4678cdb8fb8e1a8bbb;

    event Endorse(
        address indexed from, address indexed to, string endorsementType, bytes32 indexed uid, uint256 amount
    );

    EESCore core;
    address proxy;
    address owner;
    address newOwner;

    function setUp() public {
        owner = vm.addr(1);
        Options memory opts;
        opts.unsafeSkipAllChecks = true;
        proxy = Upgrades.deployUUPSProxy(
            "EESCore.sol:EESCore", abi.encodeCall(EESCore.initialize, (EAS_ADDRESS, SCHEMA_UID)), opts
        );

        core = EESCore(proxy);
    }

    function testEndorseWithDonation() public {
        vm.expectEmit(true, true, false, true);
        emit Endorse(address(this), address(1234), ENDORSEMENT_TYPE, bytes32(0), 0 ether);
        address recipient = address(1234);
        uint256 balanceBefore = core.getBalance(recipient);
        core.endorse{value: ENDORSEMENT_PRICE}(recipient, ENDORSEMENT_TYPE, ENDORSEMENT_COMMENT, ENDORSEMENT_SOCIAL);
        uint256 balanceAfter = core.getBalance(recipient);
        assertEq(balanceAfter, balanceBefore);
        assertEq(core.getBalance(recipient), 0);
    }

    // function testFailEndorseToSelf() public {
    // TODO: revisit when migrating from hardhat to forge
    // address recipient = address(this);
    // vm.prank(recipient);
    // vm.expectRevert("Cannot endorse to yourself");
    // core.endorse{value: ENDORSEMENT_PRICE}(recipient, ENDORSEMENT_TYPE, ENDORSEMENT_COMMENT, ENDORSEMENT_SOCIAL);
    // vm.stopPrank();
    // }

}
