import { ethers } from 'hardhat';
import type { EESCore } from '../typechain-types';
import type { HDNodeWallet } from 'ethers';

const TEST_MNEMONIC =
  'test test test test test test test test test test test junk';
const CONTRACT_ADDRESS = '0xa0b4B77fD7Afd4A38810fB2c060F93aF5e085156';
const NUM_OF_ENDORSEMENTS = 500;
const NUM_OF_ACCOUNTS = 10;

const getRandomNum = ({
  min = 0.00042,
  max = 1.0,
}: {
  min?: number;
  max?: number;
} = {}) => {
  // Random number between min and max - DOUBLE
  return ethers.parseEther((Math.random() * (max - min) + min).toString());
};

const getRandomType = () => {
  const types = [
    'Developer',
    'Artist',
    'Discord MOD',
    'Rust developer',
    'Giga good developer',
    'Runs Arch Linux',
    'tmux enjoyer',
  ];
  return types[getRandomInt(0, types.length - 1)];
};

const getName = (i: number) => {
  const names = [
    'john',
    'becca',
    'johnny',
    'jason',
    'ava',
    'liam',
    'sophia',
    'noah',
    'emma',
    'james',
  ];
  return names[i];
};

const getRandomComment = () => {
  const comments = [
    'Great job team',
    'Love this project',
    'Needs more detail',
    'Awesome work everyone',
    'Fantastic job done',
    'Keep it up',
    'Looks really good',
    'Excellent team effort',
    'Could be better',
    'Wonderful collaboration guys',
    'Solid work team',
    'Nice and clean',
    'Superb execution here',
    'Impressive results team',
    'Well thought out',
    'Very well done',
    'High quality work',
    'Great attention detail',
    'Remarkable progress made',
    'Perfectly executed plan',
  ];
  return comments[getRandomInt(0, comments.length - 1)];
};

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function main() {
  const provider = new ethers.JsonRpcProvider('http://0.0.0.0:8545');

  // Create wallet
  const wallet = ethers.HDNodeWallet.fromMnemonic(
    ethers.Mnemonic.fromPhrase(TEST_MNEMONIC),
    "m/44'/60'/0'/0"
  );
  const signers: HDNodeWallet[] = [];
  // Create accounts (signers) for testing
  for (let i = 0; i < NUM_OF_ACCOUNTS; i++) {
    signers.push(wallet.deriveChild(i).connect(provider));
  }
  const accounts: EESCore[] = [];
  for (let i = 0; i < signers.length; i++) {
    accounts.push(
      (await ethers.getContractAt(
        'EESCore',
        CONTRACT_ADDRESS,
        signers[i]
      )) as unknown as EESCore
    );
  }

  console.log(
    'Endorsement fee: ',
    ethers.formatUnits(await accounts[0].getEndorsementPrice(), 'ether')
  );

  // make 500 random endorsements from random account from random to any other random account
  for (let i = 0; i < NUM_OF_ENDORSEMENTS; i++) {
    const comment = getRandomComment();
    const type = getRandomType();
    const value = getRandomNum();
    const from = getRandomInt(0, signers.length - 1);
    let to = getRandomInt(0, signers.length - 1);
    while (from === to) {
      to = getRandomInt(0, signers.length - 1);
    }
    const name = `${getName(to)}.eth`;
    const tx = await accounts[from].endorse(
      signers[to].address,
      comment,
      type,
      name,
      {
        value,
      }
    );
    await tx.wait();
    console.log(
      `${getName(from)}.eth (${await accounts[
        from
      ].getAddress()}) endorsed ${name} (${await accounts[
        to
      ].getAddress()}) with ${type} and ${comment}, value: ${ethers.formatUnits(
        value
      )} ether`
    );
  }
  // make withdrawals from all accounts
  for (let i = 0; i < accounts.length; i++) {
    console.log(`Withdrawal from account ${i}`);
    await accounts[i].withdraw();
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
