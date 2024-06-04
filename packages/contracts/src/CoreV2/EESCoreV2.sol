// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.24;

import {DonationsImpl} from "../Core/Donations/DonationsImpl.sol";

import {EndorsementsImpl} from "../Core/Endorsements/EndorsementsImpl.sol";
import {FeesImpl} from "../Core/Fees/FeesImpl.sol";
import {IEESCore} from "../Core/interfaces/IEESCore.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

/**
 * @title EESCoreV2
 * @author Lutra Labs
 * @dev Ethereum Endorsement Service Core contract
 */
contract EESCoreV2 is
    IEESCore,
    EndorsementsImpl,
    DonationsImpl,
    FeesImpl,
    OwnableUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable
{

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function upgradedFunction() public pure returns (uint256) {
        return 8 * 8;
    }

    /// @inheritdoc UUPSUpgradeable
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    /// @inheritdoc IEESCore
    function initialize(address easAddress, bytes32 schemaUid) external initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
        __EASImpl_init(easAddress, schemaUid);
        // sets the endorsement price to 0.00042 ETH and the donation fee percentage to 1%
        __FeesImpl_init(0.00042 ether, 1);
    }

    /// @inheritdoc IEESCore
    function endorse(
        address endorsee,
        string memory endorsementType,
        string memory comment,
        string memory endorseeSocial
    ) external payable {
        require(msg.sender != endorsee, "Cannot endorse to yourself");
        require(msg.value >= _getEndorsementPrice(), "Insufficient endorsement fee");
        require(endorsee != address(0), "Endorsee cannot be the zero address");
        require(endorsee != address(this), "Endorsee cannot be the contract address");
        uint256 donationAmount = _storeFees(msg.value, _getEndorsementPrice(), _getDonationFeePercentage());
        if (msg.value > _getEndorsementPrice()) {
            _donate(endorsee, donationAmount);
        }
        _endorse(endorsee, endorsementType, comment, endorseeSocial, donationAmount);
    }

    /// @inheritdoc IEESCore
    function withdraw() external nonReentrant {
        _withdraw(_getBalance(msg.sender));
    }

    /// @inheritdoc IEESCore
    function getBalance(address account) public view returns (uint256 balance) {
        return _getBalance(account);
    }

    /// @inheritdoc IEESCore
    function withdrawAllFees() external onlyOwner nonReentrant {
        _withdrawAll();
    }

    /// @inheritdoc IEESCore
    function withdrawEndorsementFees(uint256 amount) external onlyOwner nonReentrant {
        _withdrawEndorsementFees(amount);
    }

    /// @inheritdoc IEESCore
    function withdrawDonationFees(uint256 amount) external onlyOwner nonReentrant {
        _withdrawDonationFees(amount);
    }

    /// @inheritdoc IEESCore
    function setDonationFeePercentage(uint256 newFee) external onlyOwner {
        require(newFee <= MAXIMUM_FEE_PERCENTAGE, "Donation fee percentage cannot exceed 3%");
        _setNewDonationFeePercentage(newFee);
    }

    /// @inheritdoc IEESCore
    function setEndorsementPrice(uint256 newPrice) external onlyOwner {
        require(newPrice < _getEndorsementPrice(), "Endorsement price cannot exceed previous price");
        _setNewEndorsementPrice(newPrice);
    }

    /// @inheritdoc IEESCore
    function setNewEasAddress(address newEasAddress) external onlyOwner {
        _setNewEasAddress(newEasAddress);
    }

    /// @inheritdoc IEESCore
    function setNewSchemaUid(bytes32 newSchemaUid) external onlyOwner {
        _setNewSchemaUid(newSchemaUid);
    }

    /// @inheritdoc IEESCore
    function getDonationsFeesBalance() external view returns (uint256 balance) {
        balance = _getDonationsFeesBalance();
    }

    /// @inheritdoc IEESCore
    function getEndorsementsFeesBalance() external view returns (uint256 balance) {
        balance = _getEndorsementsFeesBalance();
    }

    /// @inheritdoc IEESCore
    function getTotalFeesBalance() external view returns (uint256 balance) {
        balance = _getTotalFeesBalance();
    }

    /// @inheritdoc IEESCore
    function getEndorsementPrice() external view returns (uint256 price) {
        return _getEndorsementPrice();
    }

    /// @inheritdoc IEESCore
    function getDonationFeePercentage() external view returns (uint256 percentage) {
        return _getDonationFeePercentage();
    }

}
