'use client';

import {
  useState,
  useEffect,
  useRef,
  useMemo,
  type KeyboardEventHandler,
} from 'react';
import { Input } from '@/components/ui/input';
import { isAddress } from 'viem';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { PLATFORM_DATA, PlatformType } from '@/utils/platform';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MemoizedSVG } from '@/components/MemoizedSVG';
import { useAccount } from 'wagmi';
import { type SearchListItemType, getSearchSuggestions } from '@/utils';
import { SUGGESTED_ACCOUNTS } from '@/utils/constants';
import { useRouter } from 'next/navigation';

export const Searchbar = () => {
  // Hooks
  const { address } = useAccount();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  // Local state
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [suggestions, setSuggestions] =
    useState<SearchListItemType[]>(SUGGESTED_ACCOUNTS);
  const [activeIndex, setActiveIndex] = useState(-1);

  const onKeyDown: KeyboardEventHandler = (e: {
    keyCode: number;
    shiftKey: any;
    preventDefault: () => void;
  }) => {
    // enter
    if (e.keyCode === 13) {
      const _value = suggestions[activeIndex]
        ? suggestions[activeIndex].label
        : query.replaceAll('。', '.');
      selectUser(suggestions[activeIndex].key, _value);
    }
    // escape
    if (e.keyCode === 27) {
      setSuggestions(SUGGESTED_ACCOUNTS);
      setQuery('');
      setShowDropdown(false);
      inputRef?.current?.blur();
    }
    // up
    if (e.keyCode === 38 || (e.shiftKey && e.keyCode === 9)) {
      if (suggestions?.length) e.preventDefault();
      if (suggestions && suggestions.length === 1) {
        setActiveIndex(0);
        return;
      }
      if (!activeIndex) {
        setActiveIndex(suggestions.length - 1);
      } else {
        setActiveIndex(activeIndex - 1);
      }
    }
    // down
    if (e.keyCode === 40 || (!e.shiftKey && e.keyCode === 9)) {
      if (suggestions?.length) e.preventDefault();
      if (suggestions && suggestions.length === 1) return setActiveIndex(0);
      if (activeIndex === null || activeIndex >= suggestions.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }
  };

  // Functions
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    if (value === '') {
      setSuggestions(SUGGESTED_ACCOUNTS);
      return;
    }
    if (isAddress(value)) {
      setSuggestions([
        {
          key: PlatformType.ethereum,
          label: value,
          icon: '/icons/icon-ethereum.svg',
        },
      ]);
      return;
    }
    const suggestions = getSearchSuggestions(value);
    setSuggestions(suggestions);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowDropdown(true);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const dropdown = document.getElementById('dropdown');
    const input = document.getElementById('input');

    if (
      dropdown &&
      !dropdown.contains(target) &&
      input &&
      !input.contains(target)
    ) {
      setShowDropdown(false);
    }
  };

  const selectUser = (platform: PlatformType, handle: string) => {
    setShowDropdown(false);
    router.push(`/profile/${handle}?platform=${platform}`);
  };

  const DropdownContent = useMemo(() => {
    return (
      <>
        <div className="w-full">
          <div className="w-full p-2 bg-white rounded-2xl overflow-auto">
            <div className="text-thin mb-2 text-gray-600 text-sm">
              {query === '' ? 'Suggested accounts' : 'Results'}
            </div>
            {suggestions.map((suggestion, idx) => {
              return (
                <Link
                  key={suggestion.icon}
                  onClick={() => {
                    setShowDropdown(false);
                    setModalOpen(false);
                  }}
                  prefetch={false}
                  href={`/profile/${suggestion.label}?platform=${suggestion.key}`}
                  className={cn(
                    'w-full justify-start gap-x-2 hover:bg-slate-300 inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2',
                    activeIndex === idx && 'bg-slate-300'
                  )}
                >
                  <MemoizedSVG
                    fill={PLATFORM_DATA[suggestion.key].color}
                    src={PLATFORM_DATA[suggestion.key].icon}
                    width={20}
                    height={20}
                  />
                  {suggestion.label}
                </Link>
              );
            })}
          </div>
        </div>
      </>
    );
  }, [query, suggestions, activeIndex]);

  // Hooks
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={cn(
        'w-full flex max-lg:justify-end 2xl:w-full xl:pr-0',
        address ? 'lg:pr-14 lg:w-[80%]' : 'lg:w-full'
      )}
    >
      <Button
        onMouseDown={() => setModalOpen(true)}
        size="icon"
        className="h-10 w-10 bg-white text-gray-900 hover:bg-white hover:scale-105 duration-200 lg:hidden transition-all shadow-lg"
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
      </Button>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="lg:hidden w-full overflow-hidden max-md:top-44">
          <div>
            <div className="relative flex items-center">
              <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                onKeyDown={onKeyDown}
                placeholder="Search ENS, Farcaster and Lens"
                value={query}
                onChange={handleInputChange}
                className="pl-8 rounded-b-none"
              />
            </div>
            {DropdownContent}
          </div>
        </DialogContent>
      </Dialog>
      <div className="relative w-full max-lg:hidden">
        <div className="relative w-full flex justify-center">
          <div id="input" className="relative flex flex-1 justify-center">
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search ENS, Farcaster, and Lens"
              value={query}
              ref={inputRef}
              onKeyDown={onKeyDown}
              isSearchbar={true}
              onChange={handleInputChange}
              className="pl-8 shadow-md"
              onFocus={() => setShowDropdown(true)}
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-slate-300 text-slate-500 px-1.5 opacity-100">
              <span className="text-lg">⌘</span>
              <span className="text-[0.85rem]">K</span>
            </kbd>
          </div>
        </div>
        <div className="relative w-full flex justify-center">
          <div
            id="dropdown"
            className={cn(
              'absolute w-full mt-1 p-2 bg-white rounded-2xl shadow-lg border-1 border-blue-100 z-20',
              !showDropdown && 'hidden'
            )}
          >
            {DropdownContent}
          </div>
        </div>
      </div>
    </div>
  );
};
