import ErrorMessage from "@components/Globals/Alerts/ErrorMessage";
import Button from "@components/Globals/Button/Button";
import { UserContext } from "@contexts/UserContext";
import { postTransferUser } from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { Formik, Form, Field } from "formik";
import { Key, useContext, useEffect, useState } from "react";

interface PayCreditCardProps {
  amount: string;
  accounts: any;
  currentCard: any;
}

interface AccountForm {
  account: string;
}

const PayCreditCardForm = ({
  amount,
  accounts,
  currentCard,
}: PayCreditCardProps) => {
  const [sucessTransaction, setSucess] = useState<boolean>(false);
  const [currentAccount, setCurrentAccount] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState<any>();
  const postTransfer = useFetchCallback(postTransferUser);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (accounts) {
      setCurrentAccount(accounts[0]);
    }
  }, [accounts]);

  const handleSubmit = async (data: AccountForm) => {
    setLoading(true);

    const transfer = {
      acc_src: {
        number: data.account,
        document_id: user.document_id,
      },
      card_dst: {
        number: currentCard.number,
        security_code: currentCard.security_code,
        expiration_date: currentCard.expiration_date,
        document_id: user.document_id,
      },
      amount: amount,
      reason: `pago tarjeta ${currentCard.number}`,
    };
    try {
      await postTransfer(transfer);
      setSucess(true);
    } catch (e) {
      setMessageError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentAccount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const findcurrentAccount = accounts.find(
      ({ id }: any) => e.target.value == id.toString()
    );
    if (findcurrentAccount) {
      setCurrentAccount(findcurrentAccount);
    }
  };

  return (
    <Formik
      initialValues={{ account: accounts[0].id }}
      onSubmit={(values: AccountForm) => {
        handleSubmit(values);
      }}
    >
      {({ handleChange }) => (
        <Form className="w-full p-4">
          <>
            <h3 className="text-darkprimary font-bold uppercase">
              Pagar tarjeta
            </h3>
            <p className="my-2 text-darkprimary">
              Tarjeta a pagar:{" "}
              <span className="mr-2 text-red-600 font-normal text-lg ">
                {currentCard.number}
              </span>
            </p>

            <div>
              <p className="text-darkprimary text-md">Cuenta a debitar:</p>
            </div>
            <Field
              as="select"
              id="account"
              className="shadow appearance-none border-gray-300 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="account"
              onChange={(e: any) => {
                handleChange(e);
                handleCurrentAccount(e);
              }}
            >
              {accounts &&
                accounts.map(
                  ({ id, type }: any, index: Key | null | undefined) => (
                    <option key={index} value={id}>
                      {`Cuenta de ${type} : ${id}`}
                    </option>
                  )
                )}
            </Field>
            {currentAccount ? (
              <>
                <p className="text-darkprimary mt-2">
                  Saldo disponible en:{" "}
                  <span className="text-gray-500">{currentAccount.id}</span>
                </p>
                <p className="text-xl my-2 mb-4">{`$${currentAccount.balance}`}</p>
              </>
            ) : (
              <p className="text-gray-400 my-4 italic">
                Por favor seleccionar una cuenta de donde debitar
              </p>
            )}
            <ErrorMessage name="source" error={messageError} />
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
                className="bg-primary hover:bg-blue-700 text-white font-semibold py-2 rounded w-full"
              >
                <p>Pagar ${amount}</p>
              </Button>
            </div>
          </>
        </Form>
      )}
    </Formik>
  );
};

export default PayCreditCardForm;
