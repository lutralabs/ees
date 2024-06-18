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
    "query GetTopEndorsees($first: Int!, $skip: Int!) {\n  accounts(\n    orderBy: totalEndorsementsReceived\n    orderDirection: desc\n    first: $first\n    skip: $skip\n  ) {\n    id\n    totalEndorsementsReceived\n  }\n}": types.GetTopEndorseesDocument,
};

/**
 * The gqlEES function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlEES(source: "query GetTopEndorsees($first: Int!, $skip: Int!) {\n  accounts(\n    orderBy: totalEndorsementsReceived\n    orderDirection: desc\n    first: $first\n    skip: $skip\n  ) {\n    id\n    totalEndorsementsReceived\n  }\n}"): typeof import('./graphql').GetTopEndorseesDocument;


export function gqlEES(source: string) {
  return (documents as any)[source] ?? {};
}
