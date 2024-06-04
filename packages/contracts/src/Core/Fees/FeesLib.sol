// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

import {FeesStorage} from "./FeesStorage.sol";

/**
 * @title FeesLib
 * @author Lutra Labs
 * @dev Implementation of EES fees library
 */
library FeesLib {

    event WithdrawFees(string feeType, address indexed recipient, uint256 amount);

    /**
     * Sets the endorsement price
     * @param feesStorage the storage to use
     * @param newPrice the new endorsement price
     */
    function _setNewEndorsementPrice(FeesStorage.Fees storage feesStorage, uint256 newPrice) internal {
        require(newPrice < feesStorage._endorsementPrice, "Endorsement price cannot exceed previous price");
        feesStorage._endorsementPrice = newPrice;
    }

    /**
     * Sets the donation fee percentage
     * @param feesStorage the storage to use
     * @param newFee the new donation fee percentage
     */
    function _setNewDonationFeePercentage(FeesStorage.Fees storage feesStorage, uint256 newFee) internal {
        feesStorage._donationFeePercentage = newFee;
    }

    /**
     * Stores the endorsement fee
     * @param feesStorage the storage to use
     * @param amount The amount of fees to store
     */
    function _storeEndorsementFee(FeesStorage.Fees storage feesStorage, uint256 amount) internal {
        feesStorage._endorsementFees += amount;
    }

    /**
     * Stores the donation fee
     * @param feesStorage the storage to use
     * @param amount The amount of fees to store
     */
    function _storeDonationFee(FeesStorage.Fees storage feesStorage, uint256 amount) internal {
        feesStorage._donationFees += amount;
    }

    /**
     * Withdraws all fees (revenue to admins)
     * @param feesStorage the storage to use
     */
    function _withdrawAll(FeesStorage.Fees storage feesStorage) internal {
        uint256 donationsFees = feesStorage._donationFees;
        uint256 endorsementsFees = feesStorage._endorsementFees;
        feesStorage._donationFees = 0;
        feesStorage._endorsementFees = 0;
        payable(msg.sender).transfer(donationsFees + endorsementsFees);
        emit WithdrawFees("ALL", msg.sender, donationsFees + endorsementsFees);
    }

    /**
     * Withdraws the fees from endorsements
     * @param feesStorage the storage to use
     * @param amount The amount of fees to withdraw
     */
    function _withdrawEndorsementFees(FeesStorage.Fees storage feesStorage, uint256 amount) internal {
        require(amount <= feesStorage._endorsementFees, "Insufficient balance");
        feesStorage._endorsementFees -= amount;
        payable(msg.sender).transfer(amount);
        emit WithdrawFees("ENDORSEMENTS", msg.sender, amount);
    }

    /**
     * Withdraws the fees from donations
     * @param feesStorage the storage to use
     * @param amount The amount of fees to withdraw
     */
    function _withdrawDonationFees(FeesStorage.Fees storage feesStorage, uint256 amount) internal {
        require(amount <= feesStorage._donationFees, "Insufficient balance");
        feesStorage._donationFees -= amount;
        payable(msg.sender).transfer(amount);
        emit WithdrawFees("DONATIONS", msg.sender, amount);
    }

    /**
     * Returns the donations fees balance
     * @param feesStorage the storage to use
     * @dev retrieves the donation fees balance from the storage
     * @return balance of the fees received by donations
     */
    function _getEndorsementsFeesBalance(FeesStorage.Fees storage feesStorage)
        internal
        view
        returns (uint256 balance)
    {
        return feesStorage._endorsementFees;
    }

    /**
     * Return the donations fees balance
     * @param feesStorage the storage to use
     * @dev retrieves the donation fees balance from the storage
     * @return balance of the fees received by donations
     */
    function _getDonationsFeesBalance(FeesStorage.Fees storage feesStorage) internal view returns (uint256 balance) {
        return feesStorage._donationFees;
    }

    /**
     * Returns the total fees balance
     * @param feesStorage the storage to use
     * @dev retrieves the total fees balance from the storage
     * @return balance of the fees received by donations and endorsements
     */
    function _getTotalFeesBalance(FeesStorage.Fees storage feesStorage) internal view returns (uint256 balance) {
        return feesStorage._endorsementFees + feesStorage._donationFees;
    }

    /**
     * Returns the endorsement price
     * @param feesStorage the storage to use
     * @dev retrieves the endorsement price from the storage
     */
    function _getEndorsementPrice(FeesStorage.Fees storage feesStorage) internal view returns (uint256 price) {
        return feesStorage._endorsementPrice;
    }

    /**
     * Returns the donation fee percentage
     * @param feesStorage the storage to use
     * @dev retrieves the donation fee percentage from the storage
     */
    function _getDonationFeePercentage(FeesStorage.Fees storage feesStorage)
        internal
        view
        returns (uint256 percentage)
    {
        return feesStorage._donationFeePercentage;
    }

}
