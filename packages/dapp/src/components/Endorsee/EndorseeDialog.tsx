'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { type KeyboardEventHandler, useState } from 'react';
import { isAddress } from 'viem';
import { useEndorsementStore } from '@/stores';
import { PLATFORM_DATA, PlatformType } from '@/utils/platform';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { MemoizedSVG } from '@/components/MemoizedSVG';
import { getSearchSuggestions, type SearchListItemType } from '@/utils';
import { SUGGESTED_ACCOUNTS } from '@/utils/constants';

export function EndorseeDialog() {
  const router = useRouter();

  // Global state
  const { changePlatform, changeDisplayValue } = useEndorsementStore(
    (state) => ({
      changePlatform: state.changePlatform,
      changeDisplayValue: state.changeDisplayValue,
    })
  );

  // Local state
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
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
      if (activeIndex === -1) {
        setSuggestions([]);
      } else {
        setActiveIndex(-1);
      }
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

  const selectUser = (platform: PlatformType, handle: string) => {
    changePlatform(platform);
    changeDisplayValue(handle);
    router.push(`/?platform=${platform}&account=${handle}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold text-lg max-lg:w-full" size="lg">
          Who to endorse?
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[525px]">
        <div className="max-w-[525px] overflow-hidden max-lg:max-w-full">
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
          <div className={cn('w-full p-2 bg-white rounded-2xl')}>
            <div className="text-thin mb-2 text-gray-600 text-sm">
              {query === '' ? 'Suggested accounts' : 'Results'}
            </div>
            <div className="w-full">
              {
                <>
                  {suggestions.map((suggestion, idx) => {
                    return (
                      <Button
                        key={suggestion.icon}
                        onMouseDown={() => {
                          selectUser(suggestion.key, suggestion.label);
                        }}
                        variant="ghost"
                        className={cn(
                          'w-full justify-start hover:bg-slate-300',
                          activeIndex === idx ? 'bg-slate-300' : ''
                        )}
                      >
                        <div className="flex gap-x-2 items-center">
                          <MemoizedSVG
                            fill={PLATFORM_DATA[suggestion.key].color}
                            src={PLATFORM_DATA[suggestion.key].icon}
                            width={20}
                            height={20}
                          />
                          {suggestion.label}
                        </div>
                      </Button>
                    );
                  })}
                </>
              }
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
