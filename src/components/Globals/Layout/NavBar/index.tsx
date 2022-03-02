import ElementNavBar from "./element";
import { SERVER_URLS } from "@config";
import {
  faHome,
  faUserCircle,
  faPeopleArrows,
  faAngleDoubleRight,
  faCreditCard
} from "@fortawesome/free-solid-svg-icons";
const { URL_HOME, URL_USER_PROFILE, URL_USER_TRANSFER, URL_USER_TRANSACTION,URL_USER_REQUEST } =
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
        text="Home"
        activate={activate == "home"}
      />
      <ElementNavBar
        icon={faUserCircle}
        link={URL_USER_PROFILE}
        text="Perfil"
        activate={activate == "user"}
      />
      <ElementNavBar
        icon={faPeopleArrows}
        link={URL_USER_TRANSACTION}
        text="Movimientos"
        activate={activate == "movements"}
      />
      <ElementNavBar
        icon={faAngleDoubleRight}
        link={URL_USER_TRANSFER}
        text="Trasferencia"
        activate={activate == "transfer"}
      />
      <ElementNavBar
        icon={faCreditCard}
        link={URL_USER_REQUEST}
        text="Solicitar Producto"
        activate={activate == "products"}
      />
    </nav>
  );
};

export default NavBar;
