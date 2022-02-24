import Button from "@components/Globals/Button/Button";
import ErrorMessage from "@components/Globals/ErrorMessage";
import Logotype from "@components/Globals/Logotype";
import { AuthContext } from "@contexts/AuthContext";
import { Formik, Form, Field } from "formik";
// import { useRouter } from "next/router";
import { useContext, useState } from "react";

interface SigninForm {
  password: string;
  username: string;
}

interface LoginProp {
  setComponent: any;
}

const Login = ({ setComponent }: LoginProp) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { getToken } = useContext(AuthContext);
  const [messageError, setMessageError] = useState<any>();
  //   const router = useRouter();

  const handleSubmit = async ({ password, username }: SigninForm) => {
    setLoading(true);
    try {
      await getToken(username, password);
      //   const next = router.query?.next as string;
      setComponent(2);
      //   router.push(next ? filterOpenRedirect(next) : URL_HOME);
    } catch (error) {
      setMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  const initialValue: SigninForm = {
    password: "",
    username: "",
  };

  return (
    <>
      <div className="rounded-2xl h-fit md:mx-10 overflow-hidden shadow-lg p-4 md:p-8 w-full">
        <Logotype classnameBox="flex justify-center h-16" />
        <Formik
          initialValues={initialValue}
          onSubmit={(values: SigninForm) => {
            handleSubmit(values);
          }}
        >
          <Form className="w-full p-4">
            <div className="divide-y">
              <div>
                <p className="font-light text-lg xl:text-xl mb-3 text-dark">
                  Inicio de Sesión
                </p>
              </div>
              <div className="pt">
                <div className="mb-4">
                  <label
                    className="block text-sm xl:text-md pt-5 mb-2 text-dark"
                    htmlFor="username"
                  >
                    Nombre de usuario
                  </label>
                  <Field
                    type="text"
                    label="Nombre de usuario"
                    name="username"
                    id="username"
                    className="appearance-none rounded w-full py-3 
                    border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="username"
                  />
                </div>
                <ErrorMessage name="username" error={messageError} />
                <div className="mb-6">
                  <label
                    className="block text-sm xl:text-md pt-2 mb-2 text-dark"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <Field
                    type="password"
                    label="Contraseña"
                    id="password"
                    name="password"
                    className="appearance-none rounded w-full py-3 
                    border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Password"
                  />
                </div>
                <ErrorMessage name="password" error={messageError} />
              </div>
            </div>
            {loading && (
              <div className="relative w-full bg-gray-200 rounded mt-4">
                <div className="w-full absolute top-0 h-4 rounded shim-blue"></div>
              </div>
            )}
            <div className="flex justify-center pt-10">
              <Button
                type="submit"
                className="bg-primary hover:bg-blue-700 text-white font-semibold py-2  rounded-full w-full max-w-[22rem]"
              >
                <p>Iniciar Sesión</p>
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
