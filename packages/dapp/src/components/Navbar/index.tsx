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
    <header className="h-20 relative">
      <nav className="w-full py-5 px-3 flex">
        <Link className="max-lg:flex-1 z-10" href="/">
          <div className="flex gap-x-1 items-center min-w-12">
            <MemoizedImage
              src="/EES_logo.svg"
              alt="logo"
              width={57}
              height={42}
            />
            <div
              className={cn(
                'font-bold text-4xl text-blue-950',
                'max-sm:hidden',
                nunito.className
              )}
            >
              endorse.fun
            </div>
          </div>
        </Link>
        <div className="lg:absolute left-0 lg:w-full py-1">
          <div className="lg:mx-auto max-w-[1440px] h-full px-2 sm:px-4 lg:px-8">
            <div className="flex justify-center lg:w-[50%] lg:mx-auto">
              <Searchbar />
            </div>
          </div>
        </div>
        <div className="flex lg:flex-1 gap-x-2 sm:gap-x-4 items-center justify-end">
          <ClaimNavigationLink />
          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </nav>
    </header>
  );
};
