import { SchemaRegistry } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'hardhat';
import hre from 'hardhat';

const networkToSchemaRegistryAddress = {
  mainnet: '0xA7b39296258348C78294F95B872b282326A97BDF',
  sepolia: '0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0',
  local: '0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0',
  base: '0x4200000000000000000000000000000000000020',
  baseSepolia: '0x4200000000000000000000000000000000000020',
};

async function main() {
  if (networkToSchemaRegistryAddress[hre.network.name] === undefined) {
    console.log('No schema registry address for network', hre.network.name);
    return;
  }
  const [owner] = await ethers.getSigners();
  const schemaRegistry = new SchemaRegistry(
    networkToSchemaRegistryAddress[hre.network.name]
  );
  schemaRegistry.connect(owner);
  const schema =
    'string endorsementType, string comment, address endorser, string endorseeSocial';
  const revocable = true;

  const transaction = await schemaRegistry.register({
    schema,
    revocable,
  });

  await transaction.wait();
  console.log(`Schema registered: ${transaction.data.customData}}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
