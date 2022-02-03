import { AuthContext } from '@context/AuthContext';

import { useCallback, useContext } from 'react';

export const useFetchCallback = () => {
  const { auth } = useContext(AuthContext);

  const newFetch = useCallback(
    async (url, options = {}, requiredAuth = true) => {
      if (!url) return [null, null];

      const isAuth = (requiredAuth && !!auth.access) as boolean;
      const completeOptions = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include', // include, *same-origin, omit
        ...options,
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      if (isAuth)
        completeOptions.headers = {
          ...completeOptions.headers,
          Authorization: `Bearer ${auth.access}`,
        };

      // merging headers option explicitly, for partial updates
      if ('headers' in options) {
        completeOptions.headers = {
          ...completeOptions.headers,
          ...options.headers,
        };
      }

      try {
        const response = await fetch(url, completeOptions);
        const result = await response.json();
        return [result, response.ok || response.status === undefined];
      } catch (err) {
        return [err.message, false];
      }
    },

    [auth.access]
  );

  return newFetch;
};
