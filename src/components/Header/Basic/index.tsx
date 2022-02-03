import Logotype from "../../Logotype";
import { SERVER_URLS } from "@config";
import Link from "next/link";

const { URL_LOGIN, URL_REGISTER, URL_LANDING } = SERVER_URLS;

interface HeaderProps {
  mode?: string;
  classname?: string;
}

const Header = ({ mode = "light", classname }: HeaderProps) => {
  return (
    <header className={`bg-${mode} w-full ${classname}`}>
      <div className="xl:w-[70rem] max-w-[90%] mx-auto py-2 flex justify-between items-center">
        <Link href={URL_LANDING}>
          <a>
            <Logotype
              sizeTitle="text-4xl"
              classnameText="hidden md:block"
              classnameBox="h-12 md:h-16"
            />
          </a>
        </Link>
        <div className="flex gap-x-2">
          <Link href={URL_LOGIN}>
            <a className="bg-secundary text-white font-bold py-1 px-4 rounded-full cursor-pointer">
              Ingresar
            </a>
          </Link>
          <Link href={URL_REGISTER}>
            <a className="bg-secundary text-white font-bold py-1 px-4 rounded-full cursor-pointer">
              Registrate
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
