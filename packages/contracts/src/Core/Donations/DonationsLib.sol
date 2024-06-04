// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

import {DonationsStorage} from "./DonationsStorage.sol";

/**
 * @title DonationsLib
 * @author Lutra Labs
 * @dev Implementation of donations library
 */
library DonationsLib {

    event Donate(address indexed from, address indexed to, uint256 amount);
    event Withdraw(address indexed from, uint256 amount);

    /**
     * Donate the given amount of donations to the given account
     * @param donationsStorage the storage to use
     * @param to the account to donate to
     * @param amount the amount to donate
     * @dev stores the given amount in the donations storage
     */
    function _donate(DonationsStorage.Donations storage donationsStorage, address to, uint256 amount) internal {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Invalid amount");
        require(msg.sender != to, "Cannot donate to yourself");
        donationsStorage._poolBalances[to] += amount;
        emit Donate(msg.sender, to, amount);
    }

    /**
     * Withdraw the given amount of donations from the contract
     * @param donationsStorage the storage to use
     * @param amount the amount to withdraw
     * @dev withdraws the given amount from the storage
     */
    function _withdraw(DonationsStorage.Donations storage donationsStorage, uint256 amount) internal {
        require(donationsStorage._poolBalances[msg.sender] >= amount, "Insufficient balance");
        donationsStorage._poolBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

    /**
     * Return the donations balance of the given account
     * @param donationsStorage the storage to use
     * @param account the account to retrieve the balance for
     * @dev retrieves the balance from the storage
     * @return balance balance of the given account
     */
    function _getBalance(
        DonationsStorage.Donations storage donationsStorage,
        address account
    ) internal view returns (uint256) {
        return donationsStorage._poolBalances[account];
    }

}
