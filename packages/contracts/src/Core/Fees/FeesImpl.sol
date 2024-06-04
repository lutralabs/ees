// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

import {FeesLib} from "./FeesLib.sol";
import {FeesStorage} from "./FeesStorage.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

/**
 * @title FeesImpl
 * @author Lutra Labs
 * @dev Implementation of the fees logic
 */
contract FeesImpl is FeesStorage, Initializable {

    using FeesLib for FeesStorage.Fees;
    using Math for uint256;

    // denominated in 10_000;
    // 1% = 100,
    // 100% = 10_000
    uint256 constant MAXIMUM_FEE_PERCENTAGE = 300;

    /**
     * @dev Initializes the fees contract
     * @param endorsementPrice The endorsement fee
     * @param donationFeePercentage The donation fee percentage
     */
    function __FeesImpl_init(uint256 endorsementPrice, uint256 donationFeePercentage) internal initializer {
        FeesStorage.Fees storage fees = _getFeesStorage();
        fees._endorsementPrice = endorsementPrice;
        fees._donationFeePercentage = donationFeePercentage;
    }

    /**
     * @dev Sets the new endorsement fee
     * @param newPrice The new endorsement fee
     */
    function _setNewEndorsementPrice(uint256 newPrice) internal {
        require(newPrice < _getEndorsementPrice(), "New endorsement price cannot be higher than the current one");
        FeesStorage.Fees storage fees = _getFeesStorage();
        fees._setNewEndorsementPrice(newPrice);
    }

    /**
     * @dev Sets the new donation fee percentage
     * @param newDonationFeePercentage The new donation fee percentage
     */
    function _setNewDonationFeePercentage(uint256 newDonationFeePercentage) internal {
        require(newDonationFeePercentage <= MAXIMUM_FEE_PERCENTAGE, "Donation fee percentage cannot exceed 3%");
        FeesStorage.Fees storage fees = _getFeesStorage();
        fees._donationFeePercentage = newDonationFeePercentage;
    }

    /**
     * @dev Returns the endorsement price
     * @return endorsementPrice The endorsement price
     */
    function _getEndorsementPrice() internal view returns (uint256 endorsementPrice) {
        FeesStorage.Fees storage fees = _getFeesStorage();
        return fees._getEndorsementPrice();
    }

    /**
     * @dev Returns the donation fee percentage
     * @return donationFeePercentage The donation fee percentage
     */
    function _getDonationFeePercentage() internal view returns (uint256 donationFeePercentage) {
        FeesStorage.Fees storage fees = _getFeesStorage();
        return fees._getDonationFeePercentage();
    }

    /**
     * @dev Stores the fees
     * @param totalFees total fees received
     * @param endorsementFee The endorsement fee (0.00042 ETH)
     * @param donationFeePercentage The donation fee percentage (1%)
     * @return donationAmount The donation amount received
     */
    function _storeFees(
        uint256 totalFees,
        uint256 endorsementFee,
        uint256 donationFeePercentage
    ) internal returns (uint256 donationAmount) {
        uint256 totalDonation = totalFees - endorsementFee;
        uint256 donationFee = totalDonation.mulDiv(donationFeePercentage, 10_000, Math.Rounding.Ceil);
        donationAmount = totalDonation - donationFee;
        _storeEndorsementFee(endorsementFee);
        _storeDonationFee(donationFee);
        return donationAmount;
    }

    /**
     * @dev Stores the endorsement fee
     * @param amount The amount of fees to store
     */
    function _storeEndorsementFee(uint256 amount) private {
        FeesStorage.Fees storage fees = _getFeesStorage();
        fees._storeEndorsementFee(amount);
    }

    /**
     * @dev Stores the donation fee
     * @param amount The amount of fees to store
     */
    function _storeDonationFee(uint256 amount) private {
        FeesStorage.Fees storage fees = _getFeesStorage();
        fees._storeDonationFee(amount);
    }

    /**
     * @dev Withdraws all fees (revenue to admins)
     */
    function _withdrawAll() internal {
        // require the amount to be greater or equal than the balance
        FeesStorage.Fees storage fees = _getFeesStorage();
        fees._withdrawAll();
    }

    /**
     * @dev Withdraws the fees from endorsements
     * @param amount The amount of fees to withdraw
     */
    function _withdrawEndorsementFees(uint256 amount) internal {
        FeesStorage.Fees storage fees = _getFeesStorage();
        fees._withdrawEndorsementFees(amount);
    }

    /**
     * @dev Withdraws the fees from donations
     * @param amount The amount of fees to withdraw
     */
    function _withdrawDonationFees(uint256 amount) internal {
        FeesStorage.Fees storage fees = _getFeesStorage();
        fees._withdrawDonationFees(amount);
    }

    /**
     * @dev Returns the donations fees balance
     * @return balance donations fees balance
     */
    function _getEndorsementsFeesBalance() internal view returns (uint256 balance) {
        FeesStorage.Fees storage fees = _getFeesStorage();
        return fees._getEndorsementsFeesBalance();
    }

    /**
     * @dev Returns the donations fees balance
     * @return balance donations fees balance
     */
    function _getDonationsFeesBalance() internal view returns (uint256 balance) {
        FeesStorage.Fees storage fees = _getFeesStorage();
        return fees._getDonationsFeesBalance();
    }

    /**
     * @dev Returns the total fees balance
     * @return balance total fees balance
     */
    function _getTotalFeesBalance() internal view returns (uint256) {
        FeesStorage.Fees storage fees = _getFeesStorage();
        return fees._getTotalFeesBalance();
    }

}
