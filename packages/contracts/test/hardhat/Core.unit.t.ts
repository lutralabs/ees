import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';
import type { EESCore as EESCoreType } from '../../typechain-types';
import { calculateValues } from './utils';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import {
  DONATION_AMOUNT,
  EAS_ADDRESS,
  ENDORSEMENT_COMMENT,
  ENDORSEMENT_PRICE,
  ENDORSEMENT_SOCIAL,
  ENDORSEMENT_TYPE,
  NEW_BAD_DONATION_PERCENTAGE,
  NEW_BAD_ENDORSEMENT_PRICE,
  NEW_GOOD_DONATION_PERCENTAGE,
  NEW_GOOD_EAS_ADDRESS,
  NEW_GOOD_ENDORSEMENT_PRICE,
  NEW_GOOD_SCHEMA_UID,
  SCHEMA_UID,
} from './constants';
// TODO: test when EAS updates to OZ contracts v5
// import type {
//   EAS,
//   EAS__factory,
//   SchemaRegistry,
//   SchemaRegistry__factory,
// } from '@ethereum-attestation-service/eas-contracts';
// const easArtifact = require('@ethereum-attestation-service/eas-contracts/artifacts/contracts/EAS.sol/EAS.json');
// const schemaRegistryArtifact = require('@ethereum-attestation-service/eas-contracts/artifacts/contracts/SchemaRegistry.sol/SchemaRegistry.json');

