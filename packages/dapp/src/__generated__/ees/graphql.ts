/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['Bytes']['output'];
  receivedDonations: Array<Donation>;
  receivedEndorsements: Array<Endorsement>;
  sentDonations: Array<Donation>;
  sentEndorsements: Array<Endorsement>;
  totalDonationsReceived: Scalars['BigInt']['output'];
  totalDonationsSent: Scalars['BigInt']['output'];
  withdrawals: Array<Withdrawal>;
};


export type AccountReceivedDonationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Donation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Donation_Filter>;
};


export type AccountReceivedEndorsementsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Endorsement_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Endorsement_Filter>;
};


export type AccountSentDonationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Donation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Donation_Filter>;
};


export type AccountSentEndorsementsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Endorsement_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Endorsement_Filter>;
};


export type AccountWithdrawalsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Withdrawal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Withdrawal_Filter>;
};

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Account_Filter>>>;
  receivedDonations_?: InputMaybe<Donation_Filter>;
  receivedEndorsements_?: InputMaybe<Endorsement_Filter>;
  sentDonations_?: InputMaybe<Donation_Filter>;
  sentEndorsements_?: InputMaybe<Endorsement_Filter>;
  totalDonationsReceived?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationsReceived_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationsReceived_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationsReceived_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDonationsReceived_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationsReceived_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationsReceived_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationsReceived_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDonationsSent?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationsSent_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationsSent_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationsSent_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDonationsSent_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationsSent_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationsSent_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationsSent_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawals_?: InputMaybe<Withdrawal_Filter>;
};

export enum Account_OrderBy {
  Id = 'id',
  ReceivedDonations = 'receivedDonations',
  ReceivedEndorsements = 'receivedEndorsements',
  SentDonations = 'sentDonations',
  SentEndorsements = 'sentEndorsements',
  TotalDonationsReceived = 'totalDonationsReceived',
  TotalDonationsSent = 'totalDonationsSent',
  Withdrawals = 'withdrawals'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Donation = {
  __typename?: 'Donation';
  amount: Scalars['BigInt']['output'];
  from: Account;
  id: Scalars['Bytes']['output'];
  to: Account;
};

export type Donation_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Donation_Filter>>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_?: InputMaybe<Account_Filter>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Donation_Filter>>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_?: InputMaybe<Account_Filter>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Donation_OrderBy {
  Amount = 'amount',
  From = 'from',
  FromId = 'from__id',
  FromTotalDonationsReceived = 'from__totalDonationsReceived',
  FromTotalDonationsSent = 'from__totalDonationsSent',
  Id = 'id',
  To = 'to',
  ToId = 'to__id',
  ToTotalDonationsReceived = 'to__totalDonationsReceived',
  ToTotalDonationsSent = 'to__totalDonationsSent'
}

export type Endorsement = {
  __typename?: 'Endorsement';
  donationAmount: Scalars['BigInt']['output'];
  easUid: Scalars['Bytes']['output'];
  endorsmentType: Scalars['String']['output'];
  from: Account;
  id: Scalars['Bytes']['output'];
  to: Account;
};

export type Endorsement_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Endorsement_Filter>>>;
  donationAmount?: InputMaybe<Scalars['BigInt']['input']>;
  donationAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  donationAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  donationAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  donationAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  donationAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  donationAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  donationAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  easUid?: InputMaybe<Scalars['Bytes']['input']>;
  easUid_contains?: InputMaybe<Scalars['Bytes']['input']>;
  easUid_gt?: InputMaybe<Scalars['Bytes']['input']>;
  easUid_gte?: InputMaybe<Scalars['Bytes']['input']>;
  easUid_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  easUid_lt?: InputMaybe<Scalars['Bytes']['input']>;
  easUid_lte?: InputMaybe<Scalars['Bytes']['input']>;
  easUid_not?: InputMaybe<Scalars['Bytes']['input']>;
  easUid_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  easUid_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  endorsmentType?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_contains?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_ends_with?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_gt?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_gte?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_in?: InputMaybe<Array<Scalars['String']['input']>>;
  endorsmentType_lt?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_lte?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_not?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  endorsmentType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_starts_with?: InputMaybe<Scalars['String']['input']>;
  endorsmentType_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_?: InputMaybe<Account_Filter>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Endorsement_Filter>>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_?: InputMaybe<Account_Filter>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Endorsement_OrderBy {
  DonationAmount = 'donationAmount',
  EasUid = 'easUid',
  EndorsmentType = 'endorsmentType',
  From = 'from',
  FromId = 'from__id',
  FromTotalDonationsReceived = 'from__totalDonationsReceived',
  FromTotalDonationsSent = 'from__totalDonationsSent',
  Id = 'id',
  To = 'to',
  ToId = 'to__id',
  ToTotalDonationsReceived = 'to__totalDonationsReceived',
  ToTotalDonationsSent = 'to__totalDonationsSent'
}

export type FeeWithdrawal = {
  __typename?: 'FeeWithdrawal';
  address: Scalars['Bytes']['output'];
  amount: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  withdrawalType: Scalars['String']['output'];
};

export type FeeWithdrawal_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['Bytes']['input']>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<FeeWithdrawal_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<FeeWithdrawal_Filter>>>;
  withdrawalType?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_contains?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_ends_with?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_gt?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_gte?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_in?: InputMaybe<Array<Scalars['String']['input']>>;
  withdrawalType_lt?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_lte?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_not?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_not_contains?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  withdrawalType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_starts_with?: InputMaybe<Scalars['String']['input']>;
  withdrawalType_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum FeeWithdrawal_OrderBy {
  Address = 'address',
  Amount = 'amount',
  Id = 'id',
  WithdrawalType = 'withdrawalType'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  donation?: Maybe<Donation>;
  donations: Array<Donation>;
  endorsement?: Maybe<Endorsement>;
  endorsements: Array<Endorsement>;
  feeWithdrawal?: Maybe<FeeWithdrawal>;
  feeWithdrawals: Array<FeeWithdrawal>;
  withdrawal?: Maybe<Withdrawal>;
  withdrawals: Array<Withdrawal>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type QueryDonationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDonationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Donation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Donation_Filter>;
};


export type QueryEndorsementArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEndorsementsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Endorsement_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Endorsement_Filter>;
};


