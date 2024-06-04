import { ethers } from 'hardhat';

export const EAS_ADDRESS = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e';
export const SCHEMA_UID =
  '0x28bb35c3774b2963e8703dccbe93a3d1620ddf91ee3eee4678cdb8fb8e1a8bbb';
export const NEW_GOOD_SCHEMA_UID =
  '0xc89fd0098629005ff32091f7e7ba91b2238f83a67c144978a04311b9f5d99fdd';
export const NEW_GOOD_EAS_ADDRESS =
  '0xde9326aA0e86BF7b646aB46895bE50e27D7802de';

export const DONATION_AMOUNT = ethers.parseEther('0.5');
export const ENDORSEMENT_TYPE = 'Developer';
export const ENDORSEMENT_PRICE = ethers.parseEther('0.00042');
export const ENDORSEMENT_COMMENT = 'A great developer.';
export const ENDORSEMENT_SOCIAL = 'fc:kersic.eth';

export const NEW_GOOD_ENDORSEMENT_PRICE = ethers.parseEther('0.00002');
export const NEW_BAD_ENDORSEMENT_PRICE = ethers.parseEther('0.11');

export const NEW_GOOD_DONATION_PERCENTAGE = 2;
export const NEW_BAD_DONATION_PERCENTAGE = 400;
