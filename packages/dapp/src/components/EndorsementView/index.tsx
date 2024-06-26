import { getAttestation } from '@/lib/eas';
import { Suspense } from 'react';
import { EndorsementViewAvatar } from './EndorsementViewAvatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Overview } from './Overview';

type EndorsementViewProps = {
  chainId: number;
  id: string;
  avatar: string;
  accountName: string;
};

const getPropertyValue = (data: any, name: string) => {
  const property = data.find((item: any) => item.name === name);
  if (!property) return null;
  return property.value.value as string;
};

export const EndorsementView = async ({
  chainId,
  id,
  avatar,
  accountName,
}: EndorsementViewProps) => {
  const attestation = await getAttestation({
    chainId,
    id,
  });

  // TODO: Not found view
  if (!attestation) {
    return (
      <div>
        <h1>Not found</h1>
      </div>
    );
  }
  const attestationData = JSON.parse(attestation?.decodedDataJson || '{}');
  const endorsementType = getPropertyValue(attestationData, 'endorsementType');
  const comment = getPropertyValue(attestationData, 'comment');
  const endorser = getPropertyValue(
    attestationData,
    'endorser'
  ) as `0x${string}`;
  const endorseeSocial = getPropertyValue(attestationData, 'endorseeSocial');

  return (
    <div className="overflow-hidden">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-gray-200">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview
            endorser={endorser ?? ''}
            endorsee={accountName}
            endorseeAvatar={avatar}
            endorsementType={endorsementType ?? ''}
            comment={comment ?? ''}
            uid={id}
          />
        </TabsContent>
        <TabsContent value="details">
          <div className="overflow-auto">
            <div>
              <Suspense fallback={<div>loading...</div>}>
                <EndorsementViewAvatar address={endorser} />
              </Suspense>
            </div>
            <div>{endorsementType}</div>
            <div>{comment}</div>
            <div>{endorser}</div>
            <div>{endorseeSocial}</div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
