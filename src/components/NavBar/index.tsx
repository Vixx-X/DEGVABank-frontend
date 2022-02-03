import {
  faHome,
  faUserCircle,
  faPeopleArrows,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import ElementNavBar from "./element";

interface HeaderProps {
  activate?: string;
}

const NavBar = ({ activate = "home" }: HeaderProps) => {
  return (
    <nav className="xl:w-[70rem] max-w-[90%] mx-auto flex items-center justify-around gap-x-6">
      <ElementNavBar
        icon={faHome}
        link="/Home"
        text="home"
        activate={activate == "home"}
      />
      <ElementNavBar
        icon={ faUserCircle}
        link="/"
        text="Usuario"
        activate={activate == "user"}
      />
      <ElementNavBar
        icon={faPeopleArrows}
        link="/"
        text="Movimientos"
        activate={activate == "movements"}
      />
      <ElementNavBar
        icon={faCogs}
        link="/"
        text="Ajustes"
        activate={activate == "settings"}
      />
    </nav>
  );
};

export default NavBar;
