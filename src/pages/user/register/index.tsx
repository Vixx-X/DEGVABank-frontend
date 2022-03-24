import ErrorMessage from "@components/Globals/Alerts/ErrorMessage";
import Button from "@components/Globals/Button/Button";
import MainLayout from "@components/Globals/Layout/MainLayout/Advanced";
import { SERVER_URLS } from "@config";
import { postRegisterUser } from "@fetches/users";
import { Formik, Form, Field } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const { URL_LOGIN } = SERVER_URLS;

//import * as Yup from "yup";

enum PersonType {
  NATURAL = "NATURAL",
  JURIDIC = "JURIDIC",
}

enum AccountType {
  CHECKING = "CHECKING",
  SAVING = "SAVING",
}

interface SignupForm {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password1: string;
  password2: string;
  tel: "";
  type: PersonType;
  account_type: AccountType;
  number: number;
  typeOfDocumentID: string;
}

const initialValue: SignupForm = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password1: "",
  password2: "",
  tel: "",
  type: PersonType.NATURAL,
  account_type: AccountType.CHECKING,
  number: 0,
  typeOfDocumentID: "v",
};

const Registro: NextPage = () => {
  const router = useRouter();
  const [messageError, setMessageError] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: SignupForm) => {
    setLoading(true);
    const userData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      username: data.username,
      password1: data.password1,
      password2: data.password2,
      tel: data.tel,
      type: data.type,
      account_type: data.account_type,
      document_id: data.typeOfDocumentID + data.number,
    };
    try {
      await postRegisterUser(userData);
      router.push(URL_LOGIN);
    } catch (e) {
      // messageError = e;
      setMessageError(e);
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
                    name="first_name"
                    id="name"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Nombre"
                  />
                  <ErrorMessage name="first_name" error={messageError} />
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
                    name="last_name"
                    id="lastname"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Apellido"
                  />
                  <ErrorMessage name="last_name" error={messageError} />
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
                    name="username"
                    id="username"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Username"
                  />
                  <ErrorMessage name="username" error={messageError} />
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
                  <ErrorMessage name="email" error={messageError} />
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
                    name="password1"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password1" error={messageError} />
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
                    name="password2"
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Confirmar contraseña"
                  />
                  <ErrorMessage name="password2" error={messageError} />
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
                  <ErrorMessage name="tel" error={messageError} />
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <div className="mb-4">
                    <label
                      className="block text-sm xl:text-lg font-bold mb-2 text-light"
                      htmlFor="type"
                    >
                      Tipo de identificación
                    </label>
                    <Field
                      as="select"
                      id="typeOfDocumentID"
                      className="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      name="typeOfDocumentID"
                    >
                      <option disabled>--Seleccionar--</option>
                      <option value="V">V-</option>
                      <option value="E">E-</option>
                      <option value="J">J-</option>
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm xl:text-lg font-bold mb-2 text-light"
                      htmlFor="idNumber"
                    >
                      Número de identificación
                    </label>
                    <Field
                      className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="idNumber"
                      type="number"
                      name="number"
                      placeholder="Ej: 5555555"
                    />
                    <ErrorMessage name="number" error={messageError} />
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
                        name="type"
                        value={PersonType.NATURAL}
                        className="mr-2"
                      />
                      {PersonType.NATURAL}
                    </label>
                    <label className="block text-sm xl:text-lg mb-2 text-light flex items-center">
                      <Field
                        type="radio"
                        name="type"
                        value={PersonType.JURIDIC}
                        className="mr-2"
                      />
                      <p>{PersonType.JURIDIC}</p>
                    </label>
                  </div>
                  <div className="mb-4">
                    <p className="block text-sm xl:text-lg font-bold mb-2 text-light flex items-center">
                      Tipo de cuenta
                    </p>
                    <label className="block text-sm xl:text-lg mb-2 text-light flex items-center">
                      <Field
                        type="radio"
                        name="account_type"
                        value={AccountType.SAVING}
                        className="mr-2"
                      />
                      Ahorro
                    </label>
                    <label className="block text-sm xl:text-lg mb-2 text-light flex items-center">
                      <Field
                        type="radio"
                        name="account_type"
                        value={AccountType.CHECKING}
                        className="mr-2"
                      />
                      Corriente
                    </label>
                  </div>
                </div>
                <div></div>
                <ErrorMessage name="non_field_errors" error={messageError} />
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
          </Form>
        </Formik>
      </div>
    </MainLayout>
  );
};
export default Registro;
