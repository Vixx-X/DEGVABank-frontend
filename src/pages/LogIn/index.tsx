import type { NextPage } from "next";
import Button from "@components/Button/Button";
import Header from "@components/Header/Basic";
import Footer from "@components/Footer";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "next/link";

interface SigninForm {
  password: string;
  userName: string;
}

const SigninSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const LogIn: NextPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="bg-[url('../public/backgroundPage2.png')] bg-cover bg-center grow relative">
          <div className="absolute grow bg-black/60 w-full h-full">
            <div className="max-w-[90%] grid place-items-center mx-auto w-full h-full">
              <div className="rounded mb-4 w-full max-w-[22rem]">
                <Formik
                  initialValues={{
                    password: "",
                    userName: "",
                  }}
                  //validationSchema={SigninSchema}
                  onSubmit={(
                    values: SigninForm,
                    { setSubmitting }: FormikHelpers<SigninForm>
                  ) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 500);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="divide-y">
                        <div>
                          <p className="font-light text-3xl xl:text-4xl mb-3 text-light">
                            Login
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
                              name="userName"
                              id="username"
                              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                            <Field
                              type="password"
                              label="Contraseña"
                              id="password"
                              name="password"
                              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Password"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Button
                          type="submit"
                          className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
                        >
                          <p>Iniciar Sesion</p>
                        </Button>
                      </div>
                      {isSubmitting && (
                        <div className="relative w-full bg-gray-200 rounded mt-4">
                          <div className="w-full absolute top-0 h-4 rounded shim-blue"></div>
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>

                <Link href="/">
                  <a className="inline-block w-full align-baseline font-bold text-sm xl:text-lg  mt-4 text-light hover:text-primary text-right">
                    ¿Olvido su contraseña?
                  </a>
                </Link>
                <Link href="/Register">
                  <a className="inline-block w-full align-baseline font-bold text-sm xl:text-lg text-light hover:text-primary text-right">
                    ¿No tiene aun una cuenta?
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LogIn;
