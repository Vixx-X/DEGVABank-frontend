import Button from "@components/Globals/Button/Button";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import { API_URLS } from "@config";
import {
  getAccountDataWithURL,
  getPaywayDataWithURL,
  postPayway,
  postPaywayKey,
} from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { useSWRAuth } from "@hooks/useSWRAuth";
import { Field, Form, Formik, FormikHelpers } from "formik";
import type { NextPage } from "next";
import { Key, useEffect, useState } from "react";

const { URL_USER_ACCOUNTS, URL_USER_PAYWAY } = API_URLS;

interface PasarelaForm {
  backend: string;
  success: string;
  fail: string;
  account: string;
}

const initialValue = {
  backend: "",
  success: "",
  fail: "",
  account: "",
};

const PasarelaOptions: NextPage = () => {
  const dataAccounts = useSWRAuth(URL_USER_ACCOUNTS, getAccountDataWithURL);
  const dataPayway = useSWRAuth(URL_USER_PAYWAY, getPaywayDataWithURL);
  const [ITEMS_BILLS, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageError, setMessageError] = useState<any>();
  const [warningAlert, setWarningAlert] = useState<boolean>(false);
  const [keys, setKeys] = useState(false);
  const [currentkeys, setCurrentKeys] = useState(
    keys
      ? {
          private:
            "**********************************************************",
          public:
            "**********************************************************",
        }
      : { private: "", public: "" }
  );

  //
  const postPaywayOption = useFetchCallback(postPayway);
  const postPaywayKeyOption = useFetchCallback(postPaywayKey);

  useEffect(() => {
    if (dataAccounts.data && dataAccounts.data.results) {
      setItems(dataAccounts.data.results);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [dataAccounts]);

  const handleSubmitPayway = async (data: PasarelaForm) => {
    setLoading(true);
    try {
      await postPaywayOption(data);
    } catch (e) {
      setMessageError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPaywayKey = async () => {
    setLoading(true);
    try {
      const ret = await postPaywayKeyOption();
      setCurrentKeys(ret);
      setKeys(true);
      setWarningAlert(true);
    } catch (e) {
      setMessageError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="sm:grid sm:grid-cols-2 sm:gap-x-8">
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
                //   value={dataPayway.backend}
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
                //   value={dataPayway.sucess}
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
                >
                  <option value="">--Seleccionar--</option>
                  {ITEMS_BILLS &&
                    ITEMS_BILLS.map(
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
        <div className="rounded-2xl w-full overflow-hidden shadow-lg p-8">
          <div>
            <label className="text-darkprimary font-bold uppercase">
              Generar llave publica y privada
            </label>
          </div>
          {keys && (
            <>
              <label className="block text-sm xl:text-md pt-5 font-bold mb-2 text-dark">
                Clave privada
              </label>

              <p>{currentkeys.private}</p>

              <label className="block text-sm xl:text-md pt-5 font-bold mb-2 text-dark">
                Clave pública
              </label>
              <p>{currentkeys.public}</p>
            </>
          )}

          <div className="mt-8">
            {warningAlert && (
              <div
                className="flex my-4 p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800 w-full"
                role="alert"
              >
                <svg
                  className="inline flex-shrink-0 mr-3 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"></path>
                </svg>
                <div>
                  <span className="font-medium">Alterta!</span> Guarde la clave
                  privada porque no volverá a aparecer. De lo contrario deberá
                  volver a generarla
                </div>
              </div>
            )}
            <Button
              onClick={handleSubmitPaywayKey}
              className=" w-full md:w-60 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              <p>Generar</p>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PasarelaOptions;
