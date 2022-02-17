import { AuthContext } from "@contexts/AuthContext";
import { useContext,useEffect} from "react";
import { useRouter } from "next/router";
import { SERVER_URLS } from "@config";
import { makeUrl } from "@utils/makeUrl";
const { URL_LANDING } = SERVER_URLS;

interface AuthPathProps {
  children?: JSX.Element[] | JSX.Element;
}

const AuthPath = ({ children }: AuthPathProps) => {
  const { isAuthenticated,isLoading } = useContext(AuthContext);
  const router = useRouter();
  useEffect(()=>{
    if(!isAuthenticated){
      router.push(makeUrl(URL_LANDING, { next: router.asPath }));
    }
  })
  return <div>
  { isLoading ? <p>Cargando ando</p> : children}
  </div>;
};
export default AuthPath;