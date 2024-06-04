import { GetAccountsDocument } from '@/__generated__/ees/graphql';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { formatEther } from 'viem';

const client = new ApolloClient({
  uri: 'http://localhost:8000/subgraphs/name/ees',
  cache: new InMemoryCache(),
});

client
  .query({
    query: GetAccountsDocument,
  })
  .then((res) => {
    for (const account of res.data.accounts) {
      console.log({
        id: account.id,
        totalDonationsReceived: `${formatEther(
          account.totalDonationsReceived
        )} ETH`,
        totalDonationsSent: `${formatEther(account.totalDonationsSent)} ETH`,
      });
    }
  });
