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
  GlobalStatistics,
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
      const endorsementType = 'Developer';
      const easUid = Bytes.fromHexString(
        '0xb03f4550dec1c92b8183d4ffbfe55772165257eb588b3a77bdbfa06a54d0c483'
      );

      const newEndorseEvent = createEndorseEvent(
        from,
        to,
        endorsementType,
        easUid,
        BigInt.fromI32(1),
        BigInt.fromI32(42),
        BigInt.fromI64(1718644401)
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
      assert.stringEquals(endorsement!.endorsementType, endorsementType);
      assert.stringEquals(endorsement!.easUid.toHex(), easUid.toHex());
      assert.bigIntEquals(endorsement!.donationAmount, BigInt.fromI32(42));
      assert.bigIntEquals(
        endorsement!.createdAtTimestamp,
        BigInt.fromI64(1718644401)
      );

      // Assert Accounts were created and stored
      assert.entityCount('Account', 2);
      const accountFrom = Account.load(from);
      assert.assertNotNull(accountFrom);
      assert.i32Equals(accountFrom!.sentEndorsements.load().length, 1);
      assert.i32Equals(accountFrom!.receivedEndorsements.load().length, 0);
      assert.i32Equals(accountFrom!.totalEndorsementsSent.toI32(), 1);
      assert.i32Equals(accountFrom!.totalEndorsementsReceived.toI32(), 0);
      assert.assertTrue(accountFrom!.firstEndorsementSentTimestamp !== null);
      assert.bigIntEquals(
        accountFrom!.firstEndorsementSentTimestamp!,
        BigInt.fromI64(1718644401)
      );

      assert.assertTrue(
        accountFrom!.firstEndorsementReceivedTimestamp === null
      );
      assert.assertTrue(accountFrom!.firstDonationReceivedTimestamp === null);
      assert.assertTrue(accountFrom!.firstDonationSentTimestamp === null);

      const accountTo = Account.load(to);
      assert.assertNotNull(accountTo);
      assert.i32Equals(accountTo!.sentEndorsements.load().length, 0);
      assert.i32Equals(accountTo!.receivedEndorsements.load().length, 1);
      assert.i32Equals(accountTo!.totalEndorsementsSent.toI32(), 0);
      assert.i32Equals(accountTo!.totalEndorsementsReceived.toI32(), 1);
      assert.assertTrue(accountTo!.firstEndorsementReceivedTimestamp !== null);
      assert.bigIntEquals(
        accountTo!.firstEndorsementReceivedTimestamp!,
        BigInt.fromI64(1718644401)
      );
      assert.assertTrue(accountTo!.firstDonationReceivedTimestamp === null);
      assert.assertTrue(accountTo!.firstDonationReceivedTimestamp === null);
      assert.assertTrue(accountTo!.firstDonationSentTimestamp === null);

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

      // Assert GlobalStatistics was created and stored
      assert.entityCount('GlobalStatistics', 1);
      const globalStatistics = GlobalStatistics.load(
        Bytes.fromUTF8('GlobalStatistics')
      );
      assert.assertNotNull(globalStatistics);
      assert.bigIntEquals(
        globalStatistics!.totalEndorsements,
        BigInt.fromI32(1)
      );
      assert.bigIntEquals(globalStatistics!.totalDonations, BigInt.fromI32(0));
      assert.bigIntEquals(
        globalStatistics!.totalDonationAmount,
        BigInt.fromI32(0)
      );
      assert.bigIntEquals(
        globalStatistics!.totalWithdrawnAmount,
        BigInt.fromI32(0)
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
        BigInt.fromI32(1),
        BigInt.fromI32(1718644401)
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
        BigInt.fromI32(0),
        BigInt.fromI32(1718644402)
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
        BigInt.fromI32(21),
        BigInt.fromI32(1718644403)
      );
      handleEndorse(newEndorseEvent);

      // Assert all endorsement entities were created and stored
      assert.entityCount('Endorsement', 3);

      const account1 = Account.load(Address.fromString(TEST_ACCOUNTS[0]));
      assert.assertNotNull(account1);
      assert.i32Equals(account1!.sentEndorsements.load().length, 2);
      assert.i32Equals(account1!.receivedEndorsements.load().length, 0);
      assert.assertTrue(account1!.firstEndorsementSentTimestamp !== null);
      assert.bigIntEquals(
        account1!.firstEndorsementSentTimestamp!,
        BigInt.fromI32(1718644401)
      );
      assert.assertTrue(account1!.firstEndorsementReceivedTimestamp === null);
      assert.assertTrue(account1!.firstDonationReceivedTimestamp === null);
      assert.assertTrue(account1!.firstDonationSentTimestamp === null);

      const account2 = Account.load(Address.fromString(TEST_ACCOUNTS[1]));
      assert.assertNotNull(account2);
      assert.i32Equals(account2!.sentEndorsements.load().length, 0);
      assert.i32Equals(account2!.receivedEndorsements.load().length, 2);
      assert.assertTrue(account2!.firstEndorsementReceivedTimestamp !== null);
      assert.bigIntEquals(
        account2!.firstEndorsementReceivedTimestamp!,
        BigInt.fromI32(1718644401)
      );
      assert.assertTrue(account2!.firstEndorsementSentTimestamp === null);
      assert.assertTrue(account2!.firstDonationReceivedTimestamp === null);
      assert.assertTrue(account2!.firstDonationSentTimestamp === null);

      const account3 = Account.load(Address.fromString(TEST_ACCOUNTS[2]));
      assert.assertNotNull(account3);
      assert.i32Equals(account3!.sentEndorsements.load().length, 1);
      assert.i32Equals(account3!.receivedEndorsements.load().length, 1);
      assert.assertTrue(account3!.firstEndorsementSentTimestamp !== null);
      assert.bigIntEquals(
        account3!.firstEndorsementSentTimestamp!,
        BigInt.fromI32(1718644403)
      );
      assert.assertTrue(account3!.firstEndorsementReceivedTimestamp !== null);
      assert.bigIntEquals(
        account3!.firstEndorsementReceivedTimestamp!,
        BigInt.fromI32(1718644402)
      );
      assert.assertTrue(account3!.firstDonationReceivedTimestamp === null);
      assert.assertTrue(account3!.firstDonationSentTimestamp === null);

      // Assert AggregatedInformation was created and stored
      assert.entityCount('AggregatedInformation', 3);

      // Assert GlobalStatistics was created and stored
      assert.entityCount('GlobalStatistics', 1);
      const globalStatistics = GlobalStatistics.load(
        Bytes.fromUTF8('GlobalStatistics')
      );
      assert.assertNotNull(globalStatistics);
      assert.bigIntEquals(
        globalStatistics!.totalEndorsements,
        BigInt.fromI32(3)
      );
      assert.bigIntEquals(globalStatistics!.totalDonations, BigInt.fromI32(0));
      assert.bigIntEquals(
        globalStatistics!.totalDonationAmount,
        BigInt.fromI32(0)
      );
      assert.bigIntEquals(
        globalStatistics!.totalWithdrawnAmount,
        BigInt.fromI32(0)
      );
    });
  });
  describe('Donation', () => {
    test('Donation created and stored', () => {
      const from = Address.fromString(TEST_ACCOUNTS[0]);
      const to = Address.fromString(TEST_ACCOUNTS[1]);
      const amount = BigInt.fromI32(42);
      const newDonateEvent = createDonateEvent(
        from,
        to,
        amount,
        BigInt.fromI32(1718644401)
      );

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
      assert.bigIntEquals(
        donation!.createdAtTimestamp,
        BigInt.fromI32(1718644401)
      );

      // Assert Accounts were created and stored
      assert.entityCount('Account', 2);
      const accountFrom = Account.load(from);
      assert.assertNotNull(accountFrom);
      assert.i32Equals(accountFrom!.sentDonations.load().length, 1);
      assert.i32Equals(accountFrom!.receivedDonations.load().length, 0);
      assert.i32Equals(accountFrom!.totalDonationsSent.toI32(), 42);
      assert.i32Equals(accountFrom!.totalDonationsReceived.toI32(), 0);
      assert.assertTrue(accountFrom!.firstDonationSentTimestamp !== null);
      assert.bigIntEquals(
        accountFrom!.firstDonationSentTimestamp!,
        BigInt.fromI32(1718644401)
      );
      assert.assertTrue(accountFrom!.firstDonationReceivedTimestamp === null);
      assert.assertTrue(accountFrom!.firstEndorsementSentTimestamp === null);
      assert.assertTrue(
        accountFrom!.firstEndorsementReceivedTimestamp === null
      );

      const accountTo = Account.load(to);
      assert.assertNotNull(accountTo);
      assert.i32Equals(accountTo!.sentDonations.load().length, 0);
      assert.i32Equals(accountTo!.receivedDonations.load().length, 1);
      assert.i32Equals(accountTo!.totalDonationsSent.toI32(), 0);
      assert.i32Equals(accountTo!.totalDonationsReceived.toI32(), 42);
      assert.assertTrue(accountTo!.firstDonationReceivedTimestamp !== null);
      assert.bigIntEquals(
        accountTo!.firstDonationReceivedTimestamp!,
        BigInt.fromI32(1718644401)
      );
      assert.assertTrue(accountTo!.firstDonationSentTimestamp === null);
      assert.assertTrue(accountTo!.firstEndorsementSentTimestamp === null);
      assert.assertTrue(accountTo!.firstEndorsementReceivedTimestamp === null);

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

      // Assert GlobalStatistics was created and stored
      assert.entityCount('GlobalStatistics', 1);
      const globalStatistics = GlobalStatistics.load(
        Bytes.fromUTF8('GlobalStatistics')
      );
      assert.assertNotNull(globalStatistics);
      assert.bigIntEquals(
        globalStatistics!.totalEndorsements,
        BigInt.fromI32(0)
      );
      assert.bigIntEquals(globalStatistics!.totalDonations, BigInt.fromI32(1));
      assert.bigIntEquals(
        globalStatistics!.totalDonationAmount,
        BigInt.fromI32(42)
      );
      assert.bigIntEquals(
        globalStatistics!.totalWithdrawnAmount,
        BigInt.fromI32(0)
      );
    });

    test('Multiple donations created and stored', () => {
      let newDonateEvent = createDonateEvent(
        Address.fromString(TEST_ACCOUNTS[0]),
        Address.fromString(TEST_ACCOUNTS[1]),
        BigInt.fromI32(42),
        BigInt.fromI32(1718644401)
      );
      handleDonate(newDonateEvent);

      newDonateEvent = createDonateEvent(
        Address.fromString(TEST_ACCOUNTS[0]),
        Address.fromString(TEST_ACCOUNTS[2]),
        BigInt.fromI32(42),
        BigInt.fromI32(1718644402),
        BigInt.fromI32(2)
      );
      handleDonate(newDonateEvent);

      newDonateEvent = createDonateEvent(
        Address.fromString(TEST_ACCOUNTS[1]),
        Address.fromString(TEST_ACCOUNTS[2]),
        BigInt.fromI32(13),
        BigInt.fromI32(1718644403),
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
      assert.assertTrue(account1!.firstDonationSentTimestamp !== null);
      assert.bigIntEquals(
        account1!.firstDonationSentTimestamp!,
        BigInt.fromI32(1718644401)
      );
      assert.assertTrue(account1!.firstDonationReceivedTimestamp === null);
      assert.assertTrue(account1!.firstEndorsementSentTimestamp === null);
      assert.assertTrue(account1!.firstEndorsementReceivedTimestamp === null);

      const account2 = Account.load(Address.fromString(TEST_ACCOUNTS[1]));
      assert.assertNotNull(account2);
      assert.i32Equals(account2!.sentDonations.load().length, 1);
      assert.i32Equals(account2!.receivedDonations.load().length, 1);
      assert.bigIntEquals(account2!.totalDonationsReceived, BigInt.fromI32(42));
      assert.bigIntEquals(account2!.totalDonationsSent, BigInt.fromI32(13));
      assert.assertTrue(account2!.firstDonationReceivedTimestamp !== null);
      assert.bigIntEquals(
        account2!.firstDonationReceivedTimestamp!,
        BigInt.fromI32(1718644401)
      );
      assert.assertTrue(account2!.firstDonationSentTimestamp !== null);
      assert.bigIntEquals(
        account2!.firstDonationSentTimestamp!,
        BigInt.fromI32(1718644403)
      );
      assert.assertTrue(account2!.firstEndorsementSentTimestamp === null);
      assert.assertTrue(account2!.firstEndorsementReceivedTimestamp === null);

      const account3 = Account.load(Address.fromString(TEST_ACCOUNTS[2]));
      assert.assertNotNull(account3);
      assert.i32Equals(account3!.sentDonations.load().length, 0);
      assert.i32Equals(account3!.receivedDonations.load().length, 2);
      assert.bigIntEquals(account3!.totalDonationsReceived, BigInt.fromI32(55));
      assert.bigIntEquals(account3!.totalDonationsSent, BigInt.fromI32(0));
      assert.assertTrue(account3!.firstDonationReceivedTimestamp !== null);
      assert.bigIntEquals(
        account3!.firstDonationReceivedTimestamp!,
        BigInt.fromI32(1718644402)
      );
      assert.assertTrue(account3!.firstDonationSentTimestamp === null);
      assert.assertTrue(account3!.firstEndorsementSentTimestamp === null);
      assert.assertTrue(account3!.firstEndorsementReceivedTimestamp === null);

      // Assert AggregatedInformation was created and stored
      assert.entityCount('AggregatedInformation', 3);

      // Assert GlobalStatistics was created and stored
      assert.entityCount('GlobalStatistics', 1);
      const globalStatistics = GlobalStatistics.load(
        Bytes.fromUTF8('GlobalStatistics')
      );
      assert.assertNotNull(globalStatistics);
      assert.bigIntEquals(
        globalStatistics!.totalEndorsements,
        BigInt.fromI32(0)
      );
      assert.bigIntEquals(globalStatistics!.totalDonations, BigInt.fromI32(3));
      assert.bigIntEquals(
        globalStatistics!.totalDonationAmount,
        BigInt.fromI32(97)
      );
      assert.bigIntEquals(
        globalStatistics!.totalWithdrawnAmount,
        BigInt.fromI32(0)
      );
    });
  });
  describe('Withdrawal', () => {
    test('Withdrawal created and stored', () => {
      const from = Address.fromString(TEST_ACCOUNTS[0]);
      const amount = BigInt.fromI32(42);
      const newWithdrawEvent = createWithdrawEvent(
        from,
        amount,
        BigInt.fromI32(1718644401)
      );

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
      assert.bigIntEquals(
        withdrawal!.createdAtTimestamp,
        BigInt.fromI32(1718644401)
      );

      // Assert GlobalStatistics was created and stored
      assert.entityCount('GlobalStatistics', 1);
      const globalStatistics = GlobalStatistics.load(
        Bytes.fromUTF8('GlobalStatistics')
      );
      assert.assertNotNull(globalStatistics);
      assert.bigIntEquals(
        globalStatistics!.totalEndorsements,
        BigInt.fromI32(0)
      );
      assert.bigIntEquals(globalStatistics!.totalDonations, BigInt.fromI32(0));
      assert.bigIntEquals(
        globalStatistics!.totalDonationAmount,
        BigInt.fromI32(0)
      );
      assert.bigIntEquals(
        globalStatistics!.totalWithdrawnAmount,
        BigInt.fromI32(42)
      );
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
      let newDonateEvent = createDonateEvent(
        from,
        to,
        amount,
        BigInt.fromI32(1718644401)
      );
      handleDonate(newDonateEvent);
      newDonateEvent = createDonateEvent(
        from,
        to,
        amount,
        BigInt.fromI32(2),
        BigInt.fromI32(1718644402)
      );
      handleDonate(newDonateEvent);
      newDonateEvent = createDonateEvent(
        from,
        to,
        amount,
        BigInt.fromI32(3),
        BigInt.fromI32(1718644403)
      );
      handleDonate(newDonateEvent);
      newDonateEvent = createDonateEvent(
        from,
        to,
        amount,
        BigInt.fromI32(4),
        BigInt.fromI32(1718644404)
      );
      handleDonate(newDonateEvent);

      let newEndorseEvent = createEndorseEvent(
        from,
        to,
        'Developer',
        Bytes.fromHexString(
          '0xb03f4550dec1c92b8183d4ffbfe55772165257eb588b3a77bdbfa06a54d0c483'
        ),
        BigInt.fromI32(1),
        BigInt.fromI32(42),
        BigInt.fromI32(1718644405)
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
        BigInt.fromI32(0),
        BigInt.fromI32(1718644406)
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
        BigInt.fromI32(0),
        BigInt.fromI32(1718644407)
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
        BigInt.fromI32(0),
        BigInt.fromI32(1718644408)
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

      // Assert GlobalStatistics was created and stored
      assert.entityCount('GlobalStatistics', 1);
      const globalStatistics = GlobalStatistics.load(
        Bytes.fromUTF8('GlobalStatistics')
      );
      assert.assertNotNull(globalStatistics);
      assert.bigIntEquals(
        globalStatistics!.totalEndorsements,
        BigInt.fromI32(4)
      );
      assert.bigIntEquals(globalStatistics!.totalDonations, BigInt.fromI32(4));
      assert.bigIntEquals(
        globalStatistics!.totalDonationAmount,
        BigInt.fromI32(168)
      );
      assert.bigIntEquals(
        globalStatistics!.totalWithdrawnAmount,
        BigInt.fromI32(0)
      );
    });
  });
});
