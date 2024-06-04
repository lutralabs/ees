import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    './src/__generated__/eas/': {
      documents: './src/lib/graphql/eas/**/*.graphql',
      schema: 'https://base.easscan.org/graphql',
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gqlEAS',
      },
    },
    './src/__generated__/ees/': {
      documents: './src/lib/graphql/ees/**/*.graphql',
      schema: 'http://0.0.0.0:8000/subgraphs/name/ees',
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gqlEES',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
