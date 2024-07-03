import { getAttestation } from '@/lib/eas';
import { Suspense } from 'react';
import { EndorsementViewAvatar } from './EndorsementViewAvatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Overview } from './Overview';
import { getPropertyValue } from '@/utils/getPropertyValue';
import { Skeleton } from '../ui/skeleton';
import { FeedNavigation } from './FeedNavigation';
import { Details } from './Details';

type EndorsementViewProps = {
  chainId: number;
  id: string;
  avatar: string;
  displayName: string;
  endorsementTab?: string;
};

const TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'details', label: 'Details' },
] as const;

type TabType = (typeof TABS)[number]['value'];

const validateOrGetDefaultTab = (tab: string | undefined) => {
  if (!tab) return 'overview';
  // Check if the tab is valid
  const lowercaseTab = tab.toLowerCase();

  if (TABS.some((item) => item.value === lowercaseTab)) {
    return lowercaseTab as TabType;
  }

  // If the tab is not valid, return the default tab
  return 'overview';
};

export const EndorsementView = async ({
  chainId,
  id,
  avatar,
  displayName,
  endorsementTab,
}: EndorsementViewProps) => {
  const attestation = await getAttestation({
    chainId,
    id,
  });

  const _tab = validateOrGetDefaultTab(endorsementTab);

  // TODO: Not found view
  if (!attestation) {
    return (
      <div>
        <h1>Not found</h1>
      </div>
    );
  }
  const attestationData = JSON.parse(attestation?.decodedDataJson || '{}');
  const timestamp = attestation.timeCreated;
  const txid = attestation.txid;
  const revoked = attestation.revoked;
  const endorsementType = getPropertyValue(attestationData, 'endorsementType');
  const comment = getPropertyValue(attestationData, 'comment');
  const endorser = getPropertyValue(
    attestationData,
    'endorser'
  ) as `0x${string}`;

  const endorserAvatar = (
    <Suspense fallback={<div>loading...</div>}>
      <EndorsementViewAvatar size="sm" address={endorser} />
    </Suspense>
  );

  return (
    <div className="overflow-hidden">
      <FeedNavigation endorsementTab={_tab} />
      <Suspense
        key={_tab}
        fallback={
          <div className="mt-4 w-full">
            <Skeleton className="w-full h-48 bg-gray-200 rounded-sm" />
          </div>
        }
      >
        <div className="p-4">
          {_tab === 'overview' && (
            <Overview
              endorser={endorser ?? ''}
              endorserAvatar={endorserAvatar}
              endorsee={displayName}
              endorseeAvatar={avatar}
              endorsementType={endorsementType ?? ''}
              comment={comment ?? ''}
              uid={id}
            />
          )}
          {_tab === 'details' && (
            <Details
              endorserAvatar={endorserAvatar}
              endorserAddress={endorser}
              endorsementType={endorsementType as string}
              comment={comment}
              timestamp={timestamp}
              txid={txid}
              revoked={revoked}
              uid={id}
            />
          )}
        </div>
      </Suspense>
    </div>
  );
};
