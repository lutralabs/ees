// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

/**
 * @title FeesStorage
 * @author Lutra Labs
 * @dev Implementation of fees storage
 */
contract FeesStorage {

    bytes32 public constant FEES_STORAGE_SLOT = keccak256("ess.wrapper.fees");

    struct Fees {
        uint256 _endorsementFees;
        uint256 _donationFees;
        uint256 _endorsementPrice;
        uint256 _donationFeePercentage;
    }

    /**
     * Get the fees storage
     * @dev returns the fees storage
     * @return feesStorage the fee storage
     */
    function _getFeesStorage() internal pure returns (Fees storage feesStorage) {
        bytes32 position = FEES_STORAGE_SLOT;
        assembly {
            feesStorage.slot := position
        }
    }

}