describe('EESCore unit tests', () => {
  let eesCore: EESCoreType;
  let owner: any;
  let address1: any;
  let address2: any;

  beforeEach(async () => {
    [owner, address1, address2] = await ethers.getSigners();
    const eesCoreFactory = await ethers.getContractFactory('EESCore');
    // const easFactory: EAS__factory = (await ethers.getContractFactory(
    //   easArtifact.abi,
    //   easArtifact.bytecode
    // )) as EAS__factory;
    // const schemaRegistryFactory: SchemaRegistry__factory =
    //   (await ethers.getContractFactory(
    //     schemaRegistryArtifact.abi,
    //     schemaRegistryArtifact.bytecode
    //   )) as unknown as SchemaRegistry__factory;

    // const easSchemaRegistry =
    //   (await schemaRegistryFactory.deploy()) as unknown as SchemaRegistry;
    // await easSchemaRegistry.waitForDeployment();
    // const eas = (await easFactory.deploy(
    //   await easSchemaRegistry.getAddress()
    // )) as unknown as EAS;
    // await eas.waitForDeployment();
    eesCore = (await upgrades.deployProxy(
      eesCoreFactory,
      [EAS_ADDRESS, SCHEMA_UID],
      {
        kind: 'uups',
      }
    )) as unknown as EESCoreType;
    await eesCore.waitForDeployment();
  });
  describe('endorse', () => {
    it('should fail to endorse a user without paying the fee', async () => {
      await expect(
        eesCore
          .connect(address1)
          .endorse(
            address2.address,
            ENDORSEMENT_TYPE,
            ENDORSEMENT_COMMENT,
            ENDORSEMENT_SOCIAL
          )
      ).to.be.revertedWith('Insufficient endorsement fee');
    });

    it('should fail to self-endorse', async () => {
      await expect(
        eesCore
          .connect(address1)
          .endorse(
            address1,
            ENDORSEMENT_TYPE,
            ENDORSEMENT_COMMENT,
            ENDORSEMENT_SOCIAL,
            { value: ENDORSEMENT_PRICE }
          )
      ).to.be.revertedWith('Cannot endorse to yourself');
    });

    it('should fail to endorse a zero-address', async () => {
      await expect(
        eesCore
          .connect(address1)
          .endorse(
            '0x0000000000000000000000000000000000000000',
            ENDORSEMENT_TYPE,
            ENDORSEMENT_COMMENT,
            ENDORSEMENT_SOCIAL,
            {
              value: ENDORSEMENT_PRICE,
            }
          )
      ).to.be.revertedWith('Endorsee cannot be the zero address');
    });

    it('should fail to endorse a deployed contract address', async () => {
      await expect(
        eesCore
          .connect(address1)
          .endorse(
            await eesCore.getAddress(),
            ENDORSEMENT_TYPE,
            ENDORSEMENT_COMMENT,
            ENDORSEMENT_SOCIAL,
            {
              value: ENDORSEMENT_PRICE,
            }
          )
      ).to.be.revertedWith('Endorsee cannot be the contract address');
    });

    it(`should endorse a user with paid ${ENDORSEMENT_PRICE} price`, async () => {
      const tx = await eesCore
        .connect(address1)
        .endorse(
          address2.address,
          ENDORSEMENT_TYPE,
          ENDORSEMENT_COMMENT,
          ENDORSEMENT_SOCIAL,
          {
            value: ENDORSEMENT_PRICE,
          }
        );

      const balance = await eesCore.getBalance(address2.address);
      await expect(tx)
        .to.emit(eesCore, 'Endorse')
        .withArgs(
          address1.address,
          address2.address,
          ENDORSEMENT_TYPE,
          anyValue,
          anyValue
        );
    });

    it(`should endorse a user with paid ${ENDORSEMENT_PRICE} price and donation ${DONATION_AMOUNT}`, async () => {
      const tx = await eesCore
        .connect(address1)
        .endorse(
          address2.address,
          ENDORSEMENT_TYPE,
          ENDORSEMENT_COMMENT,
          ENDORSEMENT_SOCIAL,
          {
            value: ENDORSEMENT_PRICE + DONATION_AMOUNT,
          }
        );
      const { donationReward } = await calculateValues(
        eesCore,
        ENDORSEMENT_PRICE + DONATION_AMOUNT
      );

      await expect(tx)
        .to.emit(eesCore, 'Endorse')
        .withArgs(
          address1.address,
          address2.address,
          ENDORSEMENT_TYPE,
          anyValue,
          anyValue
        );
      await expect(tx)
        .to.emit(eesCore, 'Donate')
        .withArgs(address1.address, address2.address, donationReward);
    });
  });

  describe('setters', () => {
    it('should set new donation fee percentage', async () => {
      const oldFee = await eesCore.getDonationFeePercentage();
      await eesCore
        .connect(owner)
        .setDonationFeePercentage(NEW_GOOD_DONATION_PERCENTAGE);
      expect(await eesCore.getDonationFeePercentage()).to.equal(
        NEW_GOOD_DONATION_PERCENTAGE
      );
      expect(oldFee).to.equal(100);
    });
    it("should fail to set new donation fee percentage because it's greater than 3%", async () => {
      await expect(
        eesCore
          .connect(owner)
          .setDonationFeePercentage(NEW_BAD_DONATION_PERCENTAGE)
      ).to.be.revertedWith('Donation fee percentage cannot exceed 3%');
    });
    it('should fail to set new donation fee percentage because the caller is not the owner', async () => {
      await expect(
        eesCore
          .connect(address1)
          .setDonationFeePercentage(NEW_GOOD_DONATION_PERCENTAGE)
      ).to.be.revertedWithCustomError(eesCore, 'OwnableUnauthorizedAccount');
    });
    it('should set new endorsement price', async () => {
      const oldPrice = await eesCore.getEndorsementPrice();
      await eesCore
        .connect(owner)
        .setEndorsementPrice(NEW_GOOD_ENDORSEMENT_PRICE);
      expect(await eesCore.getEndorsementPrice()).to.equal(
        NEW_GOOD_ENDORSEMENT_PRICE
      );
      expect(oldPrice).to.equal(ENDORSEMENT_PRICE);
    });
    it("should fail to set new endorsement price because it's greater than 0.01 ETH", async () => {
      await expect(
        eesCore.connect(owner).setEndorsementPrice(NEW_BAD_ENDORSEMENT_PRICE)
      ).to.be.revertedWith('Endorsement price cannot exceed previous price');
    });
    it('should fail to set new endorsement price because the caller is not the owner', async () => {
      await expect(
        eesCore
          .connect(address1)
          .setEndorsementPrice(NEW_GOOD_ENDORSEMENT_PRICE)
      ).to.be.revertedWithCustomError(eesCore, 'OwnableUnauthorizedAccount');
    });
    it('should fail to set new eas address because the caller is not the owner', async () => {
      await expect(
        eesCore.connect(address1).setNewEasAddress(NEW_GOOD_EAS_ADDRESS)
      ).to.be.revertedWithCustomError(eesCore, 'OwnableUnauthorizedAccount');
    });
    it('should set new eas address', async () => {
      expect(
        await eesCore.connect(owner).setNewEasAddress(NEW_GOOD_EAS_ADDRESS)
      ).to.not.be.reverted;
    });
    it('should fail to set new eas address because the new address cannot be 0x0', async () => {
      await expect(
        eesCore
          .connect(owner)
          .setNewEasAddress('0x0000000000000000000000000000000000000000')
      ).to.be.revertedWithCustomError(eesCore, 'InvalidEAS');
    });
    it('should set new schema uid', async () => {
      expect(await eesCore.connect(owner).setNewSchemaUid(NEW_GOOD_SCHEMA_UID))
        .to.not.be.reverted;
    });
    it('should fail to set new schema uid becaus the caller is not the owner', async () => {
      await expect(
        eesCore.connect(address1).setNewSchemaUid(NEW_GOOD_SCHEMA_UID)
      ).to.be.revertedWithCustomError(eesCore, 'OwnableUnauthorizedAccount');
    });
  });

  describe('withdrawals and balances', () => {
    it('should return 0 balance for not-yet-endorsed address', async () => {
      const endorsements = await eesCore.getBalance(address1.address);
      expect(endorsements).to.equal(0);
    });
    it('should return 0 balance of fees', async () => {
      const donations = await eesCore.getDonationsFeesBalance();
      const endorsements = await eesCore.getEndorsementsFeesBalance();
      const total = await eesCore.getTotalFeesBalance();
      expect(donations).to.equal(0);
      expect(endorsements).to.equal(0);
      expect(total).to.equal(0);
    });
    it('should fail to withdraw user fees because they are 0', async () => {
      await expect(eesCore.connect(address1).withdraw()).to.be.revertedWith(
        'Insufficient balance'
      );
    });
    it('should successfully withdraw all user fees', async () => {
      await eesCore
        .connect(address1)
        .endorse(
          address2.address,
          ENDORSEMENT_TYPE,
          ENDORSEMENT_COMMENT,
          ENDORSEMENT_SOCIAL,
          {
            value: ENDORSEMENT_PRICE + DONATION_AMOUNT,
          }
        );
      const balanceBeforeWithdrawal = await eesCore.getBalance(
        address2.address
      );
      const { donationReward } = await calculateValues(
        eesCore,
        ENDORSEMENT_PRICE + DONATION_AMOUNT
      );
      const tx = await eesCore.connect(address2).withdraw();
      await expect(tx)
        .to.emit(eesCore, 'Withdraw')
        .withArgs(address2.address, donationReward);
      const balanceAfterWithdrawal = await eesCore.getBalance(address2.address);
      expect(balanceBeforeWithdrawal).to.be.greaterThan(balanceAfterWithdrawal);
      expect(balanceBeforeWithdrawal).to.equal(donationReward);
    });
    it('should successfully get all kinds of revenue balances', async () => {
      await eesCore
        .connect(address1)
        .endorse(
          address2.address,
          ENDORSEMENT_TYPE,
          ENDORSEMENT_COMMENT,
          ENDORSEMENT_SOCIAL,
          {
            value: ENDORSEMENT_PRICE + DONATION_AMOUNT,
          }
        );
      const { donationRevenue } = await calculateValues(
        eesCore,
        ENDORSEMENT_PRICE + DONATION_AMOUNT
      );
      expect(await eesCore.getDonationsFeesBalance()).to.equal(donationRevenue);
      expect(await eesCore.getEndorsementsFeesBalance()).to.equal(
        ENDORSEMENT_PRICE
      );
      expect(await eesCore.getTotalFeesBalance()).to.equal(
        ENDORSEMENT_PRICE + donationRevenue
      );
    });
    it('should successfully withdraw all fees', async () => {
      await eesCore
        .connect(address1)
        .endorse(
          address2.address,
          ENDORSEMENT_TYPE,
          ENDORSEMENT_COMMENT,
          ENDORSEMENT_SOCIAL,
          {
            value: ENDORSEMENT_PRICE + DONATION_AMOUNT,
          }
        );
      const donations = await eesCore.getDonationsFeesBalance();
      const endorsements = await eesCore.getEndorsementsFeesBalance();
      const totalRevenue = await eesCore.getTotalFeesBalance();
      const { donationRevenue } = await calculateValues(
        eesCore,
        ENDORSEMENT_PRICE + DONATION_AMOUNT
      );
      await expect(await eesCore.connect(owner).withdrawAllFees())
        .to.emit(eesCore, 'WithdrawFees')
        .withArgs('ALL', owner.address, totalRevenue);
      expect(donations).to.equal(donationRevenue);
      expect(endorsements).to.equal(ENDORSEMENT_PRICE);
      expect(await eesCore.getDonationsFeesBalance()).to.equal(0);
      expect(await eesCore.getEndorsementsFeesBalance()).to.equal(0);
      expect(await eesCore.getTotalFeesBalance()).to.equal(0);
    });
    it('should successfully withdraw donations fees', async () => {
      await eesCore
        .connect(address1)
        .endorse(
          address2.address,
          ENDORSEMENT_TYPE,
          ENDORSEMENT_COMMENT,
          ENDORSEMENT_SOCIAL,
          {
            value: ENDORSEMENT_PRICE + DONATION_AMOUNT,
          }
        );
      const donations = await eesCore.getDonationsFeesBalance();
      await expect(await eesCore.connect(owner).withdrawDonationFees(donations))
        .to.emit(eesCore, 'WithdrawFees')
        .withArgs('DONATIONS', owner.address, donations);
      expect(await eesCore.getDonationsFeesBalance()).to.equal(0);
    });
    it('should successfully withdraw endorsements fees', async () => {
      const endorsements = await eesCore.getEndorsementsFeesBalance();
      const tx = await eesCore
        .connect(owner)
        .withdrawEndorsementFees(endorsements);
      await expect(tx)
        .to.emit(eesCore, 'WithdrawFees')
        .withArgs('ENDORSEMENTS', owner.address, endorsements);
      expect(await eesCore.getEndorsementsFeesBalance()).to.equal(0);
    });
    it('should fail to withdraw total fees because the caller is not the owner', async () => {
      await expect(
        eesCore.connect(address1).withdrawAllFees()
      ).to.be.revertedWithCustomError(eesCore, 'OwnableUnauthorizedAccount');
    });
    it('should fail to withdraw donations fees because the caller is not the owner', async () => {
      await expect(
        eesCore.connect(address1).withdrawDonationFees(2)
      ).to.be.revertedWithCustomError(eesCore, 'OwnableUnauthorizedAccount');
    });
    it('should fail to withdraw endorsements fees because the caller is not the owner', async () => {
      await expect(
        eesCore.connect(address1).withdrawEndorsementFees(2)
      ).to.be.revertedWithCustomError(eesCore, 'OwnableUnauthorizedAccount');
    });
  });
});
