import type { EESCore } from '../../typechain-types';
import { ethers } from 'hardhat';

/**
 * Gets the donation reward and donation revenue for a given amount of funds received
 * @param eesCore
 * @param fundsReceived
 * @returns
 */
export const calculateValues = async (
  eesCore: EESCore,
  fundsReceived: bigint,
  endorsementPrice: bigint = ethers.parseEther('0.00042')
) => {
  const donationFeePercentage = await eesCore.getDonationFeePercentage();
  const remainingPercentage = BigInt(10000) - donationFeePercentage;
  const donationReward =
    ((fundsReceived - endorsementPrice) * remainingPercentage) / BigInt(10000);
  const donationRevenue =
    ((fundsReceived - endorsementPrice) * donationFeePercentage) /
    BigInt(10000);
  const endorsementRevenue = endorsementPrice;

  return {
    donationReward,
    endorsementRevenue,
    donationRevenue,
  };
};
