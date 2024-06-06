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
    "query GetMinimalProfileFromAddress($identity: Identity!) {\n  Wallet(input: {identity: $identity, blockchain: ethereum}) {\n    primaryDomain {\n      name\n      avatar\n      tokenNft {\n        contentValue {\n          image {\n            small\n          }\n        }\n      }\n    }\n  }\n  farcasterSocials: Socials(\n    input: {filter: {identity: {_eq: $identity}, dappName: {_eq: farcaster}}, blockchain: ethereum, order: {followerCount: DESC}, limit: 1}\n  ) {\n    Social {\n      profileHandle\n      profileBio\n      profileImageContentValue {\n        image {\n          small\n        }\n      }\n    }\n  }\n  lensSocials: Socials(\n    input: {filter: {identity: {_eq: $identity}, dappName: {_eq: lens}}, blockchain: ethereum, order: {followerCount: DESC}, limit: 1}\n  ) {\n    Social {\n      profileHandle\n      profileBio\n      profileImageContentValue {\n        image {\n          small\n        }\n      }\n    }\n  }\n}": types.GetMinimalProfileFromAddressDocument,
    "query GetProfileFromEns($identity: Identity!) {\n  Wallet(input: {identity: $identity, blockchain: ethereum}) {\n    addresses\n    primaryDomain {\n      name\n      avatar\n      tokenNft {\n        contentValue {\n          image {\n            small\n          }\n        }\n      }\n    }\n  }\n}": types.GetProfileFromEnsDocument,
    "query GetProfileFromFarcaster($identity: Identity!) {\n  farcasterSocials: Socials(\n    input: {limit: 1, filter: {identity: {_eq: $identity}, dappName: {_eq: farcaster}}, blockchain: ethereum, order: {followerCount: DESC}}\n  ) {\n    Social {\n      connectedAddresses {\n        address\n      }\n      userAddress\n      profileName\n      profileDisplayName\n      profileHandle\n      profileBio\n      profileImageContentValue {\n        image {\n          small\n        }\n      }\n    }\n  }\n}": types.GetProfileFromFarcasterDocument,
    "query GetProfileFromLens($identity: Identity!) {\n  Wallet(input: {identity: $identity, blockchain: ethereum}) {\n    addresses\n  }\n  lensSocials: Socials(\n    input: {limit: 1, filter: {identity: {_eq: $identity}, dappName: {_eq: lens}}, blockchain: ethereum, order: {followerCount: DESC}}\n  ) {\n    Social {\n      profileName\n      profileDisplayName\n      profileHandle\n      profileBio\n      profileImageContentValue {\n        image {\n          small\n        }\n      }\n    }\n  }\n}": types.GetProfileFromLensDocument,
    "query GetProfileInfo($identity: Identity!) {\n  Wallet(input: {identity: $identity, blockchain: ethereum}) {\n    addresses\n    primaryDomain {\n      name\n      avatar\n      tokenNft {\n        contentValue {\n          image {\n            small\n          }\n        }\n      }\n    }\n  }\n  farcasterSocials: Socials(\n    input: {filter: {identity: {_eq: $identity}, dappName: {_eq: farcaster}}, blockchain: ethereum, order: {followerCount: DESC}}\n  ) {\n    Social {\n      connectedAddresses {\n        address\n      }\n      userAddress\n      profileName\n      profileDisplayName\n      profileHandle\n      profileBio\n      profileImageContentValue {\n        image {\n          small\n        }\n      }\n    }\n  }\n  lensSocials: Socials(\n    input: {filter: {identity: {_eq: $identity}, dappName: {_eq: lens}}, blockchain: ethereum, order: {followerCount: DESC}}\n  ) {\n    Social {\n      profileName\n      profileDisplayName\n      profileHandle\n      profileBio\n      profileImageContentValue {\n        image {\n          small\n        }\n      }\n    }\n  }\n}": types.GetProfileInfoDocument,
};

