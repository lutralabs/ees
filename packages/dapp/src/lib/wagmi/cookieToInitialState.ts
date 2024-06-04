import { type State, deserialize, parseCookie } from 'wagmi';

// Code from `https://github.com/wevm/wagmi/blob/main/packages/core/src/utils/cookie.ts`
export const cookieToInitialState = (
  cookie?: string | null,
  keyPrefix = 'wagmi'
) => {
  if (!cookie) return undefined;
  const key = `${keyPrefix}.store`;
  const parsed = parseCookie(cookie, key);
  if (!parsed) return undefined;
  return deserialize<{ state: State }>(parsed).state;
};
