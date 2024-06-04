import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';
import type { EESCore, EESCoreV2 } from '../../typechain-types';
import {
  DONATION_AMOUNT,
  EAS_ADDRESS,
  ENDORSEMENT_COMMENT,
  ENDORSEMENT_PRICE,
  ENDORSEMENT_SOCIAL,
  ENDORSEMENT_TYPE,
  NEW_GOOD_ENDORSEMENT_PRICE,
  SCHEMA_UID,
} from './constants';

describe('EESCore upgradeability and deployments', () => {
  let eesCore: EESCore;
  let owner: any;
  let address1: any;
  let address2: any;

  beforeEach(async () => {
    [owner, address1, address2] = await ethers.getSigners();
    const eesCoreFactory = await ethers.getContractFactory('EESCore');
    eesCore = (await upgrades.deployProxy(
      eesCoreFactory,
      [EAS_ADDRESS, SCHEMA_UID],
      {
        kind: 'uups',
      }
    )) as unknown as EESCore;

    await eesCore.waitForDeployment();
  });

  it('should fail to deploy because the EAS address is 0x0', async () => {
    const eesCoreFactory = await ethers.getContractFactory('EESCore');
    await expect(
      upgrades.deployProxy(
        eesCoreFactory,
        ['0x0000000000000000000000000000000000000000', SCHEMA_UID],
        {
          kind: 'uups',
        }
      )
    ).to.be.revertedWithCustomError(eesCore, 'InvalidEAS');
  });

  it('should fail to initialize because the contract is already initialized', async () => {
    await expect(
      eesCore.initialize(EAS_ADDRESS, SCHEMA_UID)
    ).to.be.revertedWithCustomError(eesCore, 'InvalidInitialization');
  });

  it('should upgrade to EESCoreV2 and keep the same address and storage', async () => {
    await eesCore
      .connect(address1)
      .endorse(
        address2.address,
        ENDORSEMENT_TYPE,
        ENDORSEMENT_COMMENT,
        ENDORSEMENT_SOCIAL,
        {
          value: DONATION_AMOUNT + ENDORSEMENT_PRICE,
        }
      );
    const balanceBeforeUpgrade = await eesCore.getTotalFeesBalance();
    const userBalanceBeforeUpgrade = await ethers.provider.getBalance(
      address2.address
    );
    const EESCoreV2 = await ethers.getContractFactory('EESCoreV2');
    const eesCoreV2 = (await upgrades.upgradeProxy(
      await eesCore.getAddress(),
      EESCoreV2,
      {
        kind: 'uups',
      }
    )) as unknown as EESCoreV2;
    const balanceAfterUpgrade = await eesCoreV2.getTotalFeesBalance();
    const userBalanceAfterUpgrade = await ethers.provider.getBalance(
      address2.address
    );
    expect(balanceAfterUpgrade).to.equal(balanceBeforeUpgrade);
    expect(userBalanceAfterUpgrade).to.equal(userBalanceBeforeUpgrade);
  });
  it('should fail to upgrade to EESCoreV2 because the calling address is not the owner', async () => {
    const EESCoreV2 = await ethers.getContractFactory('EESCoreV2', address2);
    const eesCoreV2 = upgrades.upgradeProxy(
      await eesCore.getAddress(),
      EESCoreV2,
      {
        kind: 'uups',
      }
    ) as unknown as EESCoreV2;
    await expect(eesCoreV2).to.be.reverted;
  });
  it('should upgrade to EESCoreV2 and call new functions', async () => {
    const EESCoreV2 = await ethers.getContractFactory('EESCoreV2');
    const eesCoreV2 = (await upgrades.upgradeProxy(
      await eesCore.getAddress(),
      EESCoreV2,
      {
        kind: 'uups',
      }
    )) as unknown as EESCoreV2;
    await eesCoreV2
      .connect(address1)
      .endorse(
        address2.address,
        ENDORSEMENT_TYPE,
        ENDORSEMENT_COMMENT,
        ENDORSEMENT_SOCIAL,
        {
          value: DONATION_AMOUNT + ENDORSEMENT_PRICE,
        }
      );
    const returnValue = await eesCoreV2.upgradedFunction();
    expect(returnValue).to.equal(8 * 8);
  });
  it(`should set new endorsement price to ${NEW_GOOD_ENDORSEMENT_PRICE} eth, upgrade, and keep the same endorsement price`, async () => {
    await eesCore.setEndorsementPrice(NEW_GOOD_ENDORSEMENT_PRICE);
    const EESCoreV2 = await ethers.getContractFactory('EESCoreV2');
    const eesCoreV2 = (await upgrades.upgradeProxy(
      await eesCore.getAddress(),
      EESCoreV2,
      {
        kind: 'uups',
      }
    )) as unknown as EESCoreV2;
    const returnValue = await eesCoreV2.upgradedFunction();
    expect(await eesCoreV2.getEndorsementPrice()).to.equal(
      NEW_GOOD_ENDORSEMENT_PRICE
    );
    expect(returnValue).to.equal(8 * 8);
  });
});
