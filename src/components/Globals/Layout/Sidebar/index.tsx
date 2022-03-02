import SideBarOption from "./element";
import { SERVER_URLS } from "@config";
import { UserContext } from "@contexts/UserContext";
import { useState } from "react";
import { useContext } from "react";

const SideBar = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  const [openAccount, setOpenAcount] = useState(true);
  const [openRunway, setOpenRunway] = useState(false);
  const [displayAccounts, setDisplayAccounts] = useState(false);
  const [displayRunway, setdisplayRunway] = useState(false);
  const {
    URL_USER_PROFILE,
    URL_USER_TRANSACTION,
    URL_USER_TRANSFER,
    URL_USER_REQUEST,
    URL_USER_PAYWAY_APPS,
    URL_PAYWAYS_DOCS,
  } = SERVER_URLS;

  const handleAccountOpen = () => {
    setDisplayAccounts(!displayAccounts);
    setOpenAcount(!openAccount);
  };
  const handleOpenRunWay = () => {
    setdisplayRunway(!displayRunway);
    setOpenRunway(!openRunway);
  };

  return (
    <div className="shadow-md bg-white border-gray-200">
      <div className="pb-2 px-6"></div>
      <ul className="relative pb-2 divide-y">
        <li className="relative" id="sidenavSecEx2">
          <div
            className="flex items-center border-l-4 border-primary text-sm py-5 px-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer justify-between"
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSidenavSecEx2"
            aria-expanded="false"
            aria-controls="collapseSidenavSecEx2"
            onClick={handleAccountOpen}
          >
            <span>Cuentas</span>
            <button>
              {displayAccounts ? (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  className="w-3 h-3 ml-auto"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                  ></path>
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  className="w-3 h-3 ml-auto"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z"
                  />
                </svg>
              )}
            </button>
          </div>
          <ul
            className={openAccount ? "block" : "hidden"}
            id="collapseSidenavSecEx2"
            aria-labelledby="sidenavSecEx2"
            data-bs-parent="#sidenavSecExample"
          >
            <SideBarOption
              text="Ver movimientos bancarios"
              link={URL_USER_TRANSACTION}
              className="py-6 pl-12 pr-6 h-6"
            />
            <SideBarOption
              text="Realizar transferencias"
              link={URL_USER_TRANSFER}
              className="py-6 pl-12 pr-6 h-6"
            />
          </ul>
        </li>
        <SideBarOption
          text="Solicitar Producto"
          link={URL_USER_REQUEST}
          className="border-l-4 border-darkprimary py-4 px-8"
        />
        <SideBarOption
          text="Ver perfil"
          link={URL_USER_PROFILE}
          className="border-r-4 border-primary py-4 px-8"
        />
        <li className="relative" id="sidenavSecEx2">
          <div
            className="flex items-center border-l-4 border-primary text-sm py-5 px-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer justify-between"
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSidenavSecEx2"
            aria-expanded="false"
            aria-controls="collapseSidenavSecEx2"
            onClick={handleOpenRunWay}
          >
            <span>Pasarela de Pago</span>
            <button>
              {displayRunway ? (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  className="w-3 h-3 ml-auto"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                  ></path>
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  className="w-3 h-3 ml-auto"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z"
                  />
                </svg>
              )}
            </button>
          </div>
          <ul
            className={openRunway ? "block" : "hidden"}
            id="collapseSidenavSecEx2"
            aria-labelledby="sidenavSecEx2"
            data-bs-parent="#sidenavSecExample"
          >
            {user.type === "JURIDIC" && (
              <SideBarOption
                text="Pasarelas Activas"
                link={URL_USER_PAYWAY_APPS}
                className="py-6 pl-12 pr-6 h-6"
              />
            )}
            <SideBarOption
              text="Documentacion"
              link={URL_PAYWAYS_DOCS}
              className="py-6 pl-12 pr-6 h-6"
            />
          </ul>
        </li>
      </ul>
      {/* <hr className="my-2"> */}
    </div>
  );
};

export default SideBar;
