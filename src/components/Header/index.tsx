import Logotype from "../Logotype";
import Link from "next/link";

interface HeaderProps {
  mode?: string;
  classname?: string;
}

const Header = ({ mode = "light", classname }: HeaderProps) => {
  return (
    <header className={`bg-${mode} w-full ${classname}`}>
      <div className="xl:w-[70rem] max-w-[90%] mx-auto py-2 flex justify-between items-center">
        <Link href="/">
          <a>
            <Logotype
              sizeTitle="text-4xl"
              classnameText="hidden md:block"
              classnameBox="h-12 md:h-16"
            />
          </a>
        </Link>
        <div className="flex gap-x-2">
          <Link href="/LogIn">
            <a className="bg-secundary text-white font-bold py-1 px-4 rounded-full cursor-pointer">
              Ingresar
            </a>
          </Link>
          <Link href="/Register">
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
