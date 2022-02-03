export const fetcher = (...args: any[]) =>
  /* eslint-disable-next-line prefer-spread */
  fetch.apply(null, args).then((res: any) => res.json());