/**
 * The gqlAirstack function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlAirstack(source: "query GetMinimalProfileFromAddress($identity: Identity!) {\n  Wallet(input: {identity: $identity, blockchain: ethereum}) {\n    primaryDomain {\n      name\n      avatar\n      tokenNft {\n        contentValue {\n          image {\n            small\n          }\n        }\n      }\n    }\n  }\n  farcasterSocials: Socials(\n    input: {filter: {identity: {_eq: $identity}, dappName: {_eq: farcaster}}, blockchain: ethereum, order: {followerCount: DESC}, limit: 1}\n  ) {\n    Social {\n      profileHandle\n      profileBio\n      profileImageContentValue {\n        image {\n          small\n        }\n      }\n    }\n  }\n  lensSocials: Socials(\n    input: {filter: {identity: {_eq: $identity}, dappName: {_eq: lens}}, blockchain: ethereum, order: {followerCount: DESC}, limit: 1}\n  ) {\n    Social {\n      profileHandle\n      profileBio\n      profileImageContentValue {\n        image {\n          small\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').GetMinimalProfileFromAddressDocument;
/**
 * The gqlAirstack function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlAirstack(source: "query GetProfileFromEns($identity: Identity!) {\n  Wallet(input: {identity: $identity, blockchain: ethereum}) {\n    addresses\n    primaryDomain {\n      name\n      avatar\n      tokenNft {\n        contentValue {\n          image {\n            small\n          }\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').GetProfileFromEnsDocument;
/**
 * The gqlAirstack function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlAirstack(source: "query GetProfileFromFarcaster($identity: Identity!) {\n  farcasterSocials: Socials(\n    input: {limit: 1, filter: {identity: {_eq: $identity}, dappName: {_eq: farcaster}}, blockchain: ethereum, order: {followerCount: DESC}}\n  ) {\n    Social {\n      connectedAddresses {\n        address\n      }\n      userAddress\n      profileName\n      profileDisplayName\n      profileHandle\n      profileBio\n      profileImageContentValue {\n        image {\n          small\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').GetProfileFromFarcasterDocument;
/**
 * The gqlAirstack function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlAirstack(source: "query GetProfileFromLens($identity: Identity!) {\n  Wallet(input: {identity: $identity, blockchain: ethereum}) {\n    addresses\n  }\n  lensSocials: Socials(\n    input: {limit: 1, filter: {identity: {_eq: $identity}, dappName: {_eq: lens}}, blockchain: ethereum, order: {followerCount: DESC}}\n  ) {\n    Social {\n      profileName\n      profileDisplayName\n      profileHandle\n      profileBio\n      profileImageContentValue {\n        image {\n          small\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').GetProfileFromLensDocument;
/**
 * The gqlAirstack function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlAirstack(source: "query GetProfileInfo($identity: Identity!) {\n  Wallet(input: {identity: $identity, blockchain: ethereum}) {\n    addresses\n    primaryDomain {\n      name\n      avatar\n      tokenNft {\n        contentValue {\n          image {\n            small\n          }\n        }\n      }\n    }\n  }\n  farcasterSocials: Socials(\n    input: {filter: {identity: {_eq: $identity}, dappName: {_eq: farcaster}}, blockchain: ethereum, order: {followerCount: DESC}}\n  ) {\n    Social {\n      connectedAddresses {\n        address\n      }\n      userAddress\n      profileName\n      profileDisplayName\n      profileHandle\n      profileBio\n      profileImageContentValue {\n        image {\n          small\n        }\n      }\n    }\n  }\n  lensSocials: Socials(\n    input: {filter: {identity: {_eq: $identity}, dappName: {_eq: lens}}, blockchain: ethereum, order: {followerCount: DESC}}\n  ) {\n    Social {\n      profileName\n      profileDisplayName\n      profileHandle\n      profileBio\n      profileImageContentValue {\n        image {\n          small\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').GetProfileInfoDocument;


export function gqlAirstack(source: string) {
  return (documents as any)[source] ?? {};
}
