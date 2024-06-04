import { BigInt, Bytes, log } from '@graphprotocol/graph-ts';
import {
  Endorse as EndorseEvent,
  Donate as DonateEvent,
  Withdraw as WithdrawEvent,
  WithdrawFees as WithdrawFeesEvent,
} from '../generated/EESCore/EESCore';

import {
  Account,
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
    account.save();
  }

  return account;
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
