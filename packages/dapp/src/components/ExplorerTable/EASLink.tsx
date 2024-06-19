import { formatAddress } from '@/utils';

export const EASLink = ({ value }: { value: string }) => {
  return (
    <a
      className="text-sm text-primary-500 hover:text-primary-600 hover:underline"
      href={`https://base.easscan.org/attestation/view/${value}`}
      target="_blank"
      rel="noreferrer"
    >
      {formatAddress(value)}
    </a>
  );
};
