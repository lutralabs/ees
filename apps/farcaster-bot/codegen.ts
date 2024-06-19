import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    './__generated__/ees/': {
      documents: './lib/graphql/ees/**/*.graphql',
      config: {
        documentMode: 'string',
      },
      schema: 'https://api.studio.thegraph.com/query/77003/ees-base/v0.0.3',
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gqlEES',
      },
    },
    './__generated__/airstack/': {
      documents: './lib/graphql/airstack/**/*.graphql',
      config: {
        documentMode: 'string',
      },
      schema: 'https://api.airstack.xyz/graphql',
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gqlAirstack',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
