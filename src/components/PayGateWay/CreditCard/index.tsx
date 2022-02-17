import Button from "@components/Globals/Button/Button";
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

interface CreditCardProp{
    amount:string
}

const CreditCard = ({amount}:CreditCardProp) => {
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
          <Form className="">
            <label
              className="block text-sm xl:text-lg font-bold mb-2 text-dark"
              htmlFor="email"
            >
              Dirección
            </label>
            <Field
              name="email"
              className="appearance-none rounded w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
            />
            <label className="block text-sm xl:text-lg font-bold mb-2 text-dark pt-10">
              Card Information
            </label>
            <Field
              name="cardInfo.number"
              className="shadow appearance-none border rounded-t w-full py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="number"
              type="text"
              placeholder="Card Number"
            />
            <div>
              <Field
                name="cardInfo.expirationDate"
                className="shadow appearance-none border rounded-b w-1/2 py-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="text"
                placeholder="dd/mm"
              />
              <Field
                name="cardInfo.cvc"
                className="shadow appearance-none border rounded-b w-1/2 py-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cvc"
                type="text"
                placeholder="CVC"
              />
            </div>
            <label
              className="block text-sm xl:text-lg pt-10 font-bold mb-2 text-dark"
              htmlFor="nameOnCard"
            >
              Name on Card
            </label>
            <Field
              name="nameOnCard"
              className="appearance-none rounded w-full py-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nameOnCard"
              type="text"
              placeholder="Name On Card"
            />
            <div className="flex justify-center pt-20">
              <Button className="bg-primary hover:bg-blue-700 text-white font-bold py-2  rounded-full w-full max-w-[22rem]">
                <p>Pay {amount}</p>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreditCard;
