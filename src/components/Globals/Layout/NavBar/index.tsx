import ElementNavBar from "./element";
import { SERVER_URLS } from "@config";
import {
  faHome,
  faUserCircle,
  faPeopleArrows,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

const { URL_HOME, URL_USER_PROFILE, URL_USER_CONFIG, URL_USER_TRANSACTION } =
  SERVER_URLS;

interface HeaderProps {
  activate?: string;
}

const NavBar = ({ activate }: HeaderProps) => {
  return (
    <nav className="max-w-[70rem] w-[90%] mx-auto flex items-center justify-between md:justify-around gap-x-6">
      <ElementNavBar
        icon={faHome}
        link={URL_HOME}
        text="home"
        activate={activate == "home"}
      />
      <ElementNavBar
        icon={faUserCircle}
        link={URL_USER_PROFILE}
        text="Usuario"
        activate={activate == "user"}
      />
      <ElementNavBar
        icon={faPeopleArrows}
        link={URL_USER_TRANSACTION}
        text="Movimientos"
        activate={activate == "movements"}
      />
      <ElementNavBar
        icon={faCogs}
        link={URL_USER_CONFIG}
        text="Ajustes"
        activate={activate == "settings"}
      />
    </nav>
  );
};

export default NavBar;
