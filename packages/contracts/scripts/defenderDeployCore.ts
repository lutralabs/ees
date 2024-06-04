import { ethers, defender } from 'hardhat';

async function main() {
  const EAS_ADDRESS = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e';
  const SCHEMA_UID =
    '0x28bb35c3774b2963e8703dccbe93a3d1620ddf91ee3eee4678cdb8fb8e1a8bbb';
  const EESCore = await ethers.getContractFactory('EESCore');

  const upgradeApprovalProcess = await defender.getUpgradeApprovalProcess();

  if (upgradeApprovalProcess.address === undefined) {
    throw new Error(
      `Upgrade approval process with id ${upgradeApprovalProcess.approvalProcessId} has no assigned address`
    );
  }

  const deployment = await defender.deployProxy(
    EESCore,
    [EAS_ADDRESS, SCHEMA_UID],
    {
      kind: 'uups',
      initializer: 'initialize',
      salt: '0x0000000000000000000000000000000000000000000000000000000000000001',
      verifySourceCode: true,
    }
  );

  await deployment.waitForDeployment();

  console.log(`Contract deployed to ${await deployment.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
