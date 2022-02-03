import { auth } from '@hooks/auth';

import useSWR from 'swr';

export function useSWRAuth(
  url: string,
  fetcher: (key: string, auth: string) => any,
  options = {}
) {
  return useSWR(url, fetcher, { use: [auth], ...options });
}
