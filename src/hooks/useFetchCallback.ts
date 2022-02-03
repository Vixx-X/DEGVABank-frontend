import { AuthContext } from "@contexts/AuthContext";
import { useCallback, useContext } from "react";

export const useFetchCallback = (
  callBack: (auth: string, ...args: any[]) => any
) => {
  const { auth } = useContext(AuthContext);

  const newFetch = useCallback(
    (...args: any[]) => callBack(auth.access, ...args),
    [auth.access, callBack]
  );

  return newFetch;
};
