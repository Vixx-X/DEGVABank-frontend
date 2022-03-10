import Button from "@components/Globals/Button/Button";
import ErrorMessage from "@components/Globals/ErrorMessage";
import MainLayout from "@components/Globals/Layout/MainLayout/Advanced";
import { SERVER_URLS } from "@config";
import { AuthContext } from "@contexts/AuthContext";
import { filterOpenRedirect } from "@utils/filterOpenRedirect";
import { Formik, Form, Field } from "formik";
import type { NextPage } from "next";
//import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const { URL_HOME, URL_REGISTER, URL_PASSWORD_RESET } = SERVER_URLS;

interface SigninForm {
  password: string;
  username: string;
}

const LogIn: NextPage = () => {
  const { getToken } = useContext(AuthContext);
  const router = useRouter();
  const [messageError, setMessageError] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ password, username }: SigninForm) => {
    setLoading(true);
    try {
      // actual get token (it return the response in case of error)
      await getToken(username, password);
      const next = router.query?.next as string;
      router.push(next ? filterOpenRedirect(next) : URL_HOME);
    } catch (error) {
      console.log(error);
      setMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="rounded mb-4 w-[90%] max-w-[22rem] my-10 mb-14">
        <Formik
          initialValues={{
            password: "",
            username: "",
          }}
          onSubmit={(values: SigninForm) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <div className="divide-y">
              <div>
                <p className="font-light text-3xl xl:text-4xl mb-3 text-light">
                  Inicio de Sesión
                </p>
              </div>
              <div className="pt-4">
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
                </div>
                <ErrorMessage name="username" error={messageError} />
                <div className="mb-6">
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
                <ErrorMessage name="password" error={messageError} />
              </div>
            </div>
            {/* {messageError && messageError.info && messageError.info.detail && (
              <div className="bg-red-400 border border-red-700 w-full p-3 my-3 py-2 rounded-lg text-sm font-normal">
                <strong>Error: </strong>
                {messageError.info.detail && (
                  <p>{`User Name: ${messageError.info.detail}`}</p>
                )}
                {messageError.info.detail.username && (
                  <p>{`User Name: ${messageError.info.detail.username[0]}`}</p>
                )}
                {messageError.info.detail.password && (
                  <p>{`Password: ${messageError.info.detail.password[0]}`}</p>
                )}
              </div>
            )} */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
              >
                <p>Iniciar Sesion</p>
              </Button>
            </div>
            {loading && (
              <div className="relative w-full bg-gray-200 rounded mt-4">
                <div className="w-full absolute top-0 h-4 rounded shim-blue"></div>
              </div>
            )}
          </Form>
        </Formik>

        <Link href={URL_PASSWORD_RESET}>
          <a className="inline-block w-full align-baseline font-bold text-sm xl:text-lg  mt-4 text-light hover:text-primary text-right">
            ¿Olvido su contraseña?
          </a>
        </Link>
        <Link href={URL_REGISTER}>
          <a className="inline-block w-full align-baseline font-bold text-sm xl:text-lg text-light hover:text-primary text-right">
            ¿No tiene aun una cuenta?
          </a>
        </Link>
      </div>
    </MainLayout>
  );
};

export default LogIn;
