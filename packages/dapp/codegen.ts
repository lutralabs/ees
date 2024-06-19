import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    // './src/__generated__/eas/': {
    //   documents: './src/lib/graphql/eas/**/*.graphql',
    //   schema: 'https://base.easscan.org/graphql',
    //   preset: 'client',
    //   plugins: [],
    //   presetConfig: {
    //     gqlTagName: 'gqlEAS',
    //   },
    // },
    './src/__generated__/ees/': {
      documents: './src/lib/graphql/ees/**/*.graphql',
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
    './src/__generated__/airstack/': {
      documents: './src/lib/graphql/airstack/**/*.graphql',
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
