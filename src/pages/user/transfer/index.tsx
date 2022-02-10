import Button from "@components/Globals/Button/Button";
// import ErrorMessage from "@components/Globals/ErrorMessage";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import { Field, Form, Formik } from "formik";
//import Button from "@components/Button/Button";
import type { NextPage } from "next";
import { useState } from "react";

enum PersonType {
  NATURAL = "NATURAL",
  JURIDIC = "JURIDIC",
}

enum AccountType {
  CHECKING = "CHECKING",
  SAVING = "SAVING",
}

interface SignupForm {
  name: string;
  lastname: string;
  email: string;
  account_number: string;
  number: number;
  typeOfDocumentID: string;
  reason: string;
  alias?: string;
}

const initialValue: SignupForm = {
  name: "",
  lastname: "",
  email: "",
  account_number: "",
  number: 0,
  typeOfDocumentID: "",
  reason: "",
  alias: "",
};

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  return (
    <MainLayout>
      <Formik
        initialValues={initialValue}
        //validationSchema={SignupSchema}
        onSubmit={(values: SignupForm) => {
          //handleSubmit(values);
        }}
      >
        <Form>
          <div className="divide-y">
            <div>
              <p className="font-light text-3xl xl:text-4xl mb-3 text-dark">
                Datos de la transferencia
              </p>
            </div>
            <div className="py-4 grid sm:grid-cols-2 gap-x-8 justify-center">
              <div className="mb-4">
                <label
                  className="block text-sm xl:text-lg font-bold mb-2 text-dark"
                  htmlFor="name"
                >
                  Número de cuenta
                </label>
                <Field
                  type="text"
                  label="Número de cuenta"
                  name="account_number"
                  id="account_number"
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Número de cuenta"
                />
                {/* <ErrorMessage name="name" error={messageError} /> */}
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm xl:text-lg font-bold mb-2 text-dark"
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
                {/* <ErrorMessage name="name" error={messageError} /> */}
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm xl:text-lg font-bold mb-2 text-dark"
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
                {/* <ErrorMessage name="lastname" error={messageError} /> */}
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm xl:text-lg font-bold mb-2 text-dark"
                  htmlFor="idNumber"
                >
                  Número de identificación
                </label>
                <div className="flex justify-between">
                  <Field
                    as="select"
                    id="typeOfDocumentID"
                    className="form-select appearance-none block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none basis-1/5"
                    name="typeOfDocumentID"
                  >
                    <option disabled>--Seleccionar--</option>
                    <option value="V">V-</option>
                    <option value="E">E-</option>
                    <option value="J">J-</option>
                  </Field>
                  <Field
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline basis-3/4"
                    id="idNumber"
                    type="number"
                    name="number"
                    placeholder="Ej: 5555555"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm xl:text-lg font-bold mb-2 text-dark"
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
                {/* <ErrorMessage name="email" error={messageError} /> */}
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm xl:text-lg font-bold mb-2 text-dark"
                  htmlFor="email"
                >
                  Motivo
                </label>
                <Field
                  type="text"
                  label="Motivo"
                  name="reason"
                  id="reason"
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Motivo"
                />
                {/* <ErrorMessage name="email" error={messageError} /> */}
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-x-6">
            <Button
              type="submit"
              className=" w-full md:w-60 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              <p>Cancelar</p>
            </Button>
            <Button
              type="submit"
              className=" w-full md:w-60 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              <p>Aceptar</p>
            </Button>
          </div>
          {loading && (
            <div className="relative w-full bg-gray-200 rounded mt-4">
              <div className="w-full absolute top-0 h-4 rounded shim-blue"></div>
            </div>
          )}
        </Form>
      </Formik>
    </MainLayout>
  );
};

export default Home;
