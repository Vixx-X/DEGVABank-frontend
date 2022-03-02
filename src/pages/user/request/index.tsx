import Button from "@components/Globals/Button/Button";
import DataTable from "@components/Globals/DataTable";
import ErrorMessage from "@components/Globals/ErrorMessage";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import { API_URLS } from "@config";
import {
  getRequestWithURL,
  postUserAccont,
  postUserCreditCard,
} from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { useSWRAuth } from "@hooks/useSWRAuth";
import { makeUrl } from "@utils/makeUrl";
import { Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { useState } from "react";

enum AccountType {
  CHECKING = "CHECKING",
  SAVING = "SAVING",
}

const { URL_USER_REQUESTS } = API_URLS;

const HEADERS = {
  id: "id",
  reason: "razón",
  status: "estado",
  date_processed: "fecha procesada",
  date_created: "fecha emitida",
  object_id: "target",
};

const Transaction: NextPage = () => {
  interface RequestForm {
    type: AccountType;
    balance: number;
  }

  const initialValue: RequestForm = {
    type: AccountType.CHECKING,
    balance: 0,
  };

  const [paramsURL, setparamsURL] = useState({} as any);

  const pushData = useFetchCallback(postUserAccont);

  const pushDataCard = useFetchCallback(postUserCreditCard);
  const [messageError, setMessageError] = useState<any>();

  const handleSubmit = async (data: RequestForm) => {
    try {
      await pushData({
        type: data.type,
        balance: data.balance,
      });
      // setSucess(true);
    } catch (e) {
      setMessageError(e);
      console.log("errores", e);
    } finally {
      // setLoading(false);
    }
  };

  const { data } = useSWRAuth(
    makeUrl(URL_USER_REQUESTS, paramsURL),
    getRequestWithURL
  );

  return (
    //useFetchCallback
    <MainLayout activate="products">
      <div className="sm:grid sm:grid-cols-2 sm:gap-x-8">
        <Formik
          initialValues={initialValue}
          onSubmit={(values: RequestForm) => {
            handleSubmit(values);
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
                <label
                  className="block text-sm xl:text-md pt-5 font-bold mb-2 text-dark xl:text-lg"
                  htmlFor="initial-balance"
                >
                  Balance Inicial
                </label>
                <Field
                  name="balance"
                  className="appearance-none rounded w-full py-3 
            border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="initial-balance"
                  type="number"
                  placeholder="Balance inicial"
                />
              </div>
              <Button
                type="submit"
                className=" w-full md:w-60 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                <p>Mandar la solicitud</p>
              </Button>
              <ErrorMessage name="non_field_errors" error={messageError} />
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
              onClick={() => pushDataCard({ credit: 0 })}
            >
              <p>Mandar la solicitud</p>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 mx-8">
        {data?.results && data.results.length > 0 ? (
          <DataTable headers={HEADERS} items={data.results} />
        ) : (
          <p> No posee peticiones con nosotros.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default Transaction;
