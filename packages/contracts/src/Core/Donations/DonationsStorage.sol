// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

/**
 * @title DonationsStorage
 * @author Lutra Labs
 * @dev Implementation of donations storage
 */
contract DonationsStorage {

    bytes32 public constant DONATIONS_STORAGE_SLOT = keccak256("ess.core.donations");

    struct Donations {
        mapping(address => uint256) _poolBalances;
    }

    /**
     * Get the donations storage
     * @dev returns the donations storage
     * @return donationsStorage the donations storage
     */
    function _getDonationsStorage() internal pure returns (Donations storage donationsStorage) {
        bytes32 position = DONATIONS_STORAGE_SLOT;
        assembly {
            donationsStorage.slot := position
        }
    }

}
