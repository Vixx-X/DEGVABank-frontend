import Button from "@components/Globals/Button/Button";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import Loading from "@components/Globals/Loading";
import Modal from "@components/Globals/Modal";
import FormChangeEmail from "@components/Profile/FormChangeEmail";
import FormChangePassword from "@components/Profile/FormChangePassword";
import InputImage from "@components/Profile/InputImage";
import { UserContext } from "@contexts/UserContext";
import { GenerateOTP } from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import DEFAULT_USER_IMAGE from "@public/defaul_user.png";
import { Formik, Form, Field, FormikHelpers } from "formik";
import type { NextPage } from "next";
import { useState, useContext, useEffect } from "react";
import { User } from "user";

const Profile: NextPage = () => {
  const { user, isLoading } = useContext(UserContext);
  const [displayInputUserName, setdisplayInputUserName] = useState(false);
  const [displayInputEmail, setdisplayInputEmail] = useState(false);
  const [displayChangePassword, setDisplayChangePassword] = useState(false);
  const [userFormState, setUserFormState] = useState({
    username: user?.username,
    email: user?.email,
  });
  const [responseOTP, setResponseOTP] = useState({} as any);
  const [messageError, setMessageError] = useState<any>();

  const generateOTP = useFetchCallback(GenerateOTP);

  useEffect(() => {
    if (!isLoading) {
      setUserFormState({
        username: user.username,
        email: user.email,
      });
    }
  }, [isLoading, user]);

  const handleFormChange = (e: any, name: any) => {
    setUserFormState({
      ...userFormState,
      [name]: e.target.value,
    });
  };

  const handleChangeUserName = () => {
    setdisplayInputUserName(!displayInputUserName);
  };

  const handleChangeEmail = async () => {
    try {
      const response = await generateOTP({
        email: userFormState.email,
      });
      console.log(response);
      setResponseOTP(response);
      setdisplayInputEmail(true);
    } catch (e: any) {
      setMessageError(e);
    }
  };

  const handleChangePassword = () => {
    setDisplayChangePassword(true);
  };

  return (
    <MainLayout activate="user">
      {isLoading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={user}
          onSubmit={(values: User, { setSubmitting }: FormikHelpers<User>) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 500);
          }}
        >
          {({ isSubmitting, values, handleChange }) => (
            <Form>
              <div className="flex items-start mt-5 flex-col md:justify-between md:flex-row ">
                <div className="w-full md:basis-1/2 rounded overflow-hidden md:shadow-lg p-8">
                  <p className="text-darkprimary font-bold text-lg uppercase my-2">
                    Perfil
                  </p>
                  <div className="flex justify-between">
                    <div className="w-[30%]">
                      <InputImage initialImage={DEFAULT_USER_IMAGE.src} />
                    </div>

                    <div className="w-[60%] block">
                      {!displayInputUserName ? (
                        <p className="text-lg tracking-tight">
                          {values.first_name + " " + values.last_name}
                        </p>
                      ) : (
                        <Field
                          type="text"
                          label="Nombre de usuario"
                          name="userName"
                          id="username"
                          className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Username"
                          onChange={(e: any) => {
                            handleChange(e);
                            handleFormChange(e, "username");
                          }}
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
                  <p className="text-darkprimary font-bold text-lg uppercase mt-8 my-2">
                    Opciones de Cuenta
                  </p>
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
                      {/* <option value="english">Ingles</option> */}
                    </Field>
                  </div>
                  {/* <div className="flex items-center justify-between m-3">
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
                  </div> */}
                </div>
                <div className="w-full md:basis-[45%]">
                  <div className="w-full rounded overflow-hidden md:shadow-lg p-8">
                    <div className="flex justify-between items-center px-2">
                      <p className="text-darkprimary font-bold text-lg uppercase mt-4">
                        Correo electrónico
                      </p>
                      {/* <p
                        className="cursor-pointer text-primary"
                        onClick={handleChangeEmail}
                      >
                        Cambiar Correo
                      </p> */}
                    </div>
                    <div className="flex flex-col gap-3 items-start m-3">
                      {/* {!displayInputEmail ? (
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
                        
                      )} */}
                      <Field
                        type="text"
                        label="Email"
                        name="email"
                        id="email"
                        className="shadow appearance-none border rounded w-[100%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Correo Electronico"
                        onChange={(e: any) => {
                          handleChange(e);
                          handleFormChange(e, "email");
                        }}
                      />
                      <Button type="button" onClick={handleChangeEmail}>
                        <p>Guardar</p>
                      </Button>
                    </div>
                  </div>
                  <div className="w-full rounded overflow-hidden md:shadow-lg p-8">
                    <p className="text-darkprimary font-bold text-lg uppercase my-4">
                      Solicitar Cambio de contraseña
                    </p>
                    {/* <p className="my-2">
                      Usted recibira un correo electronico para validar el cambio de contraseña
                    </p> */}
                    <Button type="button" onClick={handleChangePassword}>
                      Cambiar Contraseña
                    </Button>
                  </div>
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
      )}

      <Modal
        isOpen={displayChangePassword}
        setIsOpen={setDisplayChangePassword}
        widthModal="max-w-2xl"
      >
        <FormChangePassword
          isOpenModal={setDisplayChangePassword}
        ></FormChangePassword>
      </Modal>
      <Modal isOpen={displayInputEmail} setIsOpen={setdisplayInputEmail}>
        {responseOTP && responseOTP?.device && responseOTP?.expire && ( 
          <>
            <FormChangeEmail
              isOpenModal={setdisplayInputEmail}
              newEmail={userFormState.email}
              response={responseOTP}
            />
          </>
        )}
      </Modal>
    </MainLayout>
  );
};

export default Profile;
