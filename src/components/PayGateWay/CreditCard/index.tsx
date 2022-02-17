import Button from "@components/Globals/Button/Button";
import Logotype from "@components/Globals/Logotype";
import { Formik, Form, Field, FormikHelpers } from "formik";

interface PayGateway {
  email: "";
  cardInfo: {
    number: 0;
    expirationDate: "";
    cvc: "";
  };
  nameOnCard: "";
}

interface CreditCardProp {
  amount: string;
}

const CreditCard = ({ amount }: CreditCardProp) => {
  const initialValue: PayGateway = {
    email: "",
    cardInfo: {
      number: 0,
      expirationDate: "",
      cvc: "",
    },
    nameOnCard: "",
  };

  return (
    <>
      <div className="rounded-2xl w-9/12 overflow-hidden shadow-lg p-8">
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
          {({ isSubmitting }) => (
            <Form className="w-full p-4">
              <label
                className="block text-sm xl:text-lg pt-10 font-bold mb-2 text-dark"
                htmlFor="nameOnCard"
              >
                Titular de la tarjeta
              </label>
              <Field
                name="nameOnCard"
                className="appearance-none rounded w-full py-3 
                border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nameOnCard"
                type="text"
                placeholder="Name On Card"
              />
              <label className="block text-sm xl:text-lg font-bold mb-2 text-dark pt-10">
                Card Information
              </label>
              <Field
                name="cardInfo.number"
                className="shadow appearance-none border-gray-300 rounded-t w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
                id="number"
                type="text"
                placeholder="Card Number"
              />
              <div className="flex gap-x-2">
                <Field
                  name="cardInfo.expirationDate"
                  className="shadow appearance-none border-gray-300 rounded-b py-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/2"
                  id="date"
                  type="text"
                  placeholder="dd/mm"
                />
                <Field
                  name="cardInfo.cvc"
                  className="shadow appearance-none border-gray-300 rounded-b py-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/2"
                  id="cvc"
                  type="text"
                  placeholder="CVC"
                />
              </div>
              <div className="flex justify-center pt-20">
                <Button className="bg-primary hover:bg-blue-700 text-white font-bold py-2  rounded-full w-full max-w-[22rem]">
                  <p>Pay {amount}</p>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreditCard;
