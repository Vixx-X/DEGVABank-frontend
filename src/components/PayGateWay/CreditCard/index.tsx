import ErrorMessage from "@components/Globals/Alerts/ErrorMessage";
import Button from "@components/Globals/Button/Button";
import Logotype from "@components/Globals/Logotype";
import { postPaywayCard } from "@fetches/users";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

interface CreditCardProp {
  amount: string;
  order: string;
  publicKey: string;
  reason: string;
  setComponent: any;
}

interface CreditCardForm {
  security_code: string;
  expiration_date: string;
  number: string;
  user: string;
}

const CreditCard = ({
  amount,
  order,
  publicKey,
  reason,
  setComponent,
}: CreditCardProp) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<any>();
  const [sucessTransaction, setSucess] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (data: CreditCardForm) => {
    setLoading(true);
    const obj = data.expiration_date.split("-");
    const pay = {
      key: publicKey,
      amount: amount,
      order: order,
      reason: reason,
      card: {
        number: data.number,
        security_code: data.security_code,
        expiration_date: `${obj[1]}/${obj[0]}`,
      },
    };
    try {
      const ret = await postPaywayCard(pay);
      setSucess(true);
      router.push(ret.next);
    } catch (e) {
      console.log(e);
      setMessageError(e);
    } finally {
      setLoading(false);
    }
  };

  const initialValue: CreditCardForm = {
    security_code: "",
    expiration_date: "",
    number: "",
    user: "",
  };

  return (
    <>
      <div className="rounded-2xl h-fit overflow-hidden shadow-lg p-4 md:p-8 w-full xl:w-9/12">
        <Logotype classnameBox="flex justify-center h-16" />
        <Formik
          initialValues={initialValue}
          onSubmit={(values: CreditCardForm) => {
            handleSubmit(values);
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
              name="user"
              className="appearance-none rounded w-full py-3 
                border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="user"
              type="text"
              placeholder="Name On Card"
            />
            <ErrorMessage name="user" error={messageError} />
            <label className="block text-sm xl:text-lg font-bold mb-2 text-dark pt-10">
              Card Number
            </label>
            <Field
              name="number"
              className="shadow appearance-none border-gray-300 rounded-t w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
              id="number"
              type="text"
              placeholder="0000 0000 0000 0000 0000"
            />
            <ErrorMessage
              name="card.number"
              error={messageError}
              embed={true}
            />
            <div className="flex gap-x-2">
              <div className="w-1/2">
                <Field
                  name="expiration_date"
                  className="shadow appearance-none border-gray-300 rounded-b py-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  id="expiration_date"
                  type="month"
                />
                <ErrorMessage
                  name="card.expiration_date"
                  error={messageError}
                  embed={true}
                />
              </div>
              <div className="w-1/2">
                <Field
                  name="security_code"
                  className="shadow appearance-none border-gray-300 rounded-b py-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                  id="security_code"
                  type="text"
                  placeholder="CVC"
                />
                <ErrorMessage
                  name="card.security_code"
                  error={messageError}
                  embed={true}
                />
              </div>
            </div>
            {sucessTransaction && (
              <div
                className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                role="alert"
              >
                <span className="font-medium">Pago Exitoso!</span> Su pago ha
                sido realizado de manera exitosa.
              </div>
            )}
            {loading && (
              <div className="relative w-full bg-gray-200 rounded mt-4">
                <div className="w-full absolute top-0 h-4 rounded shim-blue"></div>
              </div>
            )}
            <ErrorMessage name="source" error={messageError} />
            <ErrorMessage name="order" error={messageError} />
            <ErrorMessage name="reason" error={messageError} />
            <ErrorMessage name="non_field_errors" error={messageError} />
            <ErrorMessage name="key" error={messageError} />
            <div className="flex justify-center pt-10">
              <Button
                type="submit"
                className="bg-primary hover:bg-blue-700 text-white font-semibold py-2  rounded-full w-full max-w-[22rem]"
              >
                <p>Pay ${amount}</p>
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
