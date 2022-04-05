import ErrorMessage from "@components/Globals/Alerts/ErrorMessage";
import Button from "@components/Globals/Button/Button";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import Loading from "@components/Globals/Loading";
import ConfirmTrasaction from "@components/Transaction/ConfirmTransaction";
import { API_URLS } from "@config";
import { UserContext } from "@contexts/UserContext";
import { getAccountDataWithURL, postTransferUser } from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { useSWRAuth } from "@hooks/useSWRAuth";
import { Field, Form, Formik } from "formik";
import type { NextPage } from "next";
import { Key, useContext, useEffect, useState } from "react";

const { URL_USER_ACCOUNTS } = API_URLS;

interface TransferForm {
  acc_src: {
    number: string;
    document_id: string;
  };
  acc_dst: {
    number: string;
    typeOfDocumentID: string;
    document_id: string;
  };
  amount: string;
  reason: string;
}

const initialValue: TransferForm = {
  acc_src: {
    number: "",
    document_id: "",
  },
  acc_dst: {
    number: "",
    typeOfDocumentID: "",
    document_id: "",
  },
  amount: "",
  reason: "",
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
  const { user } = useContext(UserContext);

  const postTransfer = useFetchCallback(postTransferUser);

  useEffect(() => {
    if (dataAccounts.data && dataAccounts.data.results) {
      setItems(dataAccounts.data.results);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [dataAccounts]);

  const handleSubmit = async (data: TransferForm) => {
    setLoading(true);
    const transfer = {
      acc_src: {
        number: data.acc_src.number,
        document_id: user.document_id,
      },
      acc_dst: {
        number: data.acc_dst.number,
        document_id:
          data.acc_dst.typeOfDocumentID.toUpperCase() +
          data.acc_dst.document_id,
      },
      amount: data.amount,
      reason: data.reason,
    };

    try {
      await postTransfer(transfer);
      setSucess(true);
    } catch (e) {
      setIsDisplayConfirmTransaction(false);
      emptyValuesConfirmTrasaction();
      setMessageError(e);
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

  const emptyValuesConfirmTrasaction = () => {
    setvaluesConfirmTrasaction({
      acc_src: {
        number: "",
        document_id: "",
      },
      acc_dst: {
        number: "",
        typeOfDocumentID: "",
        document_id: "",
      },
      amount: "",
      reason: "",
    });
  };

  const handleCancel = () => {
    setIsDisplayConfirmTransaction(false);
    // emptyValuesConfirmTrasaction();
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
              setvaluesConfirmTrasaction(values);
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
                      name="acc_src.number"
                      onChange={(e: any) => {
                        handleChange(e);
                        handleCurrentBill(e);
                      }}
                    >
                      <option disabled value="">
                        --Seleccionar--
                      </option>
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

                    {bill ? (
                      <>
                        <p className="text-darkprimary mt-2">
                          Saldo disponible en:{" "}
                          <span className="text-gray-500">{bill.id}</span>
                        </p>
                        <p className="text-xl my-2 mb-4">{`$${bill.balance}`}</p>
                      </>
                    ) : (
                      <p className="text-gray-400 my-4 italic">
                        Por favor seleccionar una cuenta de donde debitar
                      </p>
                    )}
                    <ErrorMessage
                      name="acc_src.number"
                      embed={true}
                      error={messageError}
                    />
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
                          name="acc_dst.number"
                          id="target"
                          className="shadow appearance-none border-gray-300 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Número de cuenta"
                        />
                        <ErrorMessage
                          name="acc_dst.number"
                          embed={true}
                          error={messageError}
                        />
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
                          id="name"
                          name="name"
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
                          id="lastname"
                          name="lastname"
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
                            name="acc_dst.typeOfDocumentID"
                            onClick={handleCurrentBill}
                          >
                            <option disabled>--Seleccionar--</option>
                            <option value="V">V-</option>
                            <option value="E">E-</option>
                            <option value="J">J-</option>
                          </Field>
                          <Field
                            className="shadow appearance-none border-gray-300 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline basis-3/4"
                            id="idNumber"
                            type="number"
                            name="acc_dst.document_id"
                            placeholder="Ej: 5555555"
                          />
                        </div>
                        <ErrorMessage
                          name="acc_dst.document_id"
                          embed={true}
                          error={messageError}
                        />
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
                          id="email"
                          name="email"
                          className="shadow appearance-none border-gray-300 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="E-mail"
                        />
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
                          type="number"
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
