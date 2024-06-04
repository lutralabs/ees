// SPDX-License-Identifier: BUSL-1.1

pragma solidity ^0.8.24;

import {EMPTY_UID, NO_EXPIRATION_TIME} from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";
import {
    AttestationRequest,
    AttestationRequestData,
    IEAS
} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title EASImpl
 * @author Lutra Labs
 * @dev Implementation of the EAS logic used in EESCore
 */
contract EASImpl is Initializable {

    error InvalidEAS();

    IEAS private _eas;
    bytes32 public _schemaUid;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @dev Initializes the EAS contract with the provided eas address
     * @param easAddress the address of the EAS contract
     */
    function __EASImpl_init(address easAddress, bytes32 schemaUid) internal initializer {
        if (address(easAddress) == address(0)) {
            revert InvalidEAS();
        }
        _setNewEasAddress(easAddress);
        _setNewSchemaUid(schemaUid);
    }

    /**
     * @dev Sets the EAS address
     * @param newEasAddress the new EAS address
     */
    function _setNewEasAddress(address newEasAddress) internal {
        if (address(newEasAddress) == address(0)) {
            revert InvalidEAS();
        }
        _eas = IEAS(newEasAddress);
    }

    /**
     * @dev sets new schema uid
     * @param newSchemaUid the new schema uid
     */
    function _setNewSchemaUid(bytes32 newSchemaUid) internal {
        _schemaUid = newSchemaUid;
    }

    /**
     * @dev Attests the EAS to the given account
     * @param data the attestation data
     * @return uid the uid of the new attestation
     */
    function _attest(AttestationRequestData memory data) internal returns (bytes32 uid) {
        uid = _eas.attest(AttestationRequest({schema: _schemaUid, data: data}));
    }

}
