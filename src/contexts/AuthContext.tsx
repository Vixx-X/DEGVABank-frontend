import {
  getToken,
  refreshToken,
  revokeToken,
  verifyToken,
} from "@fetches/users";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSWR from "swr";

export const AuthContext = createContext<any>(null);

interface AuthTokens {
  access: string;
}

const REVALIDATE_TOKEN_TIME = 4 * 60 * 1000;
const INVALID_TOKEN = ""; // leave blank

export const AuthContextProvider = ({
  children,
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

  const isLoading = useMemo(
    () => (!data && !error) || isValidating,
    [data, error, isValidating]
  );
  const isAuthenticated = useMemo(() => !!auth.access, [auth]);
  const [unAuthorized, setUnAuthorized] = useState(false);

  useEffect(() => {
    if (error) {
      setAuth({ access: INVALID_TOKEN });
      if (!isValidating) setUnAuthorized(true);
    } else if (data) {
      setAuth({ access: data?.access ?? INVALID_TOKEN });
      setUnAuthorized(false);
    }
  }, [data, error, isValidating]);

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
        unAuthorized,
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
