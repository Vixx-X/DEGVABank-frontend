import Button from "@components/Globals/Button/Button";
import { postPayway } from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { Field, Form, Formik } from "formik";
import { API_URLS } from "@config";
import {
  getAccountDataWithURL,
  getListPaywayDataWithURL,
} from "@fetches/users";
import { Key, useState, useEffect } from "react";
import { useSWRAuth } from "@hooks/useSWRAuth";

const { URL_USER_ACCOUNTS, URL_USER_PAYWAY_APPS } = API_URLS;

interface PasarelaForm {
  backend: string;
  success: string;
  fail: string;
  account: string;
}

interface PayWayFormProp {
  initialValue: PasarelaForm;
  editable?: boolean;
}

const PayWayForm = ({ initialValue, editable = false }: PayWayFormProp) => {
  const postPaywayOption = useFetchCallback(postPayway);

  const dataAccounts = useSWRAuth(URL_USER_ACCOUNTS, getAccountDataWithURL);
  const dataPayway = useSWRAuth(URL_USER_PAYWAY_APPS, getListPaywayDataWithURL);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [payWay, setPayWay] = useState<any>();
  const [messageError, setMessageError] = useState<any>();

  useEffect(() => {
    if (dataAccounts.data && dataAccounts.data.results) {
      setAccounts(dataAccounts.data.results);
    }
  }, [dataAccounts]);

  useEffect(() => {
    if (dataPayway.data && dataPayway.data.results) {
      setPayWay(dataPayway.data);
    }
  }, [dataPayway]);

  const handleSubmitPayway = async (data: PasarelaForm) => {
    try {
      await postPaywayOption(data);
    } catch (e) {
      setMessageError(e);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={(values: PasarelaForm) => {
        handleSubmitPayway(values);
      }}
    >
      <Form>
        <div className="rounded-2xl w-full overflow-hidden shadow-lg p-8">
          <label
            className="text-darkprimary font-bold uppercase"
            htmlFor="idBill"
          >
            Información para habilitar pasarela
          </label>

          <div className="my-2">
            <label
              className="block text-sm xl:text-md pt-5 font-bold mb-2 text-dark"
              htmlFor="backend"
            >
              URL para Backend
            </label>
            <Field
              name="backend"
              className="appearance-none rounded w-full py-3 
          border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="backend"
              type="text"
              placeholder="Colocar Url"
              value={payWay?.backend}
              disabled={!editable}
            />
            <label
              className="block text-sm xl:text-md pt-5 font-bold mb-2 text-dark"
              htmlFor="success"
            >
              URL para redireccionar en caso exitoso
            </label>
            <Field
              name="success"
              className="appearance-none rounded w-full py-3 
          border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="success"
              type="text"
              placeholder="Colocar Url"
              value={payWay?.sucess}
              disabled={!editable}
            />
            <label
              className="block text-sm xl:text-md pt-5 font-bold mb-2 text-dark"
              htmlFor="fail"
            >
              URL para redireccionar en caso fallido
            </label>
            <Field
              name="fail"
              className="appearance-none rounded w-full py-3 
          border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fail"
              type="text"
              placeholder="Colocar Url"
              disabled={!editable}
            />
            <label
              className="block text-sm xl:text-md pt-5 font-bold mb-2 text-dark"
              htmlFor="account"
            >
              Seleccionar cuenta beneficiaria
            </label>
            <Field
              as="select"
              id="account"
              className="shadow appearance-none border-gray-300 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="account"
              disabled={!editable}
            >
              <option value="">--Seleccionar--</option>
              {accounts &&
                accounts.map(
                  ({ id, type }: any, index: Key | null | undefined) => (
                    <option key={index} value={id}>
                      {`Cuenta de ${type} : ${id}`}
                    </option>
                  )
                )}
            </Field>
          </div>
          <div className="flex justify-center pt-10">
            <Button
              type="submit"
              className=" w-full md:w-60 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              <p>Continuar</p>
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default PayWayForm;
