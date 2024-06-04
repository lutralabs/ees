import { newMockEvent } from 'matchstick-as';
import { BigInt, ethereum, Address, Bytes } from '@graphprotocol/graph-ts';
import {
  Endorse as EndorseEvent,
  Donate as DonateEvent,
  Withdraw as WithdrawEvent,
  WithdrawFees as WithdrawFeesEvent,
} from '../generated/EESCore/EESCore';

export function createEndorseEvent(
  from: Address,
  to: Address,
  endorsmentType: string,
  easUid: Bytes,
  logIndex: BigInt,
  donationAmount: BigInt
): EndorseEvent {
  const mockEvent = newMockEvent();
  const event = new EndorseEvent(
    mockEvent.address,
    logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  event.parameters = new Array();

  event.parameters.push(
    new ethereum.EventParam('from', ethereum.Value.fromAddress(from))
  );

  event.parameters.push(
    new ethereum.EventParam('to', ethereum.Value.fromAddress(to))
  );

  event.parameters.push(
    new ethereum.EventParam(
      'endorsmentType',
      ethereum.Value.fromString(endorsmentType)
    )
  );

  event.parameters.push(
    new ethereum.EventParam('uid', ethereum.Value.fromBytes(easUid))
  );

  event.parameters.push(
    new ethereum.EventParam(
      'donationAmount',
      ethereum.Value.fromUnsignedBigInt(donationAmount)
    )
  );

  return event;
}

export function createDonateEvent(
  from: Address,
  to: Address,
  amount: BigInt,
  logIndex: BigInt = BigInt.fromI32(1)
): DonateEvent {
  const mockEvent = newMockEvent();
  const event = new DonateEvent(
    mockEvent.address,
    logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  event.parameters = new Array();

  event.parameters.push(
    new ethereum.EventParam('from', ethereum.Value.fromAddress(from))
  );

  event.parameters.push(
    new ethereum.EventParam('to', ethereum.Value.fromAddress(to))
  );

  event.parameters.push(
    new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
  );

  return event;
}

export function createWithdrawEvent(
  from: Address,
  amount: BigInt
): WithdrawEvent {
  const mockEvent = newMockEvent();
  const event = new WithdrawEvent(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  event.parameters = new Array();

  event.parameters.push(
    new ethereum.EventParam('from', ethereum.Value.fromAddress(from))
  );

  event.parameters.push(
    new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
  );

  return event;
}

export function createWithdrawFeesEvent(
  feeType: string,
  recipient: Address,
  amount: BigInt
): WithdrawFeesEvent {
  const mockEvent = newMockEvent();
  const event = new WithdrawFeesEvent(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  event.parameters = new Array();

  event.parameters.push(
    new ethereum.EventParam('feeType', ethereum.Value.fromString(feeType))
  );

  event.parameters.push(
    new ethereum.EventParam('recipient', ethereum.Value.fromAddress(recipient))
  );

  event.parameters.push(
    new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
  );

  return event;
}
