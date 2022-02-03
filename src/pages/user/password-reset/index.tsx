import Button from "@components/Button/Button";
import MainLayout from "@components/Layout";
import { SERVER_URLS } from "@config";
import { Formik, Form, Field } from "formik";
import type { NextPage } from "next";
import { useState } from "react";

const { URL_PASSWORD_RESET } = SERVER_URLS;

interface PasswordResetForm {
  email: string;
}

const PasswordReset: NextPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ email }: PasswordResetForm) => {
    setLoading(true);
    try {
      const data = await fetch(URL_PASSWORD_RESET, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        credentials: "include", // include, *same-origin, omit, include
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const dataJson = await data.json();
      if (data.ok) {
        setSuccess(true);
      } else {
        setMessageError(dataJson);
        setError(true);
      }
    } catch (error) {
      setError(true);
      setMessageError("Hay un error con la página");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="rounded mb-4 w-[90%] max-w-[22rem] my-10 mb-14">
        {success ? (
          <div className="divide-y">
            <div>
              <p className="font-light text-3xl mb-3 text-light">
                Olvido de contraseña
              </p>
            </div>
            <p className="text-light mb-4">
              Revisa tu correo, te enviamos un link para poder cambiar tu
              contraseña.
            </p>
          </div>
        ) : (
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={(values: PasswordResetForm) => {
              handleSubmit(values);
            }}
          >
            <Form>
              <div className="divide-y">
                <div>
                  <p className="font-light text-3xl mb-3 text-light">
                    Olvido de contraseña
                  </p>
                </div>
                <div className="pt-4">
                  <div className="mb-4">
                    <label
                      className="block text-sm xl:text-lg font-bold mb-2 text-light"
                      htmlFor="email"
                    >
                      Correo electrónico
                    </label>
                    <Field
                      type="email"
                      label="Correo electrónico"
                      name="email"
                      id="email"
                      className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Email"
                    />
                  </div>
                  <p className="text-light mb-4">
                    Por favor ingresar su correo electronico. Recibirás via
                    correo un link para crear una nueva contraseña
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
                >
                  <p>Enviar</p>
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
        )}
      </div>
    </MainLayout>
  );
};

export default PasswordReset;
