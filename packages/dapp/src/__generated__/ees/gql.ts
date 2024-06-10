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
    "query GetTopEndorsersAndDonators($account: String!) {\n  topEndorsers: aggregatedInformations(\n    where: {to: $account}\n    orderBy: from__totalEndorsementsReceived\n    orderDirection: desc\n    first: 6\n  ) {\n    id\n    from {\n      id\n      totalEndorsementsReceived\n    }\n  }\n  topDonators: aggregatedInformations(\n    where: {to: $account}\n    orderBy: donationAmount\n    orderDirection: desc\n    first: 6\n  ) {\n    id\n    from {\n      id\n    }\n    donationAmount\n  }\n}": types.GetTopEndorsersAndDonatorsDocument,
};

/**
 * The gqlEES function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlEES(source: "query GetTopEndorsersAndDonators($account: String!) {\n  topEndorsers: aggregatedInformations(\n    where: {to: $account}\n    orderBy: from__totalEndorsementsReceived\n    orderDirection: desc\n    first: 6\n  ) {\n    id\n    from {\n      id\n      totalEndorsementsReceived\n    }\n  }\n  topDonators: aggregatedInformations(\n    where: {to: $account}\n    orderBy: donationAmount\n    orderDirection: desc\n    first: 6\n  ) {\n    id\n    from {\n      id\n    }\n    donationAmount\n  }\n}"): typeof import('./graphql').GetTopEndorsersAndDonatorsDocument;


export function gqlEES(source: string) {
  return (documents as any)[source] ?? {};
}
