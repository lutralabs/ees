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
  'query Example {\n  ensNames {\n    id\n  }\n}': types.ExampleDocument,
};

/**
 * The gqlEAS function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gqlEAS(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gqlEAS(source: string): unknown;

/**
 * The gqlEAS function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gqlEAS(
  source: 'query Example {\n  ensNames {\n    id\n  }\n}'
): (typeof documents)['query Example {\n  ensNames {\n    id\n  }\n}'];

export function gqlEAS(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
