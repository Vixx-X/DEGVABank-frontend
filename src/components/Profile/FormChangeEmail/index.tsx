import ErrorMessage from "@components/Globals/Alerts/ErrorMessage";
import SuccessMessage from "@components/Globals/Alerts/SuccessMessage";
import Button from "@components/Globals/Button/Button";
import ShowCounter from "@components/PayGateWay/CountDownTimer/index";
import { GenerateOTP, ChangeEmail } from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { Formik, Form, Field } from "formik";
import { useState } from "react";

interface FormChangePasswordProps {
  isOpenModal: (bol: boolean) => void;
  newEmail: string;
  response: any;
}

const FormChangeEmail = ({
  isOpenModal,
  newEmail,
  response,
}: FormChangePasswordProps) => {
  const [sucessTransaction, setSucess] = useState<boolean>(false);
  const [showResend, setShowResend] = useState<boolean>(false);
  //   const [responseOTP, setResponseOTP] = useState({ response } as any);
  const [messageError, setMessageError] = useState<any>();

  const generateOTP = useFetchCallback(GenerateOTP);
  const changeEmail = useFetchCallback(ChangeEmail);

  const initialValue = {
    token: "",
  };

  const handleSubmit = async (e: any) => {
    try {
      const data = {
        ...e,
        device: response.device,
        email: newEmail,
      };
      await changeEmail(data);
      setSucess(true);
      setTimeout(() => {
        isOpenModal(false);
      }, 1000);
    } catch (e: any) {
      setMessageError(e);
    }
  };

  return (
    <div className="w-full p-4">
      <Formik
        initialValues={initialValue}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ handleChange }) => (
          <Form>
            <div>
              {/* <pre>{JSON.stringify(responseOTP)}</pre> */}
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
              <div className="my-4 ">
                {/* {showResend ? (
                        <>
                          El tiempo ha expirado. Para volver a enviar el código
                          de seguridad haga click{" "}
                          <span
                            onClick={() =>
                              setResponseOTP(
                                generateOTP({
                                  email: newEmail,
                                })
                              )
                            }
                            className="text-primary hover:underline cursor-pointer"
                          >
                            aquí
                          </span>
                        </>
                      ) : ( */}
                <ShowCounter
                  targetDate={response.expire}
                  fun={() => setShowResend(true)}
                ></ShowCounter>
                {/* )} */}
              </div>
              {sucessTransaction && (
                <SuccessMessage>¡Correo cambiado exitosamente!</SuccessMessage>
              )}
            </div>
            <div className="flex gap-x-4">
              <Button>Confirmar</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormChangeEmail;
