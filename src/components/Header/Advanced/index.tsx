import Logotype from "../../Logotype";
import Link from "next/link";
import NavBar from "@components/NavBar";

interface HeaderProps {
  mode?: string;
  classname?: string;
}

const Header = ({ mode = "light", classname }: HeaderProps) => {
  return (
    <header
      className={`bg-[url('../public/backgroundPage2.png')] bg-cover bg-center relative h-[11rem]`}
    >
      <div className="absolute grow bg-black/60 w-full h-full">
        <div className="xl:w-[70rem] max-w-[90%] mx-auto py-2 flex justify-between items-center">
          <Link href="/">
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
            <p className="text-light">Buenos dias, username</p>
            <Link href="/">
              <a className="bg-light/20 text-white font-bold py-1 px-4 rounded-full cursor-pointer">
                Cerrar sesión
              </a>
            </Link>
          </div>
        </div>
        <div className="absolute bg-black/20 w-full h-20 top-24 flex">
          <NavBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
