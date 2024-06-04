import { ethers, run, upgrades } from 'hardhat';
import hre from 'hardhat';

const networkToEasAddress = {
  mainnet: '0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587',
  sepolia: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
  local: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
  base: '0x4200000000000000000000000000000000000021',
  baseSepolia: '0x4200000000000000000000000000000000000021',
};

const networkToSchemaUid = {
  mainnet: 'not-yet-deployed',
  sepolia: '0x28bb35c3774b2963e8703dccbe93a3d1620ddf91ee3eee4678cdb8fb8e1a8bbb',
  local: '0x28bb35c3774b2963e8703dccbe93a3d1620ddf91ee3eee4678cdb8fb8e1a8bbb',
  base: 'not-yet-deployed',
  baseSepolia:
    '0xc15bb007fcd98a5a99c0fd98286fba2f62f997de62c11ea24dfd30d274eef99f',
};

async function main() {
  if (networkToEasAddress[hre.network.name] === undefined) {
    console.log('No schema registry address for network', hre.network.name);
    return;
  }
  if (
    networkToSchemaUid[hre.network.name] === undefined ||
    networkToSchemaUid[hre.network.name] === 'not-yet-deployed'
  ) {
    console.log('No schema registry address for network', hre.network.name);
    return;
  }
  console.log('Deploying on:', hre.network.name);
  const EAS_ADDRESS = networkToEasAddress[hre.network.name];
  const SCHEMA_UID = networkToSchemaUid[hre.network.name];
  const EESCore = await ethers.getContractFactory('EESCore');
  const deployment = await upgrades.deployProxy(
    EESCore,
    [EAS_ADDRESS, SCHEMA_UID],
    {
      kind: 'uups',
      verifySourceCode: true,
    }
  );
  await deployment.waitForDeployment();

  if (hre.network.name !== 'local') {
    await run('verify:verify', {
      address: await deployment.getAddress(),
    });
  }
  console.log('EESCore deployed to: ', await deployment.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
