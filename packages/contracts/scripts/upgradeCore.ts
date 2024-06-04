import { ethers, run, upgrades } from 'hardhat';
import hre from 'hardhat';

const V1_ADDRESS = '0xe53090918048bd0066c152A89517242893CE9955';

async function main() {
  const EESCoreV2 = await ethers.getContractFactory('EESCoreV2');
  const deployment = await upgrades.upgradeProxy(V1_ADDRESS, EESCoreV2, {
    kind: 'uups',
  });
  await deployment.waitForDeployment();
  if (hre.network.name !== 'local') {
    await run('verify:verify', {
      address: await deployment.getAddress(),
    });
  }
  console.log('EESCore upgraded at ', await deployment.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