export type QueryFeeWithdrawalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFeeWithdrawalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeeWithdrawal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeeWithdrawal_Filter>;
};


export type QueryWithdrawalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWithdrawalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Withdrawal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Withdrawal_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  donation?: Maybe<Donation>;
  donations: Array<Donation>;
  endorsement?: Maybe<Endorsement>;
  endorsements: Array<Endorsement>;
  feeWithdrawal?: Maybe<FeeWithdrawal>;
  feeWithdrawals: Array<FeeWithdrawal>;
  withdrawal?: Maybe<Withdrawal>;
  withdrawals: Array<Withdrawal>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type SubscriptionDonationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDonationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Donation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Donation_Filter>;
};


export type SubscriptionEndorsementArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEndorsementsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Endorsement_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Endorsement_Filter>;
};


export type SubscriptionFeeWithdrawalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFeeWithdrawalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FeeWithdrawal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeeWithdrawal_Filter>;
};


export type SubscriptionWithdrawalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWithdrawalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Withdrawal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Withdrawal_Filter>;
};

export type Withdrawal = {
  __typename?: 'Withdrawal';
  address: Account;
  amount: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
};

export type Withdrawal_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['String']['input']>;
  address_?: InputMaybe<Account_Filter>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  address_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  address_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  address_starts_with?: InputMaybe<Scalars['String']['input']>;
  address_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Withdrawal_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Withdrawal_Filter>>>;
};

export enum Withdrawal_OrderBy {
  Address = 'address',
  AddressId = 'address__id',
  AddressTotalDonationsReceived = 'address__totalDonationsReceived',
  AddressTotalDonationsSent = 'address__totalDonationsSent',
  Amount = 'amount',
  Id = 'id'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetAccountQueryVariables = Exact<{
  address: Scalars['ID']['input'];
}>;


export type GetAccountQuery = { __typename?: 'Query', account?: { __typename?: 'Account', id: any, totalDonationsReceived: any, totalDonationsSent: any } | null };

export type GetAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountsQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', id: any, totalDonationsReceived: any, totalDonationsSent: any }> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const GetAccountDocument = new TypedDocumentString(`
    query GetAccount($address: ID!) {
  account(id: $address) {
    id
    totalDonationsReceived
    totalDonationsSent
  }
}
    `) as unknown as TypedDocumentString<GetAccountQuery, GetAccountQueryVariables>;
export const GetAccountsDocument = new TypedDocumentString(`
    query GetAccounts {
  accounts {
    id
    totalDonationsReceived
    totalDonationsSent
  }
}
    `) as unknown as TypedDocumentString<GetAccountsQuery, GetAccountsQueryVariables>;