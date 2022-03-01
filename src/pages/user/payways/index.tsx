import Button from "@components/Globals/Button/Button";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import Loading from "@components/Globals/Loading";
import DataTable from "@components/PayGateWay/DataTable";
import { API_URLS } from "@config";
import {
  deletePayway,
  getAccountDataWithURL,
  getListPaywayDataWithURL,
  postPayway,
  postPaywayKey,
} from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { useSWRAuth } from "@hooks/useSWRAuth";
import type { NextPage } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";

const { URL_USER_ACCOUNTS, URL_USER_PAYWAY, URL_USER_PAYWAY_APPS } = API_URLS;
const { URL_USER_TRANSACTIONS } = API_URLS;

const HEADERS = [
  { name: "id", value: "id" },
  { name: "title", value: "title" },
  { name: "action", value: "action" },
];

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
  const dataPayway = useSWRAuth(URL_USER_PAYWAY_APPS, getListPaywayDataWithURL);
  const [payWay, setPayWay] = useState<any>();
  const [payWays, setPayWays] = useState<any>();
  const [messageError, setMessageError] = useState<any>();
  const [warningAlert, setWarningAlert] = useState<boolean>(false);
  const [keys, setKeys] = useState(false);
  const [currentkeys, setCurrentKeys] = useState(
    keys
      ? {
          private: "**********************************************************",
          public: "**********************************************************",
        }
      : { private: "", public: "" }
  );

  const deleteOption = useFetchCallback(deletePayway);
  
 const deletePayWay  = useCallback(
   () => {
    deleteOption(payWay.app_name)
   },
   [payWay],
 )

  const loading = useMemo(
    () => !dataPayway.data && !dataPayway.error,
    [dataPayway.data, dataPayway.error]
  );

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

  return (
    <MainLayout>
      <>
        <Button>
          <>Crear una nueva Pasarela</>
        </Button>
        <div className="flex justify-center">
          {!loading ? (
            payWay?.length > 0 ? (
              <DataTable headers={HEADERS} items={payWay} />
            ) : (
              <p> No hay movimientos.</p>
            )
          ) : (
            <Loading />
          )}
        </div>
      </>
    </MainLayout>
  );
};

export default PasarelaOptions;
