import {
  assert,
  describe,
  test,
  clearStore,
  beforeEach,
} from 'matchstick-as/assembly/index';
import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  handleEndorse,
  handleDonate,
  handleWithdraw,
  handleWithdrawFees,
} from '../src/EESCore';
import {
  createDonateEvent,
  createEndorseEvent,
  createWithdrawEvent,
  createWithdrawFeesEvent,
} from './ees-utils';
import {
  Account,
  AggregatedInformation,
  Donation,
  Endorsement,
  FeeWithdrawal,
  Withdrawal,
} from '../generated/schema';

const TEST_ACCOUNTS = [
  '0xE3E0615413285e55A5bE377AB2e490297D029A02',
  '0x9c34E45Bf7aD859eb6e266895Eb914752894c2cc',
  '0x5B60B17e2c49ce991453f543aC909121af414411',
];

describe('Describe entity assertions', () => {
  beforeEach(() => {
    clearStore();
  });

  describe('Endorsement', () => {
    test('Endorsement created and stored', () => {
      const from = Address.fromString(TEST_ACCOUNTS[0]);
      const to = Address.fromString(TEST_ACCOUNTS[1]);
      const endorsmentType = 'Developer';
      const easUid = Bytes.fromHexString(
        '0xb03f4550dec1c92b8183d4ffbfe55772165257eb588b3a77bdbfa06a54d0c483'
      );

      const newEndorseEvent = createEndorseEvent(
        from,
        to,
        endorsmentType,
        easUid,
        BigInt.fromI32(1),
        BigInt.fromI32(42)
      );

      handleEndorse(newEndorseEvent);

      const endorsement = Endorsement.load(
        Bytes.fromHexString(
          '0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000'
        )
      );

      // Assert Endorsement entity was created and stored
      assert.entityCount('Endorsement', 1);
      assert.assertNotNull(endorsement);
      assert.stringEquals(endorsement!.from.toHex(), from.toHex());
      assert.stringEquals(endorsement!.to.toHex(), to.toHex());
      assert.stringEquals(endorsement!.endorsmentType, endorsmentType);
      assert.stringEquals(endorsement!.easUid.toHex(), easUid.toHex());
      assert.bigIntEquals(endorsement!.donationAmount, BigInt.fromI32(42));

      // Assert Accounts were created and stored
      assert.entityCount('Account', 2);
      const accountFrom = Account.load(from);
      assert.assertNotNull(accountFrom);
      assert.i32Equals(accountFrom!.sentEndorsements.load().length, 1);
      assert.i32Equals(accountFrom!.receivedEndorsements.load().length, 0);
      assert.i32Equals(accountFrom!.totalEndorsementsSent.toI32(), 1);
      assert.i32Equals(accountFrom!.totalEndorsementsReceived.toI32(), 0);
      const accountTo = Account.load(to);
      assert.assertNotNull(accountTo);
      assert.i32Equals(accountTo!.sentEndorsements.load().length, 0);
      assert.i32Equals(accountTo!.receivedEndorsements.load().length, 1);
      assert.i32Equals(accountTo!.totalEndorsementsSent.toI32(), 0);
      assert.i32Equals(accountTo!.totalEndorsementsReceived.toI32(), 1);

      // Assert AggregatedInformation was created and stored
      assert.entityCount('AggregatedInformation', 1);
      const aggregatedInformation = AggregatedInformation.load(
        Bytes.fromUTF8(`${from.toHexString()}-${to.toHexString()}`)
      );

      assert.assertNotNull(aggregatedInformation);
      assert.stringEquals(aggregatedInformation!.from.toHex(), from.toHex());
      assert.stringEquals(aggregatedInformation!.to.toHex(), to.toHex());
      assert.bigIntEquals(
        aggregatedInformation!.endorsementCount,
        BigInt.fromI32(1)
      );
    });

    test('Multiple endorsements created and stored', () => {
      let newEndorseEvent = createEndorseEvent(
        Address.fromString(TEST_ACCOUNTS[0]),
        Address.fromString(TEST_ACCOUNTS[1]),
        'Developer',
        Bytes.fromHexString(
          '0xb03f4550dec1c92b8183d4ffbfe55772165257eb588b3a77bdbfa06a54d0c483'
        ),
        BigInt.fromI32(1),
        BigInt.fromI32(1)
      );
      handleEndorse(newEndorseEvent);

      newEndorseEvent = createEndorseEvent(
        Address.fromString(TEST_ACCOUNTS[0]),
        Address.fromString(TEST_ACCOUNTS[2]),
        'Developer',
        Bytes.fromHexString(
          '0x323f15542940c9f346dbef380e684fc8d8d99d96aa0cb85d9254ff9c30a6562b'
        ),
        BigInt.fromI32(2),
        BigInt.fromI32(0)
      );
      handleEndorse(newEndorseEvent);

      newEndorseEvent = createEndorseEvent(
        Address.fromString(TEST_ACCOUNTS[2]),
        Address.fromString(TEST_ACCOUNTS[1]),
        'Artist',
        Bytes.fromHexString(
          '0xe272666f50b81dd4654decc1c2998c7bb2402536113c1082570babf7e870a387'
        ),
        BigInt.fromI32(3),
        BigInt.fromI32(21)
      );
      handleEndorse(newEndorseEvent);

      // Assert all endorsement entities were created and stored
      assert.entityCount('Endorsement', 3);

      const account1 = Account.load(Address.fromString(TEST_ACCOUNTS[0]));
      assert.assertNotNull(account1);
      assert.i32Equals(account1!.sentEndorsements.load().length, 2);
      assert.i32Equals(account1!.receivedEndorsements.load().length, 0);

      const account2 = Account.load(Address.fromString(TEST_ACCOUNTS[1]));
      assert.assertNotNull(account2);
      assert.i32Equals(account2!.sentEndorsements.load().length, 0);
      assert.i32Equals(account2!.receivedEndorsements.load().length, 2);

      const account3 = Account.load(Address.fromString(TEST_ACCOUNTS[2]));
      assert.assertNotNull(account3);
      assert.i32Equals(account3!.sentEndorsements.load().length, 1);
      assert.i32Equals(account3!.receivedEndorsements.load().length, 1);

      // Assert AggregatedInformation was created and stored
      assert.entityCount('AggregatedInformation', 3);
    });
  });
  describe('Donation', () => {
    test('Donation created and stored', () => {
      const from = Address.fromString(TEST_ACCOUNTS[0]);
      const to = Address.fromString(TEST_ACCOUNTS[1]);
      const amount = BigInt.fromI32(42);
      const newDonateEvent = createDonateEvent(from, to, amount);

      handleDonate(newDonateEvent);

      const donation = Donation.load(
        Bytes.fromHexString(
          '0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000'
        )
      );

      // Assert Donation entity was created and stored
      assert.entityCount('Donation', 1);
      assert.assertNotNull(donation);
      assert.stringEquals(donation!.from.toHex(), from.toHex());
      assert.stringEquals(donation!.to.toHex(), to.toHex());
      assert.stringEquals(donation!.amount.toString(), amount.toString());

      // Assert Accounts were created and stored
      assert.entityCount('Account', 2);
      const accountFrom = Account.load(from);
      assert.assertNotNull(accountFrom);
      assert.i32Equals(accountFrom!.sentDonations.load().length, 1);
      assert.i32Equals(accountFrom!.receivedDonations.load().length, 0);
      assert.i32Equals(accountFrom!.totalDonationsSent.toI32(), 42);
      assert.i32Equals(accountFrom!.totalDonationsReceived.toI32(), 0);
      const accountTo = Account.load(to);
      assert.assertNotNull(accountTo);
      assert.i32Equals(accountTo!.sentDonations.load().length, 0);
      assert.i32Equals(accountTo!.receivedDonations.load().length, 1);
      assert.i32Equals(accountTo!.totalDonationsSent.toI32(), 0);
      assert.i32Equals(accountTo!.totalDonationsReceived.toI32(), 42);

      // Assert AggregatedInformation was created and stored
      assert.entityCount('AggregatedInformation', 1);
      const aggregatedInformation = AggregatedInformation.load(
        Bytes.fromUTF8(`${from.toHexString()}-${to.toHexString()}`)
      );

      assert.assertNotNull(aggregatedInformation);
      assert.stringEquals(aggregatedInformation!.from.toHex(), from.toHex());
      assert.stringEquals(aggregatedInformation!.to.toHex(), to.toHex());
      assert.bigIntEquals(
        aggregatedInformation!.donationAmount,
        BigInt.fromI32(42)
      );
    });

    test('Multiple donations created and stored', () => {
      let newDonateEvent = createDonateEvent(
        Address.fromString(TEST_ACCOUNTS[0]),
        Address.fromString(TEST_ACCOUNTS[1]),
        BigInt.fromI32(42)
      );
      handleDonate(newDonateEvent);

      newDonateEvent = createDonateEvent(
        Address.fromString(TEST_ACCOUNTS[0]),
        Address.fromString(TEST_ACCOUNTS[2]),
        BigInt.fromI32(42),
        BigInt.fromI32(2)
      );
      handleDonate(newDonateEvent);

      newDonateEvent = createDonateEvent(
        Address.fromString(TEST_ACCOUNTS[1]),
        Address.fromString(TEST_ACCOUNTS[2]),
        BigInt.fromI32(13),
        BigInt.fromI32(3)
      );
      handleDonate(newDonateEvent);

      // Assert all donation entities were created and stored
      assert.entityCount('Donation', 3);

      const account1 = Account.load(Address.fromString(TEST_ACCOUNTS[0]));
      assert.assertNotNull(account1);
      assert.i32Equals(account1!.sentDonations.load().length, 2);
      assert.i32Equals(account1!.receivedDonations.load().length, 0);
      assert.bigIntEquals(account1!.totalDonationsReceived, BigInt.fromI32(0));
      assert.bigIntEquals(account1!.totalDonationsSent, BigInt.fromI32(84));

      const account2 = Account.load(Address.fromString(TEST_ACCOUNTS[1]));
      assert.assertNotNull(account2);
      assert.i32Equals(account2!.sentDonations.load().length, 1);
      assert.i32Equals(account2!.receivedDonations.load().length, 1);
      assert.bigIntEquals(account2!.totalDonationsReceived, BigInt.fromI32(42));
      assert.bigIntEquals(account2!.totalDonationsSent, BigInt.fromI32(13));

      const account3 = Account.load(Address.fromString(TEST_ACCOUNTS[2]));
      assert.assertNotNull(account3);
      assert.i32Equals(account3!.sentDonations.load().length, 0);
      assert.i32Equals(account3!.receivedDonations.load().length, 2);
      assert.bigIntEquals(account3!.totalDonationsReceived, BigInt.fromI32(55));
      assert.bigIntEquals(account3!.totalDonationsSent, BigInt.fromI32(0));

      // Assert AggregatedInformation was created and stored
      assert.entityCount('AggregatedInformation', 3);
    });
  });
  describe('Withdrawal', () => {
    test('Withdrawal created and stored', () => {
      const from = Address.fromString(TEST_ACCOUNTS[0]);
      const amount = BigInt.fromI32(42);
      const newWithdrawEvent = createWithdrawEvent(from, amount);

      handleWithdraw(newWithdrawEvent);

      const withdrawal = Withdrawal.load(
        Bytes.fromHexString(
          '0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000'
        )
      );

      // Assert Withdrawal entity was created and stored
      assert.entityCount('Withdrawal', 1);
      assert.assertNotNull(withdrawal);
      assert.stringEquals(withdrawal!.address.toHex(), from.toHex());
      assert.stringEquals(withdrawal!.amount.toString(), amount.toString());
    });
  });
  describe('FeeWithdrawal', () => {
    test('FeesWithdrawal created and stored', () => {
      const recipient = Address.fromString(TEST_ACCOUNTS[0]);
      const amount = BigInt.fromI32(42);

      const newWithdrawFeesEvent = createWithdrawFeesEvent(
        'ALL',
        recipient,
        amount
      );

      handleWithdrawFees(newWithdrawFeesEvent);

      const feeWithdrawal = FeeWithdrawal.load(
        Bytes.fromHexString(
          '0xa16081f360e3847006db660bae1c6d1b2e17ec2a01000000'
        )
      );

      // Assert Fee entity was created and stored
      assert.entityCount('FeeWithdrawal', 1);
      assert.assertNotNull(feeWithdrawal);
      // The `as i32` cast is needed because it tells the compiler that the conversion is intentional
      assert.stringEquals(feeWithdrawal!.withdrawalType, 'ALL');
      assert.stringEquals(feeWithdrawal!.address.toHex(), recipient.toHex());
      assert.bigIntEquals(feeWithdrawal!.amount, amount);
    });
  });
  describe('AggregatedInformation', () => {
    test('AggregatedInformation updated', () => {
      const from = Address.fromString(TEST_ACCOUNTS[0]);
      const to = Address.fromString(TEST_ACCOUNTS[1]);
      const amount = BigInt.fromI32(42);

      // Create donate events (`from` and `to` are always the same accounts)
      let newDonateEvent = createDonateEvent(from, to, amount);
      handleDonate(newDonateEvent);
      newDonateEvent = createDonateEvent(from, to, amount, BigInt.fromI32(2));
      handleDonate(newDonateEvent);
      newDonateEvent = createDonateEvent(from, to, amount, BigInt.fromI32(3));
      handleDonate(newDonateEvent);
      newDonateEvent = createDonateEvent(from, to, amount, BigInt.fromI32(4));
      handleDonate(newDonateEvent);

      let newEndorseEvent = createEndorseEvent(
        from,
        to,
        'Developer',
        Bytes.fromHexString(
          '0xb03f4550dec1c92b8183d4ffbfe55772165257eb588b3a77bdbfa06a54d0c483'
        ),
        BigInt.fromI32(1),
        BigInt.fromI32(42)
      );

      handleEndorse(newEndorseEvent);
      newEndorseEvent = createEndorseEvent(
        from,
        to,
        'Developer',
        Bytes.fromHexString(
          '0x323f15542940c9f346dbef380e684fc8d8d99d96aa0cb85d9254ff9c30a6562b'
        ),
        BigInt.fromI32(2),
        BigInt.fromI32(0)
      );

      handleEndorse(newEndorseEvent);
      newEndorseEvent = createEndorseEvent(
        from,
        to,
        'Developer',
        Bytes.fromHexString(
          '0x323f15542940c9f346dbef380e684fc8d8d99d96aa0cb85d9254ff9c30a6562b'
        ),
        BigInt.fromI32(3),
        BigInt.fromI32(0)
      );

      handleEndorse(newEndorseEvent);
      newEndorseEvent = createEndorseEvent(
        from,
        to,
        'Developer',
        Bytes.fromHexString(
          '0x323f15542940c9f346dbef380e684fc8d8d99d96aa0cb85d9254ff9c30a6562b'
        ),
        BigInt.fromI32(4),
        BigInt.fromI32(0)
      );

      handleEndorse(newEndorseEvent);

      // Check if AggregatedInformation was created and stored
      assert.entityCount('AggregatedInformation', 1);
      const aggregatedInformation = AggregatedInformation.load(
        Bytes.fromUTF8(`${from.toHexString()}-${to.toHexString()}`)
      );

      assert.assertNotNull(aggregatedInformation);
      assert.stringEquals(aggregatedInformation!.from.toHex(), from.toHex());
      assert.stringEquals(aggregatedInformation!.to.toHex(), to.toHex());
      assert.bigIntEquals(
        aggregatedInformation!.endorsementCount,
        BigInt.fromI32(4)
      );
      assert.bigIntEquals(
        aggregatedInformation!.donationAmount,
        BigInt.fromI32(168)
      );
    });
  });
});
