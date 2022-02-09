import Button from "@components/Globals/Button/Button";
import MainLayout from "@components/Globals/Layout/MainLayout/Advanced";
import type { NextPage } from "next";

const Direction: NextPage = () => {
  return (
    <MainLayout>
      <form className="rounded mb-4 w-full max-w-[70rem]">
        <div>
          <p className="font-light text-3xl xl:text-4xl mb-3 text-light">
            Agregar Dirección
          </p>
        </div>
        <div className="pt-4 sm:grid sm:grid-cols-2 gap-x-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-sm xl:text-lg font-bold mb-2 text-light"
              htmlFor="nacionality"
            >
              Dirección
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nacionality"
              type="text"
              placeholder="Dirección"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm xl:text-lg font-bold mb-2 text-light"
              htmlFor="birthdate"
            >
              Fecha de nacimiento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="birthdate"
              type="date"
              placeholder="******************"
            />
            {/* <p className="text-red-500 text-xs italic">
                Introduzca una contraseña
              </p> */}
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="mb-4">
              <label
                className="block text-sm xl:text-lg font-bold mb-2 text-light"
                htmlFor="city"
              >
                Ciudad
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                type="text"
                placeholder="Ej: Caracas"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm xl:text-lg font-bold mb-2 text-light"
                htmlFor="postalnumber"
              >
                Código postal
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="postalnumber"
                type="number"
                placeholder="Ej: 1071"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="mb-4">
              <label
                className="block text-sm xl:text-lg font-bold mb-2 text-light"
                htmlFor="idType"
              >
                Tipo de identificación
              </label>
              <select
                id="idType"
                className="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option selected disabled>
                  --Seleccionar--
                </option>
                <option value="1">V-</option>
                <option value="2">E-</option>
                <option value="3">J-</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm xl:text-lg font-bold mb-2 text-light"
                htmlFor="idNumber"
              >
                Número de identificación
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="idNumber"
                type="number"
                placeholder="Ej: 5555555"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm xl:text-lg font-bold mb-2 text-light"
              htmlFor="state"
            >
              Estado/Distrito/Dependencia federal
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="state"
              type="text"
              placeholder="Ej: Distrito Capital"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm xl:text-lg font-bold mb-2 text-light"
              htmlFor="state"
            >
              Calle y numero de casa
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="state"
              type="text"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full max-w-[22rem]">
            <p>Registrar</p>
          </Button>
        </div>
      </form>
    </MainLayout>
  );
};

export default Direction;
