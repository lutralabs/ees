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
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  firstDonationReceivedTimestamp?: Maybe<Scalars['BigInt']['output']>;
  firstDonationSentTimestamp?: Maybe<Scalars['BigInt']['output']>;
  firstEndorsementReceivedTimestamp?: Maybe<Scalars['BigInt']['output']>;
  firstEndorsementSentTimestamp?: Maybe<Scalars['BigInt']['output']>;
  id: Scalars['Bytes']['output'];
  receivedDonations: Array<Donation>;
  receivedEndorsements: Array<Endorsement>;
  sentDonations: Array<Donation>;
  sentEndorsements: Array<Endorsement>;
  totalDonationsReceived: Scalars['BigInt']['output'];
  totalDonationsSent: Scalars['BigInt']['output'];
  totalEndorsementsReceived: Scalars['BigInt']['output'];
  totalEndorsementsSent: Scalars['BigInt']['output'];
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
  firstDonationReceivedTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  firstDonationReceivedTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  firstDonationReceivedTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  firstDonationReceivedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  firstDonationReceivedTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  firstDonationReceivedTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  firstDonationReceivedTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  firstDonationReceivedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  firstDonationSentTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  firstDonationSentTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  firstDonationSentTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  firstDonationSentTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  firstDonationSentTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  firstDonationSentTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  firstDonationSentTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  firstDonationSentTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  firstEndorsementReceivedTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  firstEndorsementReceivedTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  firstEndorsementReceivedTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  firstEndorsementReceivedTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  firstEndorsementReceivedTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  firstEndorsementReceivedTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  firstEndorsementReceivedTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  firstEndorsementReceivedTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  firstEndorsementSentTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  firstEndorsementSentTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  firstEndorsementSentTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  firstEndorsementSentTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  firstEndorsementSentTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  firstEndorsementSentTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  firstEndorsementSentTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  firstEndorsementSentTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  totalEndorsementsReceived?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsementsReceived_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsementsReceived_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsementsReceived_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalEndorsementsReceived_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsementsReceived_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsementsReceived_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsementsReceived_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalEndorsementsSent?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsementsSent_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsementsSent_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsementsSent_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalEndorsementsSent_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsementsSent_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsementsSent_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsementsSent_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawals_?: InputMaybe<Withdrawal_Filter>;
};

export enum Account_OrderBy {
  FirstDonationReceivedTimestamp = 'firstDonationReceivedTimestamp',
  FirstDonationSentTimestamp = 'firstDonationSentTimestamp',
  FirstEndorsementReceivedTimestamp = 'firstEndorsementReceivedTimestamp',
  FirstEndorsementSentTimestamp = 'firstEndorsementSentTimestamp',
  Id = 'id',
  ReceivedDonations = 'receivedDonations',
  ReceivedEndorsements = 'receivedEndorsements',
  SentDonations = 'sentDonations',
  SentEndorsements = 'sentEndorsements',
  TotalDonationsReceived = 'totalDonationsReceived',
  TotalDonationsSent = 'totalDonationsSent',
  TotalEndorsementsReceived = 'totalEndorsementsReceived',
  TotalEndorsementsSent = 'totalEndorsementsSent',
  Withdrawals = 'withdrawals'
}

export type AggregatedInformation = {
  __typename?: 'AggregatedInformation';
  donationAmount: Scalars['BigInt']['output'];
  endorsementCount: Scalars['BigInt']['output'];
  from: Account;
  id: Scalars['Bytes']['output'];
  to: Account;
};

export type AggregatedInformation_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AggregatedInformation_Filter>>>;
  donationAmount?: InputMaybe<Scalars['BigInt']['input']>;
  donationAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  donationAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  donationAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  donationAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  donationAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  donationAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  donationAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endorsementCount?: InputMaybe<Scalars['BigInt']['input']>;
  endorsementCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endorsementCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endorsementCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endorsementCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endorsementCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endorsementCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  endorsementCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<AggregatedInformation_Filter>>>;
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

