import { defaultSearchSuffix, fuzzyDomainSuffix } from './constants';
import {
  PlatformSystem,
  PlatformType,
  SocialPlatformMapping,
} from './platform';

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const startsWithVowel = (word: string) => {
  return /^[aeiou]/i.test(word);
};

export const formatHandle = (handle: string, platform: PlatformType) => {
  if (platform === PlatformType.lens) {
    return `@${handle.substring(0, handle.indexOf('.'))}`;
  }
  if (platform === PlatformType.farcaster) {
    return `@${handle}`;
  }
  return handle;
};

export type SearchListItemType = {
  key: PlatformType;
  label: string;
  system?: PlatformSystem;
  icon?: string;
};

const matchQuery = (query: string, index = 0) => {
  if (!query) return '';
  return query.includes('.')
    ? query.split('.')[index]
    : query.includes('。')
      ? query.split('。')[index]
      : query;
};

const isQuerySplit = (query: string) => {
  return query.includes('.') || query.includes('。');
};

export const getSearchSuggestions = (query: string) => {
  const isLastDot = query[query.length - 1] === '.';
  // address or query.x
  if (
    fuzzyDomainSuffix
      .filter((x) => !x.suffixes)
      .some((x) => x.match.test(query)) ||
    (isQuerySplit(query) && !isLastDot)
  ) {
    if (isLastDot) return [];
    const suffix = matchQuery(query, query.split('.').length - 1);
    const backupDomains = fuzzyDomainSuffix
      .filter(
        (x) =>
          x.match.test(query) || x.suffixes?.some((i) => i.startsWith(suffix))
      )
      .map((x) => {
        if (
          x.suffixes &&
          !fuzzyDomainSuffix
            .filter((x) => !x.suffixes)
            .some((x) => x.match.test(query))
        ) {
          return {
            key: x.key,
            text: `${query.replace(`.${suffix}`, '')}.${x.suffixes?.find((i) =>
              i.startsWith(suffix)
            )}`,
            icon: x.icon,
            system: PlatformSystem.web3,
          };
        }
        if (x.key !== PlatformType.farcaster)
          return {
            key: x.key,
            text: query,
            icon: x.icon,
            system: PlatformSystem.web3,
          };
      });
    return backupDomains.reduce((pre, cur) => {
      if (cur?.key) {
        pre.push({
          key: cur.key,
          icon: cur?.icon,
          label: cur.text,
          system: PlatformSystem.web3,
        });
      }
      return pre;
    }, new Array<SearchListItemType>());
  }
  return defaultSearchSuffix.reduce((pre, cur) => {
    const label = query + (cur.label ? `.${cur.label}` : '');

    if (!isLastDot) {
      pre.push({
        key: cur.key,
        icon: SocialPlatformMapping(cur.key).icon,
        label: label,
        system: cur.system,
      });
    } else {
      if (cur.system === PlatformSystem.web3)
        pre.push({
          key: cur.key,
          icon: SocialPlatformMapping(cur.key).icon,
          label: `${query}${cur.label || cur.optional}`,
          system: PlatformSystem.web3,
        });
    }

    return pre;
  }, new Array<SearchListItemType>());
};
