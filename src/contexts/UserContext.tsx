import { API_URLS } from "@config";
import { getProfileDataWithURL } from "@fetches/users";
import { useSWRAuth } from "@hooks/useSWRAuth";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "user";

const { URL_USER_PROFILE } = API_URLS;

export const UserContext = createContext<any>(null);

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

  const isLoading = useMemo(
    () => (!error && !data) || !user?.email,
    [data, error, user?.email]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
