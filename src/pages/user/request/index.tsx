import Button from "@components/Globals/Button/Button";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import { Field, Form, Formik } from "formik";
// import { SERVER_URLS } from "@config";
import type { NextPage } from "next";
import { useState } from "react";

// const { URL_LOGIN, URL_REGISTER } = SERVER_URLS;

const Transaction: NextPage = () => {
  const [account, setAccount] = useState(false);

  const handleAccount = (e: any) => {
    e.preventDefault();
    setAccount(!account);
  };

  interface SignupForm {
    type: string;
  }

  const initialValue: SignupForm = {
    type: "ahorro",
  };

  return (
    <MainLayout activate="movements">
      <div className="sm:grid sm:grid-cols-2 sm:gap-x-8">
        <Formik
          initialValues={initialValue}
          //validationSchema={SignupSchema}
          onSubmit={(values: SignupForm) => {
            // handleSubmit(values);
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
                    value="ahorro"
                    className="mr-2"
                  />
                  Ahorro
                </label>
                <label className="block text-sm xl:text-lg mb-2 text-dark flex items-center">
                  <Field
                    type="radio"
                    name="type"
                    value="corriente"
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
        <Formik
          initialValues={initialValue}
          //validationSchema={SignupSchema}
          onSubmit={(values: SignupForm) => {
            // handleSubmit(values);
          }}
        >
          <Form>
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
                >
                  <p>Mandar la solicitud</p>
                </Button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </MainLayout>
  );
};

export default Transaction;
