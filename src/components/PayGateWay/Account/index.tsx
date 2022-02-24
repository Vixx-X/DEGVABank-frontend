import Button from "@components/Globals/Button/Button";
import ErrorMessage from "@components/Globals/ErrorMessage";
import Logotype from "@components/Globals/Logotype";
import { API_URLS } from "@config";
import { getAccountDataWithURL, postTransferUser } from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { useSWRAuth } from "@hooks/useSWRAuth";
import { Formik, Form } from "formik";
import { Key, useEffect, useState } from "react";

const { URL_USER_ACCOUNTS } = API_URLS;

interface AccountProp {
  num: number;
}

interface TransferForm {
  source: string;
  amount: number;
}

const initialValue: TransferForm = {
  source: "",
  amount: 0,
};

const Account = ({ num }: AccountProp) => {
  const dataAccounts = useSWRAuth(URL_USER_ACCOUNTS, getAccountDataWithURL);
  const [sucessTransaction, setSucess] = useState<boolean>(false);
  const [ITEMS_BILLS, setItems] = useState<any[]>([]);
  const [bill, setbill] = useState<any>();
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    const transfer = {
      source: "00691337537154591381",
      amount: data.amount,
    };
    try {
      await postTransfer(transfer);
      setSucess(true);
    } catch (e) {
      setMessageError(e);
      console.log(e);
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
  return (
    <>
      <div className="rounded-2xl h-fit md:mx-10 overflow-hidden shadow-lg p-4 md:p-8 w-9/12">
        <Logotype classnameBox="flex justify-center h-16" />
        <Formik
          initialValues={initialValue}
          onSubmit={(values: TransferForm) => {
            handleSubmit(values);
          }}
        >
          <Form className="w-full p-4">
            <>
              <div>
                <p className="text-darkprimary font-bold text-md uppercase">
                  Cuenta a debitar
                </p>
              </div>
              <select
                id="account_src"
                className="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                name="account_src"
                onChange={(e) => {
                  handleCurrentBill(e);
                }}
              >
                <option disabled>--Seleccionar--</option>
                {ITEMS_BILLS &&
                  ITEMS_BILLS.map(
                    ({ id, type }: any, index: Key | null | undefined) => (
                      <option key={index} value={id}>
                        {`Cuenta de ${type} : ${id}`}
                      </option>
                    )
                  )}
              </select>
              <p className="text-darkprimary mt-2">
                Saldo disponible en:{" "}
                <span className="text-gray-500">{bill?.id}</span>
              </p>
              <ErrorMessage name="source" error={messageError} />
              <p className="text-xl my-2 mb-4">{`$${bill?.balance}`}</p>
              {sucessTransaction && (
                <div
                  className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                  role="alert"
                >
                  <span className="font-medium">Transacción Exitosa!</span> Su
                  transacción ha sido realizada de manera exitosa.
                </div>
              )}
              {loading && (
                <div className="relative w-full bg-gray-200 rounded mt-4">
                  <div className="w-full absolute top-0 h-4 rounded shim-blue"></div>
                </div>
              )}
              <div className="flex justify-center pt-10">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-blue-700 text-white font-semibold py-2  rounded-full w-full max-w-[22rem]"
                >
                  <p>Pay {num}</p>
                </Button>
              </div>
            </>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Account;
