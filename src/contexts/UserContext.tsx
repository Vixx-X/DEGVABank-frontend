import { API_URLS } from "@config";

import { useSWRAuth } from "@hooks/useSWRAuth";

import { getProfileDataWithURL } from "@fetches/users";

import React, { createContext, useCallback, useEffect, useState } from "react";

const { URL_USER_PROFILE } = API_URLS;

export const UserContext = createContext(null);

interface User {
  email: string;
}
interface UserContextProviderProps extends Props {
  user: User;
}

export const UserContextProvider = ({
  children,
  user: _user,
}: UserContextProviderProps) => {
  const [user, setUser] = useState<User>(_user); // user data

  const { data, error, mutate } = useSWRAuth(
    URL_USER_PROFILE,
    getProfileDataWithURL
  );

  const refetch = useCallback(() => {
    mutate();
  }, [mutate]);

  // save user data
  useEffect(() => {
    setUser(data ?? { email: "" });
  }, [data]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading: !error && !data,
        refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
