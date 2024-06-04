/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
  'query GetAccount($address: ID!) {\n  account(id: $address) {\n    id\n    totalDonationsReceived\n    totalDonationsSent\n  }\n}':
    types.GetAccountDocument,
  'query GetAccounts {\n  accounts {\n    id\n    totalDonationsReceived\n    totalDonationsSent\n  }\n}':
    types.GetAccountsDocument,
};

/**
 * The gqlEES function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gqlEES(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gqlEES(source: string): unknown;

/**
 * The gqlEES function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlEES(
  source: 'query GetAccount($address: ID!) {\n  account(id: $address) {\n    id\n    totalDonationsReceived\n    totalDonationsSent\n  }\n}'
): (typeof documents)['query GetAccount($address: ID!) {\n  account(id: $address) {\n    id\n    totalDonationsReceived\n    totalDonationsSent\n  }\n}'];
/**
 * The gqlEES function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlEES(
  source: 'query GetAccounts {\n  accounts {\n    id\n    totalDonationsReceived\n    totalDonationsSent\n  }\n}'
): (typeof documents)['query GetAccounts {\n  accounts {\n    id\n    totalDonationsReceived\n    totalDonationsSent\n  }\n}'];

export function gqlEES(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
