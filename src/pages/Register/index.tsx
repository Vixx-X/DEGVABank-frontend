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
              <form className="rounded mb-4 divide-y w-full max-w-[40rem]">
                <div>
                  <p className="font-light text-3xl xl:text-4xl mb-3 text-light">
                    Login
                  </p>
                </div>
                <div className=" pt-4">
                  <div className="flex flex-wrap">
                    <div className="w-[45%] m-2">
                      <label
                        className="block text-sm xl:text-lg font-bold mb-2 text-light"
                        htmlFor="input-username"
                      >
                        Nombre de usuario
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="input-username"
                        type="text"
                        placeholder="Username"
                      />
                    </div>
                    <div className="w-[45%] m-2">
                      <label
                        className="block text-sm xl:text-lg font-bold mb-2 text-light"
                        htmlFor="input-correo"
                      >
                        Correo
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="input-correo"
                        type="email"
                        placeholder="Correo"
                      />
                    </div>
                    <div className="w-[45%] m-2">
                      <label
                        className="block text-sm xl:text-lg font-bold mb-2 text-light"
                        htmlFor="input-password"
                      >
                        Contraseña
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="input-password"
                        type="password"
                        placeholder="******************"
                      />
                    </div>
                    <div className="w-[45%] m-2">
                      <label
                        className="block text-sm xl:text-lg font-bold mb-2 text-light"
                        htmlFor="input-password-confirm"
                      >
                        Confirmar Contraseña
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="input-password-confirm"
                        type="password"
                        placeholder="******************"
                      />
                    </div>
                    <div className="w-[45%] m-2">
                      <label
                        className="block text-sm xl:text-lg font-bold mb-2 text-light"
                        htmlFor="input-telefono"
                      >
                        Telefono
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="input-telefono"
                        type="tel"
                        placeholder="Telefono"
                      />
                    </div>
                    <div className="w-[45%] m-2">
                      <label className="block text-sm xl:text-lg font-bold mb-2 text-light">
                        Tipo de Usuario
                      </label>
                      <div className="flex">
                        <div>
                          <div className="form-check">
                            <input
                              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              type="radio"
                              name="radio-button"
                              id="radio-button-natural"
                            />
                            <label
                              className="form-check-label inline-block text-gray-800"
                              htmlFor="radio-button-natural"
                            >
                              <p className="text-light">Natural</p>
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              type="radio"
                              name="radio-button"
                              id="radio-button-juridico"
                            />
                            <label
                              className="form-check-label inline-block text-gray-800"
                              htmlFor="radio-button-juridico"
                            >
                              <p className="text-light">Juridico</p>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button className="w-[55%] bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full">
                      <p>Siguiente</p>
                    </Button>
                  </div>
                  <a
                    className="inline-block w-full align-baseline font-bold text-sm xl:text-lg  mt-4 text-light hover:text-primary text-right"
                    href="#"
                  >
                    Ya tienes cuenta?
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
