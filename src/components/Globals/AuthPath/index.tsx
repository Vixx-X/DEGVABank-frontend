import { SERVER_URLS } from "@config";
import { AuthContext } from "@contexts/AuthContext";
import { makeUrl } from "@utils/makeUrl";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const { URL_LOGIN } = SERVER_URLS;

interface AuthPathProps {
  children?: JSX.Element[] | JSX.Element;
}

const AuthPath = ({ children }: AuthPathProps) => {
  const { unAuthorized, isLoading } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (unAuthorized) {
      router.push(makeUrl(URL_LOGIN, { next: router.asPath }));
    }
  });
  return <div>{isLoading ? <p>Cargando ando</p> : children}</div>;
};
export default AuthPath;
