import Button from "@components/Globals/Button/Button";
import ErrorMessage from "@components/Globals/ErrorMessage";
import MainLayout from "@components/Globals/Layout/MainLayout/Advanced";
import SuccessMessage from "@components/Globals/SuccessMessage";
import { API_URLS, SERVER_URLS } from "@config";
import { postResetPassWord } from "@fetches/users";
import { makeUrl } from "@utils/makeUrl";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { useState } from "react";

const { URL_PASSWORD_RESET_CONFIRM } = API_URLS;
const { URL_PASSWORD_RESET, URL_LOGIN } = SERVER_URLS;

interface PasswordResetConfirmFormData {
  new_password1: string;
  new_password2: string;
}
interface PasswordResetConfirmProps {
  uidb64: string;
  token: string;
  invalid_link: string;
}

const PasswordResetConfirm = ({
  uidb64,
  token,
  invalid_link,
}: PasswordResetConfirmProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState<any>("");

  const handleSubmit = async (data: PasswordResetConfirmFormData) => {
    setLoading(true);
    try {
      await postResetPassWord(data, uidb64, token);
      setSuccess(true);
    } catch (e) {
      setMessageError(e);
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
                Resetear contraseña
              </p>
            </div>
            <SuccessMessage>
              <>
                <span className="font-medium">
                  Cotraseña cambiada exitosamente!
                </span>{" "}
                Su contraseña ha sido modificada de manera exitosa, vuelva a
                ingresar sesión{" "}
                <Link href={URL_LOGIN}>
                  <a className="hover:underline">aquí</a>
                </Link>
              </>
            </SuccessMessage>
          </div>
        ) : invalid_link ? (
          <div className="divide-y">
            <div>
              <p className="font-light text-3xl mb-3 text-light">
                Resetear contraseña
              </p>
            </div>
            <p className="text-light mb-4">
              El link ha expirado o es invalido, vuelve a mandar el correo{" "}
              <Link href={URL_PASSWORD_RESET}>
                <a className="hover:underline">aquí</a>
              </Link>
              .
            </p>
          </div>
        ) : (
          <Formik
            initialValues={{
              new_password1: "",
              new_password2: "",
            }}
            onSubmit={(values: PasswordResetConfirmFormData) => {
              handleSubmit(values);
            }}
          >
            <Form>
              <div className="divide-y">
                <div>
                  <p className="font-light text-3xl mb-3 text-light">
                    Resetear contraseña
                  </p>
                </div>
                <div className="pt-4">
                  <div className="mb-4">
                    <label
                      className="block text-sm xl:text-lg font-bold mb-2 text-light"
                      htmlFor="new_password1"
                    >
                      Contraseña Nueva
                    </label>
                    <Field
                      type="text"
                      label="new_password1"
                      name="new_password1"
                      id="new_password1"
                      className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Contraseña Nueva"
                    />
                    <ErrorMessage name="new_password1" error={messageError} />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-sm xl:text-lg font-bold mb-2 text-light"
                      htmlFor="new_password2"
                    >
                      Confirmar Contraseña Nueva
                    </label>
                    <Field
                      type="text"
                      label="new_password2"
                      name="new_password2"
                      id="new_password2"
                      className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Confirmar Contraseña Nueva"
                    />
                    <ErrorMessage name="new_password2" error={messageError} />
                  </div>
                </div>
              </div>
              <ErrorMessage name="non_field_errors" error={messageError} />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
                  onClick={handleSubmit}
                >
                  <p>Cambiar contraseña</p>
                </Button>
              </div>
              {loading && (
                <div className="relative w-full bg-gray-200 rounded mt-4">
                  <div className="w-full absolute top-0 h-4 rounded shim-blue"></div>
                </div>
              )}
            </Form>
          </Formik>
        )}
      </div>
    </MainLayout>
  );
};

export default PasswordResetConfirm;

export async function getServerSideProps({ params }: any) {
  try {
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const resp = await fetch(
      makeUrl(URL_PASSWORD_RESET_CONFIRM, params),
      option
    );
    const data = await resp.json();
    return {
      props: {
        invalid_link: data?.invalid_link,
        ...params,
      },
    };
  } catch (error) {
    console.log(error);
    return {};
  }
}

{
  /* <Layout
title="Resetear Contraseña"
description="Resetea tu contraseña con una nueva"
>
{loading ? (
  <Loader />
) : invalid_link ? (
  <section className="my-12 ">
    <div className="container mx-auto animate__animated animate__fadeIn animate__delay-3s">
      <HeaderTitle title="Resetear Contraseña" />
      <div className="flex flex-col items-center justify-center mb-20">
        <p>
          El link ha expirado o es invalido, vuelve a mandar el correo{' '}
          <Link href={URL_PASSWORD_RESET}>
            <a className="hover:underline">aquí</a>
          </Link>
          .
        </p>
      </div>
    </div>
  </section>
) : success ? (
  <section className="my-12 ">
    <div className="container mx-auto animate__animated animate__fadeIn animate__delay-3s">
      <HeaderTitle title="Resetear Contraseña" />
      <div className="flex flex-col items-center justify-center mb-20">
        <p>{successMessage}</p>
      </div>
    </div>
  </section>
) : (
  <section className="my-12 ">
    <div className="container mx-auto animate__animated animate__fadeIn animate__delay-3s">
      <HeaderTitle title="Resetear Contraseña" />

      <form method="POST" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col items-center justify-center mb-20">
          <PasswordField
            placeholder="Contraseña nueva"
            name="new_password1"
            onChange={handleChange}
            value={form.new_password1}
          />
          <PasswordField
            placeholder="Confirmar contraseña nueva"
            name="new_password2"
            onChange={handleChange}
            value={form.new_password2}
          />

          <Button type="submit">Enviar</Button>

          {error ? (
            <div className="bg-red-400 border  border-red-700 w-96 p-3 my-3 py-3 rounded-lg text-sm font-normal">
              <strong>Error: </strong> {messageError}
            </div>
          ) : null}
        </div>
      </form>
    </div>
  </section>
)}
</Layout>
 */
}
