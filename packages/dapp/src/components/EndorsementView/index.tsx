import { getAttestation } from '@/lib/eas';
import { Suspense } from 'react';
import { EndorsementViewAvatar } from './EndorsementViewAvatar';

type EndorsementViewProps = {
  chainId: number;
  id: string;
};

const getPropertyValue = (data: any, name: string) => {
  const property = data.find((item: any) => item.name === name);
  if (!property) return null;
  return property.value.value as string;
};

export const EndorsementView = async ({
  chainId,
  id,
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
    </div>
  );
};
