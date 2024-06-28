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
    "query GetAggregatedAccountData($account: ID!) {\n  account(id: $account) {\n    id\n    totalEndorsementsReceived\n    totalEndorsementsSent\n    totalDonationsReceived\n    totalDonationsSent\n  }\n}": types.GetAggregatedAccountDataDocument,
    "query GetEndorsementsForAccountPaginated($id: ID!, $first: Int!, $skip: Int!) {\n  account(id: $id) {\n    receivedEndorsements(\n      orderBy: createdAtTimestamp\n      orderDirection: desc\n      first: $first\n      skip: $skip\n    ) {\n      id\n      from {\n        id\n      }\n      createdAtTimestamp\n      endorsementType\n      donationAmount\n      easUid\n    }\n  }\n}": types.GetEndorsementsForAccountPaginatedDocument,
    "query GetGlobalStatistics($id: ID! = \"0x476c6f62616c53746174697374696373\") {\n  globalStatistics(id: $id) {\n    id\n    totalEndorsements\n    totalDonations\n    totalDonationAmount\n    totalWithdrawnAmount\n  }\n}": types.GetGlobalStatisticsDocument,
    "query GetTopEndorsersAndDonators($account: String!) {\n  topEndorsers: aggregatedInformations(\n    where: {to: $account}\n    orderBy: from__totalEndorsementsReceived\n    orderDirection: desc\n    first: 6\n  ) {\n    id\n    from {\n      id\n    }\n  }\n  topDonators: aggregatedInformations(\n    where: {to: $account, donationAmount_gt: 0}\n    orderBy: donationAmount\n    orderDirection: desc\n    first: 6\n  ) {\n    id\n    from {\n      id\n    }\n    donationAmount\n  }\n}": types.GetTopEndorsersAndDonatorsDocument,
    "query GetTopEndorsersForAccount($account: String!, $first: Int!) {\n  topEndorsers: aggregatedInformations(\n    where: {to: $account}\n    orderBy: from__totalEndorsementsReceived\n    orderDirection: desc\n    first: $first\n  ) {\n    id\n    from {\n      id\n      totalEndorsementsReceived\n      sentEndorsements(where: {to: $account}) {\n        endorsementType\n        easUid\n      }\n    }\n  }\n}": types.GetTopEndorsersForAccountDocument,
};

/**
 * The gqlEES function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlEES(source: "query GetAggregatedAccountData($account: ID!) {\n  account(id: $account) {\n    id\n    totalEndorsementsReceived\n    totalEndorsementsSent\n    totalDonationsReceived\n    totalDonationsSent\n  }\n}"): typeof import('./graphql').GetAggregatedAccountDataDocument;
/**
 * The gqlEES function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlEES(source: "query GetEndorsementsForAccountPaginated($id: ID!, $first: Int!, $skip: Int!) {\n  account(id: $id) {\n    receivedEndorsements(\n      orderBy: createdAtTimestamp\n      orderDirection: desc\n      first: $first\n      skip: $skip\n    ) {\n      id\n      from {\n        id\n      }\n      createdAtTimestamp\n      endorsementType\n      donationAmount\n      easUid\n    }\n  }\n}"): typeof import('./graphql').GetEndorsementsForAccountPaginatedDocument;
/**
 * The gqlEES function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlEES(source: "query GetGlobalStatistics($id: ID! = \"0x476c6f62616c53746174697374696373\") {\n  globalStatistics(id: $id) {\n    id\n    totalEndorsements\n    totalDonations\n    totalDonationAmount\n    totalWithdrawnAmount\n  }\n}"): typeof import('./graphql').GetGlobalStatisticsDocument;
/**
 * The gqlEES function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlEES(source: "query GetTopEndorsersAndDonators($account: String!) {\n  topEndorsers: aggregatedInformations(\n    where: {to: $account}\n    orderBy: from__totalEndorsementsReceived\n    orderDirection: desc\n    first: 6\n  ) {\n    id\n    from {\n      id\n    }\n  }\n  topDonators: aggregatedInformations(\n    where: {to: $account, donationAmount_gt: 0}\n    orderBy: donationAmount\n    orderDirection: desc\n    first: 6\n  ) {\n    id\n    from {\n      id\n    }\n    donationAmount\n  }\n}"): typeof import('./graphql').GetTopEndorsersAndDonatorsDocument;
/**
 * The gqlEES function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlEES(source: "query GetTopEndorsersForAccount($account: String!, $first: Int!) {\n  topEndorsers: aggregatedInformations(\n    where: {to: $account}\n    orderBy: from__totalEndorsementsReceived\n    orderDirection: desc\n    first: $first\n  ) {\n    id\n    from {\n      id\n      totalEndorsementsReceived\n      sentEndorsements(where: {to: $account}) {\n        endorsementType\n        easUid\n      }\n    }\n  }\n}"): typeof import('./graphql').GetTopEndorsersForAccountDocument;


export function gqlEES(source: string) {
  return (documents as any)[source] ?? {};
}
