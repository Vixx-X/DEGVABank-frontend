import Button from "@components/Globals/Button/Button";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import { postUserAccont, postUserCreditCard} from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { Field, Form, Formik } from "formik";
// import { SERVER_URLS } from "@config";
import type { NextPage } from "next";

// const { URL_LOGIN, URL_REGISTER } = SERVER_URLS;
enum AccountType {
  CHECKING = "CHECKING",
  SAVING = "SAVING",
}

const Transaction: NextPage = () => {
  interface SignupForm {
    type: AccountType;
    balance: number;
  }

  const initialValue: SignupForm = {
    type: AccountType.CHECKING,
    balance: 300000,
  };

  const pushData = useFetchCallback(postUserAccont);

  const pushDataCard = useFetchCallback(postUserCreditCard);
  //   const handleSubmit = (values: any) => {

  //   }

  return (
    //useFetchCallback
    <MainLayout activate="movements">
      <div className="sm:grid sm:grid-cols-2 sm:gap-x-8">
        <Formik
          initialValues={initialValue}
          //validationSchema={SignupSchema}
          onSubmit={() => {
            //values: SignupForm
            pushData({
              type: AccountType.CHECKING,
              balance: 300000,
            });
          }}
        >
          <Form>
            <div className="rounded-2xl w-full overflow-hidden shadow-lg p-8">
              <label
                className="text-darkprimary font-bold uppercase"
                htmlFor="idBill"
              >
                Solicitar Apertura de Cuenta
              </label>

              <div className="my-4">
                <p className="block text-sm xl:text-lg font-bold mb-2 text-dark flex items-center">
                  Tipo de cuenta
                </p>
                <label className="block text-sm xl:text-lg mb-2 text-dark flex items-center">
                  <Field
                    type="radio"
                    name="type"
                    value={AccountType.CHECKING}
                    className="mr-2"
                  />
                  Ahorro
                </label>
                <label className="block text-sm xl:text-lg mb-2 text-dark flex items-center">
                  <Field
                    type="radio"
                    name="type"
                    value={AccountType.SAVING}
                    className="mr-2"
                  />
                  <p>Corriente</p>
                </label>
              </div>
              <Button
                type="submit"
                className=" w-full md:w-60 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                <p>Mandar la solicitud</p>
              </Button>
            </div>
          </Form>
        </Formik>
        <div className="rounded-2xl w-full overflow-hidden shadow-lg p-8">
          <div>
            <label
              className="text-darkprimary font-bold uppercase"
              htmlFor="idBill"
            >
              Solicitar Apertura de Tarjeta de Crédito
            </label>
          </div>
          <div className="mt-8">
            <Button
              type="submit"
              className=" w-full md:w-60 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => pushDataCard({ credit: 40000 })}
              //   onClick={handleCredit}
            >
              <p>Mandar la solicitud</p>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Transaction;
