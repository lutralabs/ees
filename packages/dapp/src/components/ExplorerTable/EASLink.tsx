import { formatAddress } from '@/utils';
import Link from 'next/link';

export const EASLink = ({ value }: { value: string }) => {
  return (
    <Link
      prefetch={false}
      className="text-sm text-primary-500 hover:text-primary-600 hover:underline"
      href={`https://base.easscan.org/attestation/view/${value}`}
      target="_blank"
      rel="noreferrer"
    >
      {formatAddress(value)}
    </Link>
  );
};
