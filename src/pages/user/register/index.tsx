import Button from "@components/Button/Button";
import MainLayout from "@components/Layout";
import { SERVER_URLS } from "@config";
import { AuthContext } from "@contexts/AuthContext";
import { filterOpenRedirect } from "@utils/filterOpenRedirect";
import { Formik, Form, Field } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const { URL_HOME } = SERVER_URLS;

//import * as Yup from "yup";

enum typePesron {
  Natural = "Natural",
  Juridical = "Jurídico",
}

interface Account {
  id: number;
  type: string;
  date: Date;
  balance: number;
}

interface SignupForm {
  password: string;
  passwordConfirm: string;
  userName: string;
  email: string;
  tel: number;
  typePerson: typePesron;
  account: Account;
}

const initialValue: SignupForm = {
  password: "",
  passwordConfirm: "",
  userName: "",
  email: "",
  tel: 0,
  typePerson: typePesron.Natural,
  account: { id: 0, type: "", date: new Date(), balance: 0 },
};

const Registro: NextPage = () => {
  const { getToken } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: SignupForm) => {
    setLoading(true);
    try {
      // actual get token (it return the response in case of error)
      await getToken(data);
      const next = router.query?.next as string;
      router.push(next ? filterOpenRedirect(next) : URL_HOME);
    } catch (error) {
      setError(true);
      setMessageError("Hay un error con la página");
    } finally {
      setLoading(false);
    }
  };
  return (
    <MainLayout>
      <div className="rounded mb-4 w-[90%] max-w-[60rem] my-10 mb-14">
        <Formik
          initialValues={initialValue}
          //validationSchema={SignupSchema}
          onSubmit={(values: SignupForm) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <div className="divide-y">
              <div>
                <p className="font-light text-3xl xl:text-4xl mb-3 text-light">
                  Registro
                </p>
              </div>
              <div className="pt-4 grid sm:grid-cols-2 gap-x-8 justify-center">
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="name"
                  >
                    Nombre
                  </label>
                  <Field
                    type="text"
                    label="Nombre"
                    name="name"
                    id="name"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Nombre"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="lastname"
                  >
                    Apellido
                  </label>
                  <Field
                    type="text"
                    label="Apellido"
                    name="lastname"
                    id="lastname"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Apellido"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="username"
                  >
                    Nombre de usuario
                  </label>
                  <Field
                    type="text"
                    label="Nombre de usuario"
                    name="userName"
                    id="username"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Username"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="email"
                  >
                    Correo
                  </label>
                  <Field
                    type="email"
                    label="Correo electrónico"
                    name="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="E-mail"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <Field
                    type="password"
                    label="Contraseña"
                    id="password"
                    name="password"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="passwordConfirm"
                  >
                    Confirmar contraseña
                  </label>
                  <Field
                    type="password"
                    label="Confirmar contraseña"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Confirmar contraseña"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-lg font-bold mb-2 text-light"
                    htmlFor="passwordConfirm"
                  >
                    Teléfono
                  </label>
                  <Field
                    type="tel"
                    label="Teléfono"
                    id="tel"
                    name="tel"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Teléfono"
                  />
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
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="mb-4">
                    <p className="block text-sm xl:text-lg font-bold mb-2 text-light flex items-center">
                      Tipo de usuario
                    </p>
                    <label className="block text-sm xl:text-lg mb-2 text-light flex items-center">
                      <Field
                        type="radio"
                        name="typePerson"
                        value={typePesron.Natural}
                        className="mr-2"
                      />
                      {typePesron.Natural}
                    </label>
                    <label className="block text-sm xl:text-lg mb-2 text-light flex items-center">
                      <Field
                        type="radio"
                        name="typePerson"
                        value={typePesron.Juridical}
                        className="mr-2"
                      />
                      <p>{typePesron.Juridical}</p>
                    </label>
                  </div>
                  <div className="mb-4">
                    <p className="block text-sm xl:text-lg font-bold mb-2 text-light flex items-center">
                      Tipo de cuenta
                    </p>
                    <label className="block text-sm xl:text-lg mb-2 text-light flex items-center">
                      <Field
                        type="radio"
                        name="account.type"
                        value="Ahorro"
                        className="mr-2"
                      />
                      Ahorro
                    </label>
                    <label className="block text-sm xl:text-lg mb-2 text-light flex items-center">
                      <Field
                        type="radio"
                        name="account.type"
                        value="Corriente"
                        className="mr-2"
                      />
                      Corriente
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className=" w-full md:w-[55%] bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                <p>Registrarse</p>
              </Button>
            </div>
            {loading && (
              <div className="relative w-full bg-gray-200 rounded mt-4">
                <div className="w-full absolute top-0 h-4 rounded shim-blue"></div>
              </div>
            )}
            {error ? (
              <div className="bg-red-400 border border-red-700 w-96 p-3 my-3 py-3 rounded-lg text-sm font-normal">
                <strong>Error: </strong> {messageError}
              </div>
            ) : null}
          </Form>
        </Formik>
      </div>
    </MainLayout>
  );
};
export default Registro;
