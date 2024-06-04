// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title EESCore
 * @author Lutra Labs
 * @dev Ethereum Endorsement Service Core interface
 */
interface IEESCore {

    /**
     * @dev Initializes the EESCore contract
     * @param easAddress The EAS address
     * @param schemaUid The Schema UID
     */
    function initialize(address easAddress, bytes32 schemaUid) external;

    /**
     * @notice Endorse the given account with provied arguments and optionally donate to the endorsee
     * @param endorsee the account to attest to/endorse
     * @param endorsementType the endorsement type
     * @param comment the comment
     * @param endorseeSocial the endorsee social that was used to endorse
     * @dev attests the EAS attestation with passed arguments to the provided endorsee and stores the donations to a mapping
     */
    function endorse(
        address endorsee,
        string memory endorsementType,
        string memory comment,
        string memory endorseeSocial
    ) external payable;

    /**
     * @notice Withdraw the donations from the contract
     * @dev withdraws the donations from the storage
     */
    function withdraw() external;

    /**
     * @notice Return the balance of the given account
     * @param account the account to retrieve the balance for
     * @dev retrieves the balance from the storage
     * @return balance balance of the given account
     */
    function getBalance(address account) external view returns (uint256 balance);

    /**
     * @notice Withdraws all revenue received as fees from endorsements and donations
     */
    function withdrawAllFees() external;

    /**
     * @notice Withdraws the fees from endorsements
     * @param amount The amount of fees to withdraw
     */
    function withdrawEndorsementFees(uint256 amount) external;

    /**
     * @notice Withdraws the fees from donations
     * @param amount The amount of fees to withdraw
     */
    function withdrawDonationFees(uint256 amount) external;

    /**
     * @notice Set donation fee percentage
     * @param newFee The new donation fee percentage
     * in 10_000 denomination
     * 1% = 100,
     * 100% = 10_000
     */
    function setDonationFeePercentage(uint256 newFee) external;

    /**
     * @notice Set the endorsement price
     * @param newPrice The new endorsement price
     */
    function setEndorsementPrice(uint256 newPrice) external;

    /**
     * @notice Returns the balance of the given account
     * @return balance balance of the given account
     */
    function getEndorsementsFeesBalance() external view returns (uint256 balance);

    /**
     * @notice Return the donations fees balance
     * @dev retrieves the donation fees balance from the storage
     * @return balance donations fees balance
     */
    function getDonationsFeesBalance() external view returns (uint256 balance);

    /**
     * @notice Return the total fees balance
     * @dev retrieves the total fees balance from the storage
     * @return balance total fees balance
     */
    function getTotalFeesBalance() external view returns (uint256 balance);

    /**
     * @notice Set new core EAS deployment address
     * @param newAddress The new EAS address
     */
    function setNewEasAddress(address newAddress) external;

    /**
     * @notice Set new EAS Schema UID
     * @param newSchemaUid The new Schema UID
     */
    function setNewSchemaUid(bytes32 newSchemaUid) external;

    /**
     * @notice Returns the endorsement price
     * @return price the endorsement price
     */
    function getEndorsementPrice() external view returns (uint256 price);

    /**
     * @notice Returns the donation fee percentage
     * @return percentage the donation fee percentage
     */
    function getDonationFeePercentage() external view returns (uint256 percentage);

}
