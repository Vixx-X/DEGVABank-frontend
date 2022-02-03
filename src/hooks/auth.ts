import { AuthContext } from "@contexts/AuthContext";
import { useContext } from "react";

// This is a SWR middleware for conditionally triggering auth request.
export function auth(useSWRNext: any) {
  return (
    key: any,
    fetcher: (auth: string, ...key: any[]) => any,
    config: any
  ) => {
    // Use the user acc token to return auth data.
    const { auth, isAuthenticated } = useContext(AuthContext);
    const newFetcher = (...args: any[]) => {
      return fetcher(auth.access, ...args);
    };
    return useSWRNext(isAuthenticated ? key : null, newFetcher, config);
  };
}
