'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CHAIN_ID_TO_NETWORK_NAME } from '@/utils';
import { useRouter } from 'next/navigation';

export const NetworkSelect = ({ network }: { network: number }) => {
  const router = useRouter();
  return (
    <Select
      value={CHAIN_ID_TO_NETWORK_NAME[network]}
      onValueChange={(value) => {
        // Push the new network to the URL
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('network', value);
        router.push(newUrl.toString());
      }}
    >
      <SelectTrigger className="min-w-[160px] w-[160px] max-sm:w-full">
        <SelectValue placeholder="Type of endorsement" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Networks</SelectLabel>
          <SelectItem key="sepolia" value="sepolia">
            Sepolia
          </SelectItem>
          <SelectItem key="base-sepolia" value="base-sepolia">
            Base-Sepolia
          </SelectItem>
          <SelectItem key="base" value="base">
            Base
          </SelectItem>
          <SelectItem key="localhost" value="localhost">
            Localhost
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