export enum AggregatedInformation_OrderBy {
  DonationAmount = 'donationAmount',
  EndorsementCount = 'endorsementCount',
  From = 'from',
  FromFirstDonationReceivedTimestamp = 'from__firstDonationReceivedTimestamp',
  FromFirstDonationSentTimestamp = 'from__firstDonationSentTimestamp',
  FromFirstEndorsementReceivedTimestamp = 'from__firstEndorsementReceivedTimestamp',
  FromFirstEndorsementSentTimestamp = 'from__firstEndorsementSentTimestamp',
  FromId = 'from__id',
  FromTotalDonationsReceived = 'from__totalDonationsReceived',
  FromTotalDonationsSent = 'from__totalDonationsSent',
  FromTotalEndorsementsReceived = 'from__totalEndorsementsReceived',
  FromTotalEndorsementsSent = 'from__totalEndorsementsSent',
  Id = 'id',
  To = 'to',
  ToFirstDonationReceivedTimestamp = 'to__firstDonationReceivedTimestamp',
  ToFirstDonationSentTimestamp = 'to__firstDonationSentTimestamp',
  ToFirstEndorsementReceivedTimestamp = 'to__firstEndorsementReceivedTimestamp',
  ToFirstEndorsementSentTimestamp = 'to__firstEndorsementSentTimestamp',
  ToId = 'to__id',
  ToTotalDonationsReceived = 'to__totalDonationsReceived',
  ToTotalDonationsSent = 'to__totalDonationsSent',
  ToTotalEndorsementsReceived = 'to__totalEndorsementsReceived',
  ToTotalEndorsementsSent = 'to__totalEndorsementsSent'
}

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
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
  createdAtTimestamp: Scalars['BigInt']['output'];
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
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  CreatedAtTimestamp = 'createdAtTimestamp',
  From = 'from',
  FromFirstDonationReceivedTimestamp = 'from__firstDonationReceivedTimestamp',
  FromFirstDonationSentTimestamp = 'from__firstDonationSentTimestamp',
  FromFirstEndorsementReceivedTimestamp = 'from__firstEndorsementReceivedTimestamp',
  FromFirstEndorsementSentTimestamp = 'from__firstEndorsementSentTimestamp',
  FromId = 'from__id',
  FromTotalDonationsReceived = 'from__totalDonationsReceived',
  FromTotalDonationsSent = 'from__totalDonationsSent',
  FromTotalEndorsementsReceived = 'from__totalEndorsementsReceived',
  FromTotalEndorsementsSent = 'from__totalEndorsementsSent',
  Id = 'id',
  To = 'to',
  ToFirstDonationReceivedTimestamp = 'to__firstDonationReceivedTimestamp',
  ToFirstDonationSentTimestamp = 'to__firstDonationSentTimestamp',
  ToFirstEndorsementReceivedTimestamp = 'to__firstEndorsementReceivedTimestamp',
  ToFirstEndorsementSentTimestamp = 'to__firstEndorsementSentTimestamp',
  ToId = 'to__id',
  ToTotalDonationsReceived = 'to__totalDonationsReceived',
  ToTotalDonationsSent = 'to__totalDonationsSent',
  ToTotalEndorsementsReceived = 'to__totalEndorsementsReceived',
  ToTotalEndorsementsSent = 'to__totalEndorsementsSent'
}

export type Endorsement = {
  __typename?: 'Endorsement';
  createdAtTimestamp: Scalars['BigInt']['output'];
  donationAmount: Scalars['BigInt']['output'];
  easUid: Scalars['Bytes']['output'];
  endorsementType: Scalars['String']['output'];
  from: Account;
  id: Scalars['Bytes']['output'];
  to: Account;
};

export type Endorsement_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Endorsement_Filter>>>;
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  endorsementType?: InputMaybe<Scalars['String']['input']>;
  endorsementType_contains?: InputMaybe<Scalars['String']['input']>;
  endorsementType_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  endorsementType_ends_with?: InputMaybe<Scalars['String']['input']>;
  endorsementType_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  endorsementType_gt?: InputMaybe<Scalars['String']['input']>;
  endorsementType_gte?: InputMaybe<Scalars['String']['input']>;
  endorsementType_in?: InputMaybe<Array<Scalars['String']['input']>>;
  endorsementType_lt?: InputMaybe<Scalars['String']['input']>;
  endorsementType_lte?: InputMaybe<Scalars['String']['input']>;
  endorsementType_not?: InputMaybe<Scalars['String']['input']>;
  endorsementType_not_contains?: InputMaybe<Scalars['String']['input']>;
  endorsementType_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  endorsementType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  endorsementType_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  endorsementType_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  endorsementType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  endorsementType_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  endorsementType_starts_with?: InputMaybe<Scalars['String']['input']>;
  endorsementType_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
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
  CreatedAtTimestamp = 'createdAtTimestamp',
  DonationAmount = 'donationAmount',
  EasUid = 'easUid',
  EndorsementType = 'endorsementType',
  From = 'from',
  FromFirstDonationReceivedTimestamp = 'from__firstDonationReceivedTimestamp',
  FromFirstDonationSentTimestamp = 'from__firstDonationSentTimestamp',
  FromFirstEndorsementReceivedTimestamp = 'from__firstEndorsementReceivedTimestamp',
  FromFirstEndorsementSentTimestamp = 'from__firstEndorsementSentTimestamp',
  FromId = 'from__id',
  FromTotalDonationsReceived = 'from__totalDonationsReceived',
  FromTotalDonationsSent = 'from__totalDonationsSent',
  FromTotalEndorsementsReceived = 'from__totalEndorsementsReceived',
  FromTotalEndorsementsSent = 'from__totalEndorsementsSent',
  Id = 'id',
  To = 'to',
  ToFirstDonationReceivedTimestamp = 'to__firstDonationReceivedTimestamp',
  ToFirstDonationSentTimestamp = 'to__firstDonationSentTimestamp',
  ToFirstEndorsementReceivedTimestamp = 'to__firstEndorsementReceivedTimestamp',
  ToFirstEndorsementSentTimestamp = 'to__firstEndorsementSentTimestamp',
  ToId = 'to__id',
  ToTotalDonationsReceived = 'to__totalDonationsReceived',
  ToTotalDonationsSent = 'to__totalDonationsSent',
  ToTotalEndorsementsReceived = 'to__totalEndorsementsReceived',
  ToTotalEndorsementsSent = 'to__totalEndorsementsSent'
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

