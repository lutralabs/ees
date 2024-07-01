'use client';

import { GiftIcon } from '@heroicons/react/24/outline';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const GiftIconWithHover = () => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <GiftIcon className="w-6 h-6 text-primary" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Includes tip</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
