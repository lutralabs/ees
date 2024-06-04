import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button, type ButtonProps } from '@/components/ui/button';

const ConnectButtonCustom = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <ConnectButton.Custom>
        {({ openConnectModal }) => {
          return (
            <Button
              onClick={openConnectModal}
              className={className}
              variant={variant}
              size={size}
              asChild={asChild}
              {...props}
              ref={ref}
            >
              Connect Wallet
            </Button>
          );
        }}
      </ConnectButton.Custom>
    );
  }
);

ConnectButtonCustom.displayName = 'ConnectButtonCustom';

export { ConnectButtonCustom };
