import Button from "@components/Button/Button";
import Footer from "@components/Footer";
import Header from "@components/Header/Basic";
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

interface SignupForm {
  password: string;
  passwordConfirm: string;
  userName: string;
  email: string;
  tel: number;
  typePerson: typePesron;
}

const initialValue: SignupForm = {
  password: "",
  passwordConfirm: "",
  userName: "",
  email: "",
  tel: 0,
  typePerson: typePesron.Natural,
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
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="bg-[url('../public/backgroundPage2.png')] bg-cover bg-center grow relative">
          <div className="absolute grow bg-black/60 w-full h-full"></div>
          <div className="z-1 absolute grid place-items-center mx-auto w-full h-full">
            {/* <form className="max-w-[90%] rounded mb-4 divide-y w-full sm:max-w-[40rem]"> */}
            <div className="rounded mb-4 w-full max-w-[40rem] ">
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
                      <div>
                        <p className="block text-sm xl:text-lg font-bold mb-2 text-light flex items-center">
                          Tipo se usuario
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
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Registro;
