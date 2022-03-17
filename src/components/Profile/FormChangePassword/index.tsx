import Button from "@components/Globals/Button/Button";
import ErrorMessage from "@components/Globals/ErrorMessage";
import ShowCounter from "@components/PayGateWay/CountDownTimer/index";
import { UserContext } from "@contexts/UserContext";
import { GenerateOTP, ChangePassword } from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { useContext } from "react";

interface FormChangePasswordProps {
  isOpenModal: (bol: boolean) => void;
}

interface ChangePasswordForm {
  old_password: string;
  new_password1: string;
  new_password2: string;
}

const FormChangePassword = ({ isOpenModal }: FormChangePasswordProps) => {
  const { user } = useContext(UserContext);

  const generateOTP = useFetchCallback(GenerateOTP);
  const changePassword = useFetchCallback(ChangePassword);

  const classNameButtonDisable = ""; 

  const initialValue = {
    old_password: "",
    new_password1: "",
    new_password2: "",
    token: "",
  };

  const passwordForm = {
    old_password: "",
    new_password1: "",
    new_password2: "",
  } as any;

  const handleFormChange = (e: any, name: any) => {
    passwordForm[name] = e.target.value;
  };

  const isDisabled = () => {
    if (
      passwordForm.old_password !== "" &&
      passwordForm.new_password1 !== "" &&
      passwordForm.new_password2 !== ""
    ){
      return false;
    }
      
    return true;
  };

  const [mode, setMode] = useState(1); //mode 1 = confirmar contraseñas y enviar correo
  //mode 2 = confirmar codigo OTP
  const [responseOTP, setResponseOTP] = useState({} as any);
  const [messageError, setMessageError] = useState<any>();
  const handleSubmit = async (e: any) => {
    if (mode === 1) {
      const data = {
        email: user.email,
      };
      const response = await generateOTP(data);
      setResponseOTP(response);
      console.log("Respuesta del Back modo", response);
      setMode(2);
    } else {
      try {
        const data = {
          ...e,
          device: responseOTP.device,
        };
        const response = await changePassword(data);
        console.log(response);
        isOpenModal(false);
      } catch (e: any) {
        console.log(e);
        setMessageError(e);
        if (
          e.info.detail.new_password1 ||
          e.info.detail.new_password2 ||
          e.info.detail.old_password ||
          e.info.detail.non_field_errors
        ) {
          setMode(1);
        }
      }
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
        {({ handleChange }) => (
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
                    label="old_password"
                    name="old_password"
                    id="old_password"
                    className="my-3 shadow appearance-none border rounded w-[100%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Contraseña Antigua"
                    onChange={(e: any) => {
                      handleChange(e);
                      handleFormChange(e, "old_password");
                    }}
                  />
                  <ErrorMessage name="old_password" error={messageError} />
                  <label
                    className="block text-sm xl:text-lg mb-2 text-dark"
                    htmlFor="newPassword"
                  >
                    Contraseña Nueva
                  </label>
                  <Field
                    type="text"
                    label="new_password1"
                    name="new_password1"
                    id="new_password1"
                    className="my-3 shadow appearance-none border rounded w-[100%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Contraseña Nueva"
                    onChange={(e: any) => {
                      handleChange(e);
                      handleFormChange(e, "new_password1");
                    }}
                  />
                  <ErrorMessage name="new_password1" error={messageError} />
                  <label
                    className="block text-sm xl:text-lg mb-2 text-dark"
                    htmlFor="newPassword2"
                  >
                    Confirmar Contraseña Nueva
                  </label>
                  <Field
                    type="text"
                    label="new_password2"
                    name="new_password2"
                    id="new_password2"
                    className="my-3 shadow appearance-none border rounded w-[100%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Confirmar Contraseña Nueva"
                    onChange={(e: any) => {
                      handleChange(e);
                      handleFormChange(e, "new_password2");
                    }}
                  />
                  <ErrorMessage name="new_password2" error={messageError} />
                  <ErrorMessage name="non_field_errors" error={messageError} />
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
                    htmlFor="token"
                  ></label>
                  <Field
                    type="text"
                    label="token"
                    name="token"
                    id="token"
                    className="my-3 shadow appearance-none border rounded w-[100%] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Codigo de Confirmacion"
                  />
                  <ErrorMessage name="token" error={messageError} />
                  <div className="my-3">
                    <ShowCounter targetDate={responseOTP.expire}></ShowCounter>
                  </div>
                </div>
              )}
              <div className="flex gap-x-4">
                {mode === 2 && <Button onClick={backToModeOne}>Volver</Button>}
                <Button 
                  className={
                    isDisabled() 
                    ? "bg-blue-300 hover:bg-blue-200 hover:cursor-not-allowed text-white font-bold py-2 px-4 rounded"
                    : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  } 
                  disabled={isDisabled()} type="submit">
                  {mode == 1 ? "Continuar" : "Confirmar"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormChangePassword;
