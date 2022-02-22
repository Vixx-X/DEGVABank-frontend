import Logotype from "@components/Globals/Logotype";
import { NextPage } from "next";

interface PayGateway {
  email: "";
  cardInfo: {
    number: 0;
    expirationDate: "";
    cvc: "";
  };
  nameOnCard: "";
}

const Login: NextPage = () => {
  return (
    <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
      <div className="w-[40rem]">
        <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
          <div className="w-full pt-1 pb-5">
            <Logotype classnameBox="h-16 justify-center" />
          </div>
          <div className="mb-10">
            <h1 className="text-center font-bold text-xl uppercase">
              Iniciar Sesión
            </h1>
          </div>
          <div className="py-2">
          <label className="font-bold text-sm mb-2 ml-1" htmlFor="username">
            Nombre de usuario
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors bg-white"
            placeholder="username"
          />
        </div>
          <div className="mb-6 py-2">
            <label className="font-bold text-sm mb-2 ml-1" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors bg-white"
              placeholder="Password"
            />
          </div>
          <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
            <i className="mdi mdi-lock-outline mr-1"></i> Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
