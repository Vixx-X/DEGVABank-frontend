import Logotype from "../../../Logotype";
import NavBar from "@components/Globals/Layout/NavBar";
import { SERVER_URLS } from "@config";
import { UserContext } from "@contexts/UserContext";
import Link from "next/link";
import { useContext } from "react";

const { URL_HOME, URL_LANDING } = SERVER_URLS;

interface headerProps {
  activate?: string;
}

const Header = ({ activate = "home" }: headerProps) => {
  const { user } = useContext(UserContext);
  return (
    <header
      className={`bg-[url('../public/backgroundPage2.png')] bg-cover bg-center relative h-[11rem]`}
    >
      <div className="absolute grow bg-black/60 w-full h-full">
        <div className="xl:w-[70rem] max-w-[90%] mx-auto py-2 flex justify-between items-center">
          <Link href={URL_HOME}>
            <a>
              <Logotype
                sizeTitle="text-4xl"
                classnameText="hidden md:block"
                classnameBox="h-12 md:h-16"
                mode="light"
              />
            </a>
          </Link>
          <div className="flex gap-x-10 items-center">
            <p className="hidden sm:block text-light">
              Buenos dias, {user?.username}
            </p>
            <Link href={URL_LANDING}>
              <a className="bg-light/20 text-white font-bold py-1 px-4 rounded-full cursor-pointer">
                Cerrar sesión
              </a>
            </Link>
          </div>
        </div>
        <div className="absolute bg-black/20 w-full h-20 top-24 flex">
          <NavBar activate={activate} />
        </div>
      </div>
    </header>
  );
};

export default Header;
