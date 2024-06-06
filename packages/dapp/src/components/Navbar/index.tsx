import { ConnectButton } from '@/components/ConnectButton';
import { Searchbar } from './Searchbar';
import { Nunito } from 'next/font/google';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ClaimNavigationLink } from './ClaimNavigationLink';
import { MemoizedImage } from '@/components/MemoizedImage';

const nunito = Nunito({ subsets: ['latin'] });

export const Navbar = () => {
  return (
    <header className="h-20">
      <nav className="w-full py-5 px-3 flex">
        <Link className="col-span-2" href="/">
          <div className="flex gap-x-2 items-center min-w-12">
            <MemoizedImage
              src="/EES_logo.svg"
              alt="logo"
              width={57}
              height={42}
            />
            <div
              className={cn(
                'font-bold text-5xl text-blue-950',
                'max-sm:hidden',
                nunito.className
              )}
            >
              Endorse
            </div>
          </div>
        </Link>
        <div className="flex flex-1 gap-x-4 items-center">
          <div className="pl-16 flex flex-1 max-lg:justify-end">
            <Searchbar />
          </div>
          <ClaimNavigationLink />
          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </nav>
    </header>
  );
};
