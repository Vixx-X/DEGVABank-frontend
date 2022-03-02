import Button from "@components/Globals/Button/Button";
import ErrorMessage from "@components/Globals/ErrorMessage";
import { API_URLS, SERVER_URLS } from "@config";
import { postPayway, putPayway } from "@fetches/users";
import { getAccountDataWithURL } from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { useSWRAuth } from "@hooks/useSWRAuth";
import { makeUrl } from "@utils/makeUrl";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { Key, useState, useEffect } from "react";

const { URL_USER_ACCOUNTS } = API_URLS;
const { URL_USER_PAYWAY_APP } = SERVER_URLS;

interface PasarelaForm {
  app_id: string;
  app_name: string;
  backend: string;
  success: string;
  fail: string;
  account: string;
}

interface PayWayFormProp {
  initialValue?: PasarelaForm;
  editable?: boolean;
  setEditable?: Function;
  submitCallback?: Function;
}

const PayWayForm = ({
  initialValue,
  editable = false,
  setEditable,
  submitCallback,
}: PayWayFormProp) => {
  const router = useRouter();
  const postPaywayOption = useFetchCallback(postPayway);
  const putPaywayOption = useFetchCallback(putPayway);

  const dataAccounts = useSWRAuth(URL_USER_ACCOUNTS, getAccountDataWithURL);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [messageError, setMessageError] = useState<any>();

  useEffect(() => {
    if (dataAccounts.data && dataAccounts.data.results) {
      setAccounts(dataAccounts.data.results);
    }
  }, [dataAccounts]);

  const handleSubmitPayway = async (data: PasarelaForm) => {
    let next = "";
    try {
      const resp = await (initialValue
        ? putPaywayOption(initialValue.app_id, data)
        : postPaywayOption(data));
      next = resp.app_id;
      submitCallback?.();
      setEditable?.(false);
      router.push(makeUrl(URL_USER_PAYWAY_APP, { app_id: next }));
    } catch (e) {
      setMessageError(e);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={
        initialValue ?? {
          app_id: "",
          app_name: "",
          backend: "",
          success: "",
          fail: "",
          account: "",
        }
      }
      onSubmit={(values: PasarelaForm) => {
        alert(JSON.stringify(values, null, 2));
        handleSubmitPayway(values);
      }}
    >
      <Form>
        <label
          className="text-darkprimary font-bold uppercase"
          htmlFor="idBill"
        >
          Información para habilitar pasarela
        </label>

        <div className="my-2">
          <div className="sm:grid sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label
                className="block text-sm xl:text-md pt-5 font-bold mb-2 text-dark"
                htmlFor="app-id"
              >
                Identificador unico de tu app
              </label>
              <Field
                name="app_id"
                className="appearance-none rounded w-full py-3 
            border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="app-id"
                type="text"
                placeholder="Escribir identificador del app"
                disabled={!editable}
              />
              <ErrorMessage name="app_id" error={messageError} />
            </div>
            <div>
              <label
                className="block text-sm xl:text-md pt-5 font-bold mb-2 text-dark"
                htmlFor="app-name"
              >
                Nombre unico de tu app
              </label>
              <Field
                name="app_name"
                className="appearance-none rounded w-full py-3 
            border-gray-300 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="app-name"
                type="text"
                placeholder="Escribir nombre del app"
                disabled={!editable}
              />
              <ErrorMessage name="app_name" error={messageError} />
            </div>
            <div>
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
              <ErrorMessage name="account" error={messageError} />
            </div>
            <div>
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
                disabled={!editable}
              />
              <ErrorMessage name="backend" error={messageError} />
            </div>
            <div>
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
                disabled={!editable}
              />
              <ErrorMessage name="success" error={messageError} />
            </div>
            <div>
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
              <ErrorMessage name="fail" error={messageError} />
            </div>
          </div>
        </div>
        {editable && (
          <div className="flex justify-center pt-10">
            <Button
              type="submit"
              className=" w-full md:w-60 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              <p>{!initialValue ? "Crear" : "Guardar"}</p>
            </Button>
          </div>
        )}
      </Form>
    </Formik>
  );
};

export default PayWayForm;
