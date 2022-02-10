import SideBarOption from "./element";
import { SERVER_URLS } from "@config";
import { useState } from "react";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const {
    URL_USER_PROFILE,
    URL_USER_CONFIG,
    URL_USER_TRANSACTION,
    URL_USER_TRANSFER,
    URL_USER_REQUEST,
  } = SERVER_URLS;

  const handleOpen = () => {
    setOpen(!open);
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
          >
            <span>Cuentas</span>
            <button onClick={handleOpen}>
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
            </button>
          </div>
          <ul
            className={open ? "block" : "hidden"}
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
          text="Ajustes"
          link={URL_USER_CONFIG}
          className="border-r-4 border-primary py-4 px-8"
        />
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
        <SideBarOption
          text="Preguntas frecuentes"
          className="border-l-4 border-darkprimary py-4 px-8"
        />
      </ul>
      {/* <hr className="my-2"> */}
    </div>
  );
};

export default SideBar;
