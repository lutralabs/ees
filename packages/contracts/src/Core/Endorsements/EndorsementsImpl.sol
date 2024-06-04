// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.24;

import {EASImpl} from "../EAS/EASImpl.sol";

import {EMPTY_UID, NO_EXPIRATION_TIME} from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";
import "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";

/**
 * @title EndorsementsImpl
 * @author Lutra Labs
 * @dev Implementation of the endorsements/attestations logic
 */
contract EndorsementsImpl is EASImpl {

    event Endorse(
        address indexed endorser,
        address indexed endorsee,
        string endorsementType,
        bytes32 indexed uid,
        uint256 donationAmount
    );

    /**
     * Attest EAS attestation to the given account
     * @param endorsee the account to attest to
     * @param endorsementType the endorsement type
     * @dev attests the EAS to the given account
     */
    function _endorse(
        address endorsee,
        string memory endorsementType,
        string memory comment,
        string memory endorseeSocial,
        uint256 donationAmount
    ) internal {
        require(endorsee != msg.sender, "Cannot attest to yourself");
        AttestationRequestData memory data = AttestationRequestData({
            recipient: endorsee,
            expirationTime: NO_EXPIRATION_TIME,
            revocable: true,
            refUID: EMPTY_UID,
            data: abi.encode(endorsementType, comment, msg.sender, endorseeSocial),
            value: 0
        });
        bytes32 uid = _attest(data);
        emit Endorse(msg.sender, endorsee, endorsementType, uid, donationAmount);
    }

}
