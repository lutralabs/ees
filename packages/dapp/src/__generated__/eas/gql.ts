/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetAttestation($where: AttestationWhereUniqueInput!) {\n  attestation(where: $where) {\n    id\n    attester\n    recipient\n    decodedDataJson\n    timeCreated\n    revoked\n    revocationTime\n    txid\n  }\n}": types.GetAttestationDocument,
    "query GetAttestationDecodedData($where: AttestationWhereUniqueInput!) {\n  attestation(where: $where) {\n    id\n    decodedDataJson\n  }\n}": types.GetAttestationDecodedDataDocument,
};

/**
 * The gqlEAS function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlEAS(source: "query GetAttestation($where: AttestationWhereUniqueInput!) {\n  attestation(where: $where) {\n    id\n    attester\n    recipient\n    decodedDataJson\n    timeCreated\n    revoked\n    revocationTime\n    txid\n  }\n}"): typeof import('./graphql').GetAttestationDocument;
/**
 * The gqlEAS function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlEAS(source: "query GetAttestationDecodedData($where: AttestationWhereUniqueInput!) {\n  attestation(where: $where) {\n    id\n    decodedDataJson\n  }\n}"): typeof import('./graphql').GetAttestationDecodedDataDocument;


export function gqlEAS(source: string) {
  return (documents as any)[source] ?? {};
}
