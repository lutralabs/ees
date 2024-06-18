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
    "query GetFarcasterSocialsByAddress($identity: Identity!) {\n  Socials(\n    input: {filter: {identity: {_eq: $identity}, dappName: {_eq: farcaster}}, blockchain: ethereum, order: {followerCount: DESC}, limit: 1}\n  ) {\n    Social {\n      profileHandle\n      profileTokenId\n    }\n  }\n}": types.GetFarcasterSocialsByAddressDocument,
};

/**
 * The gqlAirstack function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlAirstack(source: "query GetFarcasterSocialsByAddress($identity: Identity!) {\n  Socials(\n    input: {filter: {identity: {_eq: $identity}, dappName: {_eq: farcaster}}, blockchain: ethereum, order: {followerCount: DESC}, limit: 1}\n  ) {\n    Social {\n      profileHandle\n      profileTokenId\n    }\n  }\n}"): typeof import('./graphql').GetFarcasterSocialsByAddressDocument;


export function gqlAirstack(source: string) {
  return (documents as any)[source] ?? {};
}
