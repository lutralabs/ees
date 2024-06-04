import { ethers, defender } from 'hardhat';

const V1_ADDRESS = '0x8c749B8038b85975e6B6e7F96D3F5de2fB1431FA';

async function main() {
  const EESCoreV2 = await ethers.getContractFactory('EESCoreV2');

  const proposal = await defender.proposeUpgradeWithApproval(
    V1_ADDRESS,
    EESCoreV2,
    {
      kind: 'uups',
      verifySourceCode: true,
      salt: '0x0000000000000000000000000000000000000000000000000000000000000001',
    }
  );

  console.log(`Upgrade proposed with URL: ${proposal.url}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
