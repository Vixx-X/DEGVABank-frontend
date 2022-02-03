import Button from "@components/Button/Button";
import Footer from "@components/Footer";
import Header from "@components/Header/Advanced";
import InputImage from "@components/InputImage";
import { Formik, Form, Field, FormikHelpers } from "formik";
import type { NextPage } from "next";
import { useState } from "react";
import DEFAULT_USER_IMAGE from "@public/defaul_user.png";

//import * as Yup from "yup";

interface ProfileForm {
  userName: string;
  language: string;
  nationality: string;
  direction: string;
  email: string;
  tel: number;
}

const initialValue: ProfileForm = {
  userName: "Gabi Ustariz",
  language: "spanish",
  nationality: "vnlz",
  direction: "Venezuela, Baruta, Club Hipico",
  email: "Example@Company.com",
  tel: 4242765180,
};

const Profile: NextPage = () => {
  const [displayInputUserName, setdisplayInputUserName] = useState(false);
  const [displayInputDirection, setdisplayInputDirection] = useState(false);
  const [displayInputEmail, setdisplayInputEmail] = useState(false);
  const [displayInputTel, setdisplayInputTel] = useState(false);

  const handleChangeDirection = () => {
    setdisplayInputDirection(!displayInputDirection);
  };

  const handleChangeUserName = () => {
    setdisplayInputUserName(!displayInputUserName);
  };

  const handleChangeEmail = () => {
    setdisplayInputEmail(!displayInputEmail);
  };

  const handleChangeTel = () => {
    setdisplayInputTel(!displayInputTel);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header username={initialValue.userName} activate="user" />
        <div className="flex grow relative justify-between">
          <div className="w-[70rem] max-w-[90%] mx-auto my-20">
            <Formik
              initialValues={initialValue}
              onSubmit={(
                values: ProfileForm,
                { setSubmitting }: FormikHelpers<ProfileForm>
              ) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 500);
              }}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <div className="flex items-start mt-5 flex-col md:justify-between md:flex-row ">
                    <div className="w-full md:basis-1/2 rounded overflow-hidden md:shadow-lg p-8">
                      <p className="text-darkprimary font-bold text-lg uppercase my-2">Perfil</p>
                      <div className="flex justify-between">
                        <div className="w-[30%]">
                          <InputImage initialImage={DEFAULT_USER_IMAGE.src} />
                        </div>
                        
                        <div className="w-[60%] block">
                          {!displayInputUserName ? (
                            <p className="text-lg tracking-tight">
                              {values.userName}
                            </p>
                          ) : (
                            <Field
                              type="text"
                              label="Nombre de usuario"
                              name="userName"
                              id="username"
                              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Username"
                            />
                          )}
                          <p
                            className="cursor-pointer text-primary flex-wrap"
                            onClick={handleChangeUserName}
                          >
                            Cambiar Nombre
                          </p>
                        </div>
                      </div>
                      <p className="text-darkprimary font-bold text-lg uppercase mt-8 my-2">Opciones de Cuenta</p>
                      <div className="flex justify-between items-center m-3">
                        <label
                          className="block text-sm xl:text-lg mb-2 text-dark"
                          htmlFor="username"
                        >
                          Idioma
                        </label>
                        <Field
                          as="select"
                          label="Idioma"
                          name="language"
                          id="language"
                          className="shadow appearance-none border rounded w-[55%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Lenguaje"
                        >
                          <option value="spanish">Español</option>
                          <option value="english">Ingles</option>
                        </Field>
                      </div>
                      <div className="flex items-center justify-between m-3">
                        <label
                          className="block text-sm xl:text-lg mb-2 text-dark"
                          htmlFor="username"
                        >
                          Nacionalidad
                        </label>
                        <Field
                          as="select"
                          label="Nacionalidad"
                          name="nationality"
                          id="nationality"
                          className="shadow appearance-none border rounded w-[55%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Nacionalidad"
                        >
                          <option value="vnzl">Venezuela</option>
                          <option value="clmb">Colombia</option>
                          <option value="ecdr">Ecuador</option>
                        </Field>
                      </div>
                    </div>
                    <div className="w-full md:basis-[45%] rounded overflow-hidden md:shadow-lg p-8">
                      <div className="flex justify-between items-center px-2">
                        <p className="text-darkprimary font-bold text-lg uppercase">Dirección</p>
                        <p
                          className="cursor-pointer text-primary"
                          onClick={handleChangeDirection}
                        >
                          Cambiar Direccion
                        </p>
                      </div>
                      <div className="flex justify-between items-center m-3">
                        {!displayInputDirection ? (
                          <label
                            className="block text-sm xl:text-lg mb-2 text-dark"
                            htmlFor="username"
                          >
                            {values.direction}
                          </label>
                        ) : (
                          <Field
                            as="textarea"
                            label="Idioma"
                            name="direction"
                            id="direction"
                            className="shadow appearance-none border rounded w-[100%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Direccion"
                          />
                        )}
                      </div>
                      <div className="flex justify-between items-center px-2">
                        <p className="text-darkprimary font-bold text-lg uppercase mt-4">Correo electrónico</p>
                        <p
                          className="cursor-pointer text-primary"
                          onClick={handleChangeEmail}
                        >
                          Cambiar Correo
                        </p>
                      </div>
                      <div className="flex justify-between items-center m-3">
                        {!displayInputEmail ? (
                          <label
                            className="block text-sm xl:text-lg mb-2 text-dark"
                            htmlFor="username"
                          >
                            {values.email}
                          </label>
                        ) : (
                          <Field
                            type="text"
                            label="Email"
                            name="email"
                            id="email"
                            className="shadow appearance-none border rounded w-[100%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Correo Electronico"
                          />
                        )}
                      </div>

                      <div className="flex justify-between items-center px-2">
                        <p className="text-darkprimary font-bold text-lg uppercase mt-4">Teléfono</p>
                        <p
                          className="cursor-pointer text-primary"
                          onClick={handleChangeTel}
                        >
                          Cambiar Telefono
                        </p>
                      </div>
                      <div className="flex justify-between items-center m-3">
                        {!displayInputTel ? (
                          <label
                            className="block text-sm xl:text-lg mb-2 text-dark"
                            htmlFor="username"
                          >
                            {values.tel}
                          </label>
                        ) : (
                          <Field
                            type="tel"
                            label="Telefono"
                            name="tel"
                            id="tel"
                            className="shadow appearance-none border rounded w-[100%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Telefono"
                          />
                        )}
                      </div>
                      <Button type="submit">
                        <p>Guardar</p>
                      </Button>
                    </div>
                  </div>
                  {isSubmitting && (
                    <div className="relative w-full bg-gray-200 rounded mt-4">
                      <div className="w-full absolute top-0 h-4 rounded shim-blue"></div>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profile;