export type GlobalStatistics = {
  __typename?: 'GlobalStatistics';
  id: Scalars['Bytes']['output'];
  totalDonationAmount: Scalars['BigInt']['output'];
  totalDonations: Scalars['BigInt']['output'];
  totalEndorsements: Scalars['BigInt']['output'];
  totalWithdrawnAmount: Scalars['BigInt']['output'];
};

export type GlobalStatistics_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GlobalStatistics_Filter>>>;
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
  or?: InputMaybe<Array<InputMaybe<GlobalStatistics_Filter>>>;
  totalDonationAmount?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDonationAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonationAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDonations?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonations_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonations_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonations_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDonations_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonations_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonations_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalDonations_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalEndorsements?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsements_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsements_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsements_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalEndorsements_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsements_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsements_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalEndorsements_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalWithdrawnAmount?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawnAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawnAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawnAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalWithdrawnAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawnAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawnAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawnAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum GlobalStatistics_OrderBy {
  Id = 'id',
  TotalDonationAmount = 'totalDonationAmount',
  TotalDonations = 'totalDonations',
  TotalEndorsements = 'totalEndorsements',
  TotalWithdrawnAmount = 'totalWithdrawnAmount'
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
  aggregatedInformation?: Maybe<AggregatedInformation>;
  aggregatedInformations: Array<AggregatedInformation>;
  donation?: Maybe<Donation>;
  donations: Array<Donation>;
  endorsement?: Maybe<Endorsement>;
  endorsements: Array<Endorsement>;
  feeWithdrawal?: Maybe<FeeWithdrawal>;
  feeWithdrawals: Array<FeeWithdrawal>;
  globalStatistics?: Maybe<GlobalStatistics>;
  globalStatistics_collection: Array<GlobalStatistics>;
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


export type QueryAggregatedInformationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAggregatedInformationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AggregatedInformation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AggregatedInformation_Filter>;
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


export type QueryGlobalStatisticsArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGlobalStatistics_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GlobalStatistics_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GlobalStatistics_Filter>;
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
  aggregatedInformation?: Maybe<AggregatedInformation>;
  aggregatedInformations: Array<AggregatedInformation>;
  donation?: Maybe<Donation>;
  donations: Array<Donation>;
  endorsement?: Maybe<Endorsement>;
  endorsements: Array<Endorsement>;
  feeWithdrawal?: Maybe<FeeWithdrawal>;
  feeWithdrawals: Array<FeeWithdrawal>;
  globalStatistics?: Maybe<GlobalStatistics>;
  globalStatistics_collection: Array<GlobalStatistics>;
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


export type SubscriptionAggregatedInformationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAggregatedInformationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AggregatedInformation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AggregatedInformation_Filter>;
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


export type SubscriptionGlobalStatisticsArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGlobalStatistics_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GlobalStatistics_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GlobalStatistics_Filter>;
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
  createdAtTimestamp: Scalars['BigInt']['output'];
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
  createdAtTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  AddressFirstDonationReceivedTimestamp = 'address__firstDonationReceivedTimestamp',
  AddressFirstDonationSentTimestamp = 'address__firstDonationSentTimestamp',
  AddressFirstEndorsementReceivedTimestamp = 'address__firstEndorsementReceivedTimestamp',
  AddressFirstEndorsementSentTimestamp = 'address__firstEndorsementSentTimestamp',
  AddressId = 'address__id',
  AddressTotalDonationsReceived = 'address__totalDonationsReceived',
  AddressTotalDonationsSent = 'address__totalDonationsSent',
  AddressTotalEndorsementsReceived = 'address__totalEndorsementsReceived',
  AddressTotalEndorsementsSent = 'address__totalEndorsementsSent',
  Amount = 'amount',
  CreatedAtTimestamp = 'createdAtTimestamp',
  Id = 'id'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
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

export type GetAggregatedAccountDataQueryVariables = Exact<{
  account: Scalars['ID']['input'];
}>;


export type GetAggregatedAccountDataQuery = { __typename?: 'Query', account?: { __typename?: 'Account', id: any, totalEndorsementsReceived: any, totalEndorsementsSent: any, totalDonationsReceived: any, totalDonationsSent: any } | null };

export type GetEndorsementsForAccountPaginatedQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type GetEndorsementsForAccountPaginatedQuery = { __typename?: 'Query', account?: { __typename?: 'Account', receivedEndorsements: Array<{ __typename?: 'Endorsement', id: any, createdAtTimestamp: any, endorsementType: string, donationAmount: any, easUid: any, from: { __typename?: 'Account', id: any } }> } | null };

export type GetGlobalStatisticsQueryVariables = Exact<{
  id?: Scalars['ID']['input'];
}>;


export type GetGlobalStatisticsQuery = { __typename?: 'Query', globalStatistics?: { __typename?: 'GlobalStatistics', id: any, totalEndorsements: any, totalDonations: any, totalDonationAmount: any, totalWithdrawnAmount: any } | null };

export type GetTopEndorsersAndDonatorsQueryVariables = Exact<{
  account: Scalars['String']['input'];
}>;


export type GetTopEndorsersAndDonatorsQuery = { __typename?: 'Query', topEndorsers: Array<{ __typename?: 'AggregatedInformation', id: any, from: { __typename?: 'Account', id: any } }>, topDonators: Array<{ __typename?: 'AggregatedInformation', id: any, donationAmount: any, from: { __typename?: 'Account', id: any } }> };

export type GetTopEndorsersForAccountQueryVariables = Exact<{
  account: Scalars['String']['input'];
  first: Scalars['Int']['input'];
}>;


export type GetTopEndorsersForAccountQuery = { __typename?: 'Query', topEndorsers: Array<{ __typename?: 'AggregatedInformation', id: any, from: { __typename?: 'Account', id: any, totalEndorsementsReceived: any, sentEndorsements: Array<{ __typename?: 'Endorsement', endorsementType: string, easUid: any }> } }> };

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

export const GetAggregatedAccountDataDocument = new TypedDocumentString(`
    query GetAggregatedAccountData($account: ID!) {
  account(id: $account) {
    id
    totalEndorsementsReceived
    totalEndorsementsSent
    totalDonationsReceived
    totalDonationsSent
  }
}
    `) as unknown as TypedDocumentString<GetAggregatedAccountDataQuery, GetAggregatedAccountDataQueryVariables>;
export const GetEndorsementsForAccountPaginatedDocument = new TypedDocumentString(`
    query GetEndorsementsForAccountPaginated($id: ID!, $first: Int!, $skip: Int!) {
  account(id: $id) {
    receivedEndorsements(
      orderBy: createdAtTimestamp
      orderDirection: desc
      first: $first
      skip: $skip
    ) {
      id
      from {
        id
      }
      createdAtTimestamp
      endorsementType
      donationAmount
      easUid
    }
  }
}
    `) as unknown as TypedDocumentString<GetEndorsementsForAccountPaginatedQuery, GetEndorsementsForAccountPaginatedQueryVariables>;
export const GetGlobalStatisticsDocument = new TypedDocumentString(`
    query GetGlobalStatistics($id: ID! = "0x476c6f62616c53746174697374696373") {
  globalStatistics(id: $id) {
    id
    totalEndorsements
    totalDonations
    totalDonationAmount
    totalWithdrawnAmount
  }
}
    `) as unknown as TypedDocumentString<GetGlobalStatisticsQuery, GetGlobalStatisticsQueryVariables>;
export const GetTopEndorsersAndDonatorsDocument = new TypedDocumentString(`
    query GetTopEndorsersAndDonators($account: String!) {
  topEndorsers: aggregatedInformations(
    where: {to: $account}
    orderBy: from__totalEndorsementsReceived
    orderDirection: desc
    first: 6
  ) {
    id
    from {
      id
    }
  }
  topDonators: aggregatedInformations(
    where: {to: $account, donationAmount_gt: 0}
    orderBy: donationAmount
    orderDirection: desc
    first: 6
  ) {
    id
    from {
      id
    }
    donationAmount
  }
}
    `) as unknown as TypedDocumentString<GetTopEndorsersAndDonatorsQuery, GetTopEndorsersAndDonatorsQueryVariables>;
export const GetTopEndorsersForAccountDocument = new TypedDocumentString(`
    query GetTopEndorsersForAccount($account: String!, $first: Int!) {
  topEndorsers: aggregatedInformations(
    where: {to: $account}
    orderBy: from__totalEndorsementsReceived
    orderDirection: desc
    first: $first
  ) {
    id
    from {
      id
      totalEndorsementsReceived
      sentEndorsements(where: {to: $account}) {
        endorsementType
        easUid
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetTopEndorsersForAccountQuery, GetTopEndorsersForAccountQueryVariables>;