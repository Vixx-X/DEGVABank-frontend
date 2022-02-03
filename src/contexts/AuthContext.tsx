import { SERVER_URLS } from "@config";

import { makeUrl } from "@utils/makeUrl";

import {
  getToken,
  refreshToken,
  revokeToken,
  verifyToken,
} from "@fetches/users";

import { useRouter } from "next/router";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSWR from "swr";

const { URL_LOGIN } = SERVER_URLS;

export const AuthContext = createContext(null);

interface AuthTokens {
  access: string;
}

const REVALIDATE_TOKEN_TIME = 4 * 60 * 1000;
const INVALID_TOKEN = ""; // leave blank

export const AuthContextProvider = ({
  children,
  pageNeedAuth = false,
  access = "",
}: Props & AuthTokens) => {
  const [auth, setAuth] = useState<AuthTokens>({ access }); // auth data

  const { data, error, isValidating, mutate } = useSWR(
    "refresh",
    () => refreshToken(),
    {
      refreshInterval: REVALIDATE_TOKEN_TIME,
      shouldRetryOnError: false,
    }
  );

  const isLoading = useMemo(() => !data && !error, [data, error]);
  const isAuthenticated = useMemo(() => !!auth.access, [auth]);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      setAuth({ access: INVALID_TOKEN });
      if (!isValidating && pageNeedAuth)
        router.push(makeUrl(URL_LOGIN, { next: router.asPath }));
    } else if (data) {
      setAuth({ access: data?.access ?? INVALID_TOKEN });
    }
  }, [data, error, router, pageNeedAuth, isValidating]);

  const _getToken = useCallback(
    async (username: string, password: string) => {
      const result = await getToken(username, password);
      mutate(result, false);
      return result;
    },
    [mutate]
  );

  const _refreshToken = useCallback(async () => {
    await mutate();
  }, [mutate]);

  const _verifyToken = useCallback(async () => {
    return await verifyToken(auth.access);
  }, [auth.access]);

  const _revokeToken = useCallback(async () => {
    mutate({ ...data, access: INVALID_TOKEN }, false);
    const result = await revokeToken();
    return result;
  }, [data, mutate]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        getToken: _getToken,
        refreshToken: _refreshToken,
        verifyToken: _verifyToken,
        revokeToken: _revokeToken,
        isAuthenticated,
        isLoading,
      }}
    >
      {
        // uncomment this if you are unsure of auth
        // <pre>{JSON.stringify({ data, error, isAuthenticated }, null, 2)}</pre>
      }
      {children}
    </AuthContext.Provider>
  );
};
