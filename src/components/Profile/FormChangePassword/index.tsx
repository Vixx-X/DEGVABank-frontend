import Button from "@components/Globals/Button/Button";
import { Formik, Form, Field } from "formik";
import { useState } from "react";

interface FormChangePasswordProps {
  isOpenModal: (bol: boolean) => void;
}

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
}

const FormChangePassword = ({ isOpenModal }: FormChangePasswordProps) => {
  const initialValue = {
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
    otp: "",
  };

  const [mode, setMode] = useState(1); //mode 1 = confirmar contraseñas y enviar correo
  //mode 2 = confirmar codigo OTP

  const handleSubmit = (e: any) => {
    if (mode === 1) {
      setMode(2);
    } else {
      console.log(e);
      isOpenModal(false);
    }
  };

  const backToModeOne = () => {
    setMode(1);
  };

  return (
    <div className="w-full p-4">
      <Formik
        initialValues={initialValue}
        onSubmit={(values: ChangePasswordForm) => {
          handleSubmit(values);
        }}
      >
        <Form>
          <div>
            {mode === 1 && (
              <>
                <p className="text-darkprimary font-bold text-lg uppercase my-4">
                  Cambiar Contraseña
                </p>
                <label
                  className="block text-sm xl:text-lg mb-2 text-dark "
                  htmlFor="oldPassword"
                >
                  Contraseña Antigua
                </label>
                <Field
                  type="text"
                  label="oldPassword"
                  name="oldPassword"
                  id="oldPassword"
                  className="my-3 shadow appearance-none border rounded w-[100%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Contraseña Antigua"
                />
                <label
                  className="block text-sm xl:text-lg mb-2 text-dark"
                  htmlFor="newPassword"
                >
                  Contraseña Nueva
                </label>
                <Field
                  type="text"
                  label="newPassword"
                  name="newPassword"
                  id="newPassword"
                  className="my-3 shadow appearance-none border rounded w-[100%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Contraseña Nueva"
                />
                <label
                  className="block text-sm xl:text-lg mb-2 text-dark"
                  htmlFor="newPassword2"
                >
                  Confirmar Contraseña Nueva
                </label>
                <Field
                  type="text"
                  label="newPassword2"
                  name="newPassword2"
                  id="newPassword2"
                  className="my-3 shadow appearance-none border rounded w-[100%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Confirmar Contraseña Nueva"
                />
              </>
            )}
            {mode === 2 && (
              <div>
                <p className="text-darkprimary font-bold text-lg uppercase my-4">
                  Revisa Tu Correo
                </p>
                <p>Te hemos enviado un codigo de confirmacion a tu correo</p>
                <label
                  className="block text-sm xl:text-lg mb-2 text-dark "
                  htmlFor="otp"
                ></label>
                <Field
                  type="text"
                  label="otp"
                  name="otp"
                  id="otp"
                  className="my-3 shadow appearance-none border rounded w-[100%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Codigo de Confirmacion"
                />
              </div>
            )}
            <div className="flex gap-x-4">
              {mode === 2 && <Button onClick={backToModeOne}>Volver</Button>}
              <Button>{mode == 1 ? "Continuar" : "Confirmar"}</Button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FormChangePassword;
