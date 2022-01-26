import type { NextPage } from "next";
import Button from "@components/Button/Button";
import Header from "@components/Header";
import Footer from "@components/Footer";

const LogIn: NextPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="bg-[url('../public/backgroundPage2.png')] bg-cover bg-center grow relative">
          <div className="absolute grow bg-black/60 w-full h-full">
            <div className="max-w-[90%] grid place-items-center mx-auto w-full h-full">
              <form className="rounded mb-4 divide-y w-full max-w-[22rem]">
                <div>
                  <p className="font-light text-3xl xl:text-4xl mb-3 text-light">Login</p>
                </div>
                <div className="pt-4">
                  <div className="mb-4">
                    <label
                      className="block text-sm xl:text-lg font-bold mb-2 text-light"
                      htmlFor="username"
                    >
                      Nombre de usuario
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-sm xl:text-lg font-bold mb-2 text-light"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                    {/* <p className="text-red-500 text-xs italic">
                Introduzca una contraseña
              </p> */}
                  </div>
                  <div className="flex justify-center">
                    <Button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full">
                      <p>Iniciar Sesion</p>
                    </Button>
                  </div>
                  <a
                    className="inline-block w-full align-baseline font-bold text-sm xl:text-lg  mt-4 text-light hover:text-primary text-right"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                  <a
                    className="inline-block w-full align-baseline font-bold text-sm xl:text-lg text-light hover:text-primary text-right "
                    href="#"
                  >
                    Dont have an account?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LogIn;
