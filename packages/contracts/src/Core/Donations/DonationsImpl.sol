// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

import {DonationsLib} from "./DonationsLib.sol";
import {DonationsStorage} from "./DonationsStorage.sol";

/**
 * @title DonationsImpl
 * @author Lutra Labs
 * @dev Implementation of the donations logic
 */
contract DonationsImpl is DonationsStorage {

    using DonationsLib for DonationsStorage.Donations;

    /**
     * Donate the given amount of donations to the given account
     * @param to the account to donate to
     * @param amount the amount to donate
     * @dev stores the given amount in the donations storage
     */
    function _donate(address to, uint256 amount) internal {
        require(to != msg.sender, "Cannot donate to yourself");
        DonationsStorage.Donations storage donations = _getDonationsStorage();
        donations._donate(to, amount);
    }

    /**
     * Withdraw the given amount of donations from the contract
     * @param amount the amount to withdraw
     * @dev withdraws the given amount from the storage
     */
    function _withdraw(uint256 amount) internal {
        require(amount > 0, "Insufficient balance");
        DonationsStorage.Donations storage donations = _getDonationsStorage();
        donations._withdraw(amount);
    }

    /**
     * Return the donations balance of the given account
     * @param account the account to retrieve the balance for
     * @dev retrieves the balance from the storage
     * @return balance balance of the given account
     */
    function _getBalance(address account) internal view returns (uint256) {
        DonationsStorage.Donations storage donations = _getDonationsStorage();
        return donations._getBalance(account);
    }

}
