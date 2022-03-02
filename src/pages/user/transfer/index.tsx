import Button from "@components/Globals/Button/Button";
import ErrorMessage from "@components/Globals/ErrorMessage";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import Loading from "@components/Globals/Loading";
import ConfirmTrasaction from "@components/Transaction/ConfirmTransaction";
import { API_URLS, SERVER_URLS } from "@config";
import { getAccountDataWithURL, postTransferUser } from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { useSWRAuth } from "@hooks/useSWRAuth";
import { Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { Key, useEffect, useState } from "react";

const { URL_USER_ACCOUNTS } = API_URLS;
const { URL_USER_TRANSACTION } = SERVER_URLS;

interface TransferForm {
  name: string;
  lastname: string;
  email: string;
  target: string;
  source: string;
  number: number;
  typeOfDocumentID: string;
  reason: string;
  alias?: string;
  amount: number;
}

const initialValue: TransferForm = {
  name: "",
  lastname: "",
  email: "",
  target: "",
  source: "",
  number: 0,
  typeOfDocumentID: "v",
  reason: "",
  alias: "",
  amount: 0,
};

const Transfer: NextPage = () => {
  const dataAccounts = useSWRAuth(URL_USER_ACCOUNTS, getAccountDataWithURL);
  const [sucessTransaction, setSucess] = useState<boolean>(false);
  const [ITEMS_BILLS, setItems] = useState<any[]>([]);
  const [bill, setbill] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [valuesConfirmTrasaction, setvaluesConfirmTrasaction] =
    useState<TransferForm>();
  const [isDisplayConfirmTransaction, setIsDisplayConfirmTransaction] =
    useState(false);
  const [messageError, setMessageError] = useState<any>();

  const postTransfer = useFetchCallback(postTransferUser);

  useEffect(() => {
    if (dataAccounts.data && dataAccounts.data.results) {
      setItems(dataAccounts.data.results);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [dataAccounts]);

  useEffect(() => {
    if (ITEMS_BILLS) {
      setbill(ITEMS_BILLS[0]);
    }
  }, [ITEMS_BILLS]);

  const handleSubmit = async (data: TransferForm) => {
    console.log("Data ", data);
    setLoading(true);
    const transfer = {
      source: data.source,
      target: data.target,
      document_id: data.typeOfDocumentID.toUpperCase() + data.number,
      amount: data.amount,
      reason: data.reason,
    };
    console.log("Transfer", transfer);
    try {
      await postTransfer(transfer);
      setSucess(true);
    } catch (e) {
      setMessageError(e);
      console.log("errores", messageError);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentBill = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const findBill = ITEMS_BILLS.find(
      ({ id }) => e.target.value == id.toString()
    );
    if (findBill) {
      setbill(findBill);
    }
  };

  const handleCancel = () => {
    console.log("Cancelar !");
    setIsDisplayConfirmTransaction(false);
  };

  return (
    <MainLayout activate="transfer">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Formik
            initialValues={initialValue}
            onSubmit={(values: TransferForm) => {
              // console.log("OnSubmit",values)
              setvaluesConfirmTrasaction(values);
              console.log("Formik", values);
              setIsDisplayConfirmTransaction(true);
              // handleSubmit(values);
            }}
          >
            {({ handleChange }) => (
              <Form>
                <div className="divide-y">
                  <div>
                    <div>
                      <p className="text-darkprimary font-bold text-md uppercase">
                        Cuenta a debitar
                      </p>
                    </div>
                    <Field
                      as="select"
                      id="source"
                      className="shadow appearance-none border-gray-300 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="source"
                      onChange={(e: any) => {
                        handleChange(e);
                        handleCurrentBill(e);
                      }}
                    >
                      <option value="">--Seleccionar--</option>
                      {ITEMS_BILLS &&
                        ITEMS_BILLS.map(
                          (
                            { id, type }: any,
                            index: Key | null | undefined
                          ) => (
                            <option key={index} value={id}>
                              {`Cuenta de ${type} : ${id}`}
                            </option>
                          )
                        )}
                    </Field>
                    <ErrorMessage name="source" error={messageError} />
                    <p className="text-darkprimary mt-2">
                      Saldo disponible en:{" "}
                      <span className="text-gray-500">{bill?.id}</span>
                    </p>
                    <p className="text-xl my-2 mb-4">{`$${bill?.balance}`}</p>
                  </div>
                  <div className="mt-4 pt-4">
                    <div>
                      <p className="text-darkprimary font-bold text-lg uppercase my-2">
                        Datos de la transferencia
                      </p>
                    </div>
                    <div className="py-4 w-full sm:grid sm:grid-cols-2 gap-x-8 justify-center">
                      <div className="mb-4">
                        <label
                          className="block text-sm xl:text-lg font-bold mb-2 text-dark"
                          htmlFor="name"
                        >
                          Número de cuenta
                        </label>
                        <Field
                          type="text"
                          label="Número de cuenta"
                          name="target"
                          id="target"
                          className="shadow appearance-none border-gray-300 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Número de cuenta"
                        />
                        <ErrorMessage name="target" error={messageError} />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-sm xl:text-lg font-bold mb-2 text-dark"
                          htmlFor="name"
                        >
                          Nombre
                        </label>
                        <Field
                          type="text"
                          label="Nombre"
                          name="name"
                          id="name"
                          className="shadow appearance-none border-gray-300 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Nombre"
                        />
                        <ErrorMessage name="name" error={messageError} />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-sm xl:text-lg font-bold mb-2 text-dark"
                          htmlFor="lastname"
                        >
                          Apellido
                        </label>
                        <Field
                          type="text"
                          label="Apellido"
                          name="lastname"
                          id="lastname"
                          className="shadow appearance-none border-gray-300 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Apellido"
                        />
                        <ErrorMessage name="lastname" error={messageError} />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-sm xl:text-lg font-bold mb-2 text-dark"
                          htmlFor="idNumber"
                        >
                          Número de identificación
                        </label>
                        <div className="flex justify-between">
                          <Field
                            as="select"
                            id="typeOfDocumentID"
                            className="form-select appearance-none block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border-gray-300 border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none basis-1/5"
                            name="typeOfDocumentID"
                            onClick={handleCurrentBill}
                          >
                            <option disabled>--Seleccionar--</option>
                            <option value="V">V-</option>
                            <option value="E">E-</option>
                            <option value="J">J-</option>
                          </Field>
                          <ErrorMessage
                            name="typeOfDocumentID"
                            error={messageError}
                          />
                          <Field
                            className="shadow appearance-none border-gray-300 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline basis-3/4"
                            id="idNumber"
                            type="number"
                            name="number"
                            placeholder="Ej: 5555555"
                          />
                          <ErrorMessage name="number" error={messageError} />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-sm xl:text-lg font-bold mb-2 text-dark"
                          htmlFor="email"
                        >
                          Correo
                        </label>
                        <Field
                          type="email"
                          label="Correo electrónico"
                          name="email"
                          id="email"
                          className="shadow appearance-none border-gray-300 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="E-mail"
                        />
                        <ErrorMessage name="email" error={messageError} />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-sm xl:text-lg font-bold mb-2 text-dark"
                          htmlFor="email"
                        >
                          Motivo
                        </label>
                        <Field
                          type="text"
                          label="Motivo"
                          name="reason"
                          id="reason"
                          className="shadow appearance-none border-gray-300 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Motivo"
                        />
                        <ErrorMessage name="reason" error={messageError} />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-sm xl:text-lg font-bold mb-2 text-dark"
                          htmlFor="email"
                        >
                          Monto
                        </label>
                        <Field
                          className="shadow appearance-none border-gray-300 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline basis-3/4"
                          id="amount"
                          type="amount"
                          name="amount"
                        />
                        <ErrorMessage name="amount" error={messageError} />
                      </div>
                    </div>
                  </div>
                </div>
                {!isDisplayConfirmTransaction && (
                  <div className="flex justify-center gap-x-6">
                    <Button
                      type="submit"
                      className=" w-full md:w-60 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      <p>Aceptar</p>
                    </Button>
                  </div>
                )}

                {loading && (
                  <div className="relative w-full bg-gray-200 rounded mt-4">
                    <div className="w-full absolute top-0 h-4 rounded shim-blue"></div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
          {isDisplayConfirmTransaction && (
            <div className="mt-5">
              <ConfirmTrasaction
                value={valuesConfirmTrasaction}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          )}
          {sucessTransaction && (
            <div
              className="p-4 my-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
              role="alert"
            >
              <span className="font-medium">Transacción Exitosa!</span> Su
              transacción ha sido realizada de manera exitosa.
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
};

export default Transfer;
