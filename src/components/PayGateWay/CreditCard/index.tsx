import Button from "@components/Globals/Button/Button";
import ErrorMessage from "@components/Globals/ErrorMessage";
import Logotype from "@components/Globals/Logotype";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useState } from "react";

interface PayGateway {
  cardInfo: {
    number: string;
    expirationDate: string;
    cvc: string;
  };
  name: string;
}

interface CreditCardProp {
  num: number;
  setComponent: any;
}

const CreditCard = ({ num, setComponent }: CreditCardProp) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<any>();
  const handleSubmitCreditCard = () => {
    setLoading(true);
    try {
      setComponent(1);
    } catch (error) {
      setMessageError(error);
    } finally {
      setLoading(false);
    }
  };

  const initialValue: PayGateway = {
    cardInfo: {
      number: "",
      expirationDate: "",
      cvc: "",
    },
    name: "",
  };

  return (
    <>
      <div className="rounded-2xl h-fit md:mx-10 overflow-hidden shadow-lg p-4 md:p-8 w-full xl:w-7/12">
        <Logotype classnameBox="flex justify-center h-16" />
        <Formik
          initialValues={initialValue}
          onSubmit={(
            values: PayGateway,
            { setSubmitting }: FormikHelpers<PayGateway>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
        >
          <Form className="w-full p-4">
            <label
              className="block text-sm xl:text-lg pt-10 font-bold mb-2 text-dark"
              htmlFor="nameOnCard"
            >
              Titular de la tarjeta
            </label>
            <Field
              name="name"
              className="appearance-none rounded w-full py-3 
                border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name On Card"
            />
            <ErrorMessage name="name" error={messageError} />
            <label className="block text-sm xl:text-lg font-bold mb-2 text-dark pt-10">
              Card Information
            </label>
            <Field
              name="cardInfo.number"
              className="shadow appearance-none border-gray-300 rounded-t w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
              id="number"
              type="text"
              placeholder="0000 0000 0000 0000 0000"
            />
            <ErrorMessage name="number" error={messageError} />
            <div className="flex gap-x-2">
              <Field
                name="cardInfo.expirationDate"
                className="shadow appearance-none border-gray-300 rounded-b py-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/2"
                id="date"
                type="date"
                placeholder="dd/mm"
              />
              <ErrorMessage name="expirationDate" error={messageError} />
              <Field
                name="cardInfo.cvc"
                className="shadow appearance-none border-gray-300 rounded-b py-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/2"
                id="cvc"
                type="text"
                placeholder="CVC"
              />
              <ErrorMessage name="cvc" error={messageError} />
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
                <p>Pay ${num}</p>
              </Button>
            </div>
            <Button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                setComponent(1);
              }}
              className="pt-2 inline-block w-full align-baseline font-bold text-sm xl:text-md text-primary hover:text-darkprimary text-right"
            >
              <>¿Tienes cuenta en nuestro banco?</>
            </Button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default CreditCard;
