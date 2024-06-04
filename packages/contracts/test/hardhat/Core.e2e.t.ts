import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';
import type { EESCore } from '../../typechain-types';
import { calculateValues } from './utils';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import {
  DONATION_AMOUNT,
  EAS_ADDRESS,
  ENDORSEMENT_COMMENT,
  ENDORSEMENT_PRICE,
  ENDORSEMENT_SOCIAL,
  ENDORSEMENT_TYPE,
  SCHEMA_UID,
} from './constants';

describe('EESCore e2e', async () => {
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

  it(`should endorse a user, then the user withdraws ${DONATION_AMOUNT}eth`, async () => {
    const endorseeEoaBalanceBeforeEndorsement =
      await ethers.provider.getBalance(address2.address);
    const { donationReward } = await calculateValues(
      eesCore,
      DONATION_AMOUNT + ENDORSEMENT_PRICE
    );

    const endorseTx = await eesCore
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

    const endorseeBalanceAfterEndorsement = await eesCore.getBalance(
      address2.address
    );
    const withdrawTx = await (
      await eesCore.connect(address2).withdraw()
    ).wait();
    const gasPaid = withdrawTx!.gasUsed * withdrawTx!.gasPrice;
    const endorseeBalanceAfterWithdrawal = await eesCore.getBalance(
      address2.address
    );
    const endorseeEoaBalanceAfterWithdrawal = await ethers.provider.getBalance(
      address2.address
    );
    await expect(endorseTx)
      .to.emit(eesCore, 'Endorse')
      .withArgs(
        address1.address,
        address2.address,
        ENDORSEMENT_TYPE,
        anyValue,
        anyValue
      );
    await expect(withdrawTx)
      .to.emit(eesCore, 'Withdraw')
      .withArgs(address2.address, donationReward);
    expect(endorseeBalanceAfterEndorsement).to.equal(donationReward);
    expect(endorseeBalanceAfterWithdrawal).to.equal(0);
    expect(endorseeEoaBalanceAfterWithdrawal).to.equal(
      endorseeEoaBalanceBeforeEndorsement + donationReward - gasPaid
    );
  });

  it('should fail to endorse a user with sent value less than the fee', async () => {
    await expect(
      eesCore
        .connect(address1)
        .endorse(
          address2.address,
          ENDORSEMENT_TYPE,
          ENDORSEMENT_COMMENT,
          ENDORSEMENT_SOCIAL,
          {
            value: ENDORSEMENT_PRICE - ethers.parseEther('0.00001'),
          }
        )
    ).to.be.revertedWith('Insufficient endorsement fee');
  });

  it('should endorse a user with paid fee', async () => {
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
    const endorsementsFee = await eesCore.getTotalFeesBalance();
    await expect(tx)
      .to.emit(eesCore, 'Endorse')
      .withArgs(
        address1.address,
        address2.address,
        ENDORSEMENT_TYPE,
        anyValue,
        anyValue
      );
    expect(balance).to.equal(0);
    expect(endorsementsFee).to.equal(ENDORSEMENT_PRICE);
  });

  it('should fail while non owner tries to withdraw with any of the withdrawal functions', async () => {
    await expect(
      eesCore.connect(address1).withdrawAllFees()
    ).to.be.revertedWithCustomError(eesCore, 'OwnableUnauthorizedAccount');
    await expect(
      eesCore.connect(address1).withdrawDonationFees(2)
    ).to.be.revertedWithCustomError(eesCore, 'OwnableUnauthorizedAccount');
    await expect(
      eesCore.connect(address1).withdrawEndorsementFees(2)
    ).to.be.revertedWithCustomError(eesCore, 'OwnableUnauthorizedAccount');
  });

  it('should endorse a user with paid fee and owner withdraws the fee', async () => {
    const feesBalanceBeforeEndorsement = await eesCore.getTotalFeesBalance();
    const endorseeBalanceBeforeEndorsement = await eesCore.getBalance(
      address2.address
    );
    const endorseTx = await eesCore
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
    const endorseeBalanceAfterEndorsement = await eesCore.getBalance(
      address2.address
    );
    const feesBalanceAfterEndorsement = await eesCore.getTotalFeesBalance();
    const ownerBalanceBeforeWithdrawal = await ethers.provider.getBalance(
      owner.address
    );
    const withdrawTx = await (
      await eesCore.connect(owner).withdrawAllFees()
    ).wait();
    const gasPaid = withdrawTx!.gasUsed * withdrawTx!.gasPrice;

    const feesBalanceAfterWithdrawal = await eesCore.getTotalFeesBalance();
    const ownerBalanceAfterWithdrawal = await ethers.provider.getBalance(
      owner.address
    );

    await expect(withdrawTx)
      .to.emit(eesCore, 'WithdrawFees')
      .withArgs('ALL', owner.address, ENDORSEMENT_PRICE);
    await expect(endorseTx)
      .to.emit(eesCore, 'Endorse')
      .withArgs(
        address1.address,
        address2.address,
        ENDORSEMENT_TYPE,
        anyValue,
        anyValue
      );
    expect(feesBalanceBeforeEndorsement).to.equal(0);
    expect(feesBalanceAfterEndorsement).to.equal(ENDORSEMENT_PRICE);
    expect(endorseeBalanceBeforeEndorsement).to.equal(0);
    expect(endorseeBalanceAfterEndorsement).to.equal(0);
    expect(feesBalanceAfterWithdrawal).to.equal(0);
    expect(ownerBalanceAfterWithdrawal).to.equal(
      ownerBalanceBeforeWithdrawal + ENDORSEMENT_PRICE - gasPaid
    );
  });

  it('should endorse a user, transfer contract ownership and withdraw the revenue from fees', async () => {
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
    await eesCore.connect(owner).transferOwnership(address2.address);
    await expect(
      eesCore.connect(owner).withdrawAllFees()
    ).to.be.revertedWithCustomError(eesCore, 'OwnableUnauthorizedAccount');
    const balanceBeforeWithdrawal = await ethers.provider.getBalance(
      address2.address
    );
    const withdrawTx = await (
      await eesCore.connect(address2).withdrawAllFees()
    ).wait();
    const balanceAfterWithdrawal = await ethers.provider.getBalance(
      address2.address
    );
    const gasPaid = withdrawTx!.gasUsed * withdrawTx!.gasPrice;
    const newOwner = await eesCore.owner();
    expect(balanceAfterWithdrawal).to.equal(
      balanceBeforeWithdrawal + ENDORSEMENT_PRICE + donationRevenue - gasPaid
    );
    expect(newOwner).to.equal(address2.address);
  });

  it('should endorse a user with paid fee and owner withdraws the fee via withdrawEndorsementFees', async () => {
    const feesBalanceBeforeEndorsement = await eesCore.getTotalFeesBalance();
    const endorseeBalanceBeforeEndorsement = await eesCore.getBalance(
      address2.address
    );
    const endorseTx = await eesCore
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
    const endorseeBalanceAfterEndorsement = await eesCore.getBalance(
      address2.address
    );
    const feesBalanceAfterEndorsement = await eesCore.getTotalFeesBalance();
    const ownerBalanceBeforeWithdrawal = await ethers.provider.getBalance(
      owner.address
    );
    const withdrawTx = await (
      await eesCore
        .connect(owner)
        .withdrawEndorsementFees(await eesCore.getEndorsementsFeesBalance())
    ).wait();
    const gasPaid = withdrawTx!.gasUsed * withdrawTx!.gasPrice;

    const feesBalanceAfterWithdrawal = await eesCore.getTotalFeesBalance();
    const ownerBalanceAfterWithdrawal = await ethers.provider.getBalance(
      owner.address
    );

    await expect(withdrawTx)
      .to.emit(eesCore, 'WithdrawFees')
      .withArgs('ENDORSEMENTS', owner.address, ENDORSEMENT_PRICE);
    await expect(endorseTx)
      .to.emit(eesCore, 'Endorse')
      .withArgs(
        address1.address,
        address2.address,
        ENDORSEMENT_TYPE,
        anyValue,
        anyValue
      );
    expect(feesBalanceBeforeEndorsement).to.equal(0);
    expect(feesBalanceAfterEndorsement).to.equal(ENDORSEMENT_PRICE);
    expect(endorseeBalanceBeforeEndorsement).to.equal(0);
    expect(endorseeBalanceAfterEndorsement).to.equal(0);
    expect(feesBalanceAfterWithdrawal).to.equal(0);
    expect(ownerBalanceAfterWithdrawal).to.equal(
      ownerBalanceBeforeWithdrawal + ENDORSEMENT_PRICE - gasPaid
    );
  });

  it('should fail withdrawing endorsement fees because the amount is greater than the balance', async () => {
    await eesCore
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
    await expect(
      eesCore
        .connect(owner)
        .withdrawEndorsementFees(ENDORSEMENT_PRICE + BigInt(1))
    ).to.be.revertedWith('Insufficient balance');
  });

  it('should endorse a user, take fees and correctly donate the donation fee', async () => {
    const donationAmount = ethers.parseEther('0.5');
    const { donationReward, donationRevenue } = await calculateValues(
      eesCore,
      donationAmount + ENDORSEMENT_PRICE
    );

    const feesBalanceBeforeEndorsement = await eesCore.getTotalFeesBalance(); // should be 0
    const endorseeBalanceBeforeEndorsement = await eesCore.getBalance(
      address2.address
    ); // should be 0
    const endorseTx = await eesCore
      .connect(address1)
      .endorse(
        address2.address,
        ENDORSEMENT_TYPE,
        ENDORSEMENT_COMMENT,
        ENDORSEMENT_SOCIAL,
        {
          value: ENDORSEMENT_PRICE + donationAmount,
        }
      );
    const endorseeBalanceAfterEndorsement = await eesCore.getBalance(
      address2.address
    ); // should be more than 0.4 ether
    const feesBalanceAfterEndorsement = await eesCore.getTotalFeesBalance(); // should be ENDORSEMENT_PRICE + 1% of 0.5 ether
    const formattedFeesBalanceAfterEndorsement = ethers.formatEther(
      feesBalanceAfterEndorsement
    );
    const ownerBalanceBeforeWithdrawal = await ethers.provider.getBalance(
      owner.address
    );
    const endorsementFeesBalanceAfterEndorsement =
      await eesCore.getEndorsementsFeesBalance(); // should be ENDORSEMENT_PRICE
    const withdrawTx = await (
      await eesCore
        .connect(owner)
        .withdrawEndorsementFees(await eesCore.getEndorsementsFeesBalance())
    ).wait();
    const gasPaid = withdrawTx!.gasUsed * withdrawTx!.gasPrice;
    const feesBalanceAfterWithdrawal = await eesCore.getTotalFeesBalance(); // should be 1% of 0.5 ether
    const ownerBalanceAfterWithdrawal = await ethers.provider.getBalance(
      owner.address
    ); // should be ENDORSEMENT_PRICE

    await expect(withdrawTx)
      .to.emit(eesCore, 'WithdrawFees')
      .withArgs('ENDORSEMENTS', owner.address, ENDORSEMENT_PRICE);
    await expect(endorseTx)
      .to.emit(eesCore, 'Endorse')
      .withArgs(
        address1.address,
        address2.address,
        ENDORSEMENT_TYPE,
        anyValue,
        anyValue
      );
    expect(feesBalanceBeforeEndorsement).to.equal(0);
    expect(feesBalanceAfterEndorsement).to.equal(
      ENDORSEMENT_PRICE + donationRevenue // this actually equals 0.00542 ether
    );

    expect(formattedFeesBalanceAfterEndorsement).to.equal('0.00542');
    expect(endorseeBalanceBeforeEndorsement).to.equal(0);
    expect(endorseeBalanceAfterEndorsement).to.equal(donationReward);
    expect(endorsementFeesBalanceAfterEndorsement).to.equal(ENDORSEMENT_PRICE);

    expect(feesBalanceAfterWithdrawal).to.equal(donationRevenue);
    expect(ownerBalanceAfterWithdrawal).to.equal(
      ownerBalanceBeforeWithdrawal + ENDORSEMENT_PRICE - gasPaid
    );
  });
});
