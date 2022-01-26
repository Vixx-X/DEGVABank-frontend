import type { NextPage } from "next";
import Button from "@components/Button/Button";

const Home: NextPage = () => {
  return (
    <>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 divide-y">
          <div>
            <p className="font-light text-3xl mb-3">Login</p>
          </div>
          <div className="pt-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Nombre de usuario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
              {/* <p className="text-red-500 text-xs italic">
                Introduzca una contraseña
              </p> */}
            </div>
            <div className="flex justify-center">
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full">
                <p>Iniciar Sesion</p>
              </Button>
            </div>
            <a
              className="inline-block w-full align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 text-right"
              href="#"
            >
              Forgot Password?
            </a>
            <a
              className="inline-block w-full align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 text-right "
              href="#"
            >
              Dont have an account?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">&copy;Degva Bank.</p>
      </div>
    </>
  );
};

export default Home;
