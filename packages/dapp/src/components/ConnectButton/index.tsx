'use client';

import { ConnectButton as RainbowButton } from '@rainbow-me/rainbowkit';

export const ConnectButton = () => {
  return (
    <RainbowButton
      chainStatus="icon"
      showBalance={false}
      accountStatus={{
        smallScreen: 'avatar',
        largeScreen: 'full',
      }}
    />
  );
};
