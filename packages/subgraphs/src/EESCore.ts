import { BigInt, Bytes, log } from '@graphprotocol/graph-ts';
import {
  Endorse as EndorseEvent,
  Donate as DonateEvent,
  Withdraw as WithdrawEvent,
  WithdrawFees as WithdrawFeesEvent,
} from '../generated/EESCore/EESCore';

import {
  Account,
  AggregatedInformation,
  Donation,
  Endorsement,
  FeeWithdrawal,
  Withdrawal,
} from '../generated/schema';

const createOrLoadAccount = (address: Bytes): Account => {
  let account = Account.load(address);

  if (account == null) {
    account = new Account(address);
    account.totalDonationsReceived = BigInt.fromI32(0);
    account.totalDonationsSent = BigInt.fromI32(0);
    account.totalEndorsementsReceived = BigInt.fromI32(0);
    account.totalEndorsementsSent = BigInt.fromI32(0);
    account.save();
  }

  return account;
};

const createOrLoadAggregatedInformation = (
  from: Bytes,
  to: Bytes
): AggregatedInformation => {
  const id = Bytes.fromUTF8(`${from.toHexString()}-${to.toHexString()}`);

  let aggregatedInformation = AggregatedInformation.load(id);

  if (aggregatedInformation == null) {
    aggregatedInformation = new AggregatedInformation(id);
    aggregatedInformation.from = from;
    aggregatedInformation.to = to;
    aggregatedInformation.donationAmount = BigInt.fromI32(0);
    aggregatedInformation.endorsementCount = BigInt.fromI32(0);
    aggregatedInformation.save();
  }

  return aggregatedInformation;
};

export function handleDonate(event: DonateEvent): void {
  // Create or load accounts
  const fromAccount = createOrLoadAccount(event.params.from);
  const toAccount = createOrLoadAccount(event.params.to);

  // Create donation
  const donation = new Donation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  donation.from = fromAccount.id;
  donation.to = toAccount.id;
  donation.amount = event.params.amount;

  donation.save();

  // Update account donations sent
  fromAccount.totalDonationsSent = fromAccount.totalDonationsSent.plus(
    donation.amount
  );
  fromAccount.save();

  // Update account donations received
  toAccount.totalDonationsReceived = toAccount.totalDonationsReceived.plus(
    donation.amount
  );
  toAccount.save();

  // Update aggregated information
  const aggregatedInformation = createOrLoadAggregatedInformation(
    fromAccount.id,
    toAccount.id
  );

  aggregatedInformation.donationAmount =
    aggregatedInformation.donationAmount.plus(donation.amount);
  aggregatedInformation.save();
}

export function handleEndorse(event: EndorseEvent): void {
  // Create or load accounts
  const fromAccount = createOrLoadAccount(event.params.endorser);
  const toAccount = createOrLoadAccount(event.params.endorsee);

  // Create endorsement
  const endorsement = new Endorsement(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  endorsement.from = fromAccount.id;
  endorsement.to = toAccount.id;
  endorsement.endorsmentType = event.params.endorsementType;
  endorsement.easUid = event.params.uid;
  endorsement.donationAmount = event.params.donationAmount;

  endorsement.save();

  // Update account endorsements sent
  fromAccount.totalEndorsementsSent = fromAccount.totalEndorsementsSent.plus(
    BigInt.fromI32(1)
  );
  fromAccount.save();

  // Update account endorsements received
  toAccount.totalEndorsementsReceived =
    toAccount.totalEndorsementsReceived.plus(BigInt.fromI32(1));
  toAccount.save();

  // Update aggregated information
  const aggregatedInformation = createOrLoadAggregatedInformation(
    fromAccount.id,
    toAccount.id
  );

  aggregatedInformation.endorsementCount =
    aggregatedInformation.endorsementCount.plus(BigInt.fromI32(1));
  aggregatedInformation.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  // Create or load account
  const account = createOrLoadAccount(event.params.from);

  // Create withdrawal
  const withdrawal = new Withdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  withdrawal.address = account.id;
  withdrawal.amount = event.params.amount;

  withdrawal.save();
}

export function handleWithdrawFees(event: WithdrawFeesEvent): void {
  const feeWithdrawal = new FeeWithdrawal(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  feeWithdrawal.withdrawalType = event.params.feeType;
  feeWithdrawal.address = event.params.recipient;
  feeWithdrawal.amount = event.params.amount;

  feeWithdrawal.save();
}
