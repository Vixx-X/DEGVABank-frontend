import Button from "@components/Globals/Button/Button";
import ErrorMessage from "@components/Globals/ErrorMessage";
import Logotype from "@components/Globals/Logotype";
import { API_URLS } from "@config";
import { getAccountDataWithURL, postPaywayAccount } from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { useSWRAuth } from "@hooks/useSWRAuth";
import { Formik, Form, Field } from "formik";
import { Key, useEffect, useState } from "react";

const { URL_USER_ACCOUNTS } = API_URLS;

interface AccountProp {
  amount: string;
  reason: string;
  publicKey: string;
  order: string;
}

interface AccountForm {
  account: string;
}

const initialValue: AccountForm = {
  account: "",
};

const Account = ({ order, amount, reason, publicKey }: AccountProp) => {
  const dataAccounts = useSWRAuth(URL_USER_ACCOUNTS, getAccountDataWithURL);
  const [sucessTransaction, setSucess] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [currentAccount, setcurrentAccount] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [messageError, setMessageError] = useState<any>();

  const postPayWayAccountOption = useFetchCallback(postPaywayAccount);

  useEffect(() => {
    if (dataAccounts.data && dataAccounts.data.results) {
      setAccounts(dataAccounts.data.results);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [dataAccounts]);

  useEffect(() => {
    if (accounts) {
      setcurrentAccount(accounts[0]);
    }
  }, [accounts]);

  const handleSubmit = async (data: AccountForm) => {
    setLoading(true);
    const pay = {
      order: order,
      key: publicKey,
      amount: amount,
      reason: reason,
      account: {
        number: data.account,
      },
    };
    try {
      await postPayWayAccountOption(pay);
      setSucess(true);
    } catch (e) {
      setMessageError(e);
      console.log("errores", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentcurrentAccount = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const findcurrentAccount = accounts.find(
      ({ id }) => e.target.value == id.toString()
    );
    if (findcurrentAccount) {
      setcurrentAccount(findcurrentAccount);
    }
  };
  return (
    <>
      <div className="rounded-2xl h-fit overflow-hidden shadow-lg p-4 md:p-8 w-full xl:w-7/12">
        <Logotype classnameBox="flex justify-center h-16" />
        <Formik
          initialValues={initialValue}
          onSubmit={(values: AccountForm) => {
            handleSubmit(values);
          }}
        >
          {({ handleChange }) => (
            <Form className="w-full p-4">
              <>
                <div>
                  <p className="text-darkprimary font-bold text-md uppercase">
                    Cuenta a debitar
                  </p>
                </div>
                <Field
                  as="select"
                  id="account"
                  className="shadow appearance-none border-gray-300 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="account"
                  onChange={(e: any) => {
                    handleChange(e);
                    handleCurrentcurrentAccount(e);
                  }}
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
                <p className="text-darkprimary mt-2">
                  Saldo disponible en:{" "}
                  <span className="text-gray-500">{currentAccount?.id}</span>
                </p>
                <ErrorMessage name="account.number" error={messageError} />
                <p className="text-xl my-2 mb-4">{`$${currentAccount?.balance}`}</p>
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
                    <p>Pay ${amount}</p>
                  </Button>
                </div>
              </>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Account;
