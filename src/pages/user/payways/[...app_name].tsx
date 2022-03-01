import Button from "@components/Globals/Button/Button";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import PayWayForm from "@components/PayGateWay/Forms/payway";
import { API_URLS } from "@config";
import { getPaywayDataWithURL } from "@fetches/users";
import { useSWRAuth } from "@hooks/useSWRAuth";
import useToggle from "@hooks/useToggle";
import { makeUrl } from "@utils/makeUrl";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

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
  const router = useRouter();
  const { app_name } = router.query;
  const [editable, setEditable] = useToggle(false);

  // const dataPayway = useSWRAuth(URL_USER_PAYWAY_APPS, getListPaywayDataWithURL);

  const { data } = useSWRAuth(() => {
    if (!app_name || app_name?.length === 0) {
      return null;
    }
    return makeUrl(URL_USER_PAYWAY, { app_name: app_name[0] });
  }, getPaywayDataWithURL);

  const [messageError, setMessageError] = useState<any>();
  const [keys, setKeys] = useState(false);
  // const [currentkeys, setCurrentKeys] = useState(
  //   keys
  //     ? {
  //         private: "**********************************************************",
  //         public: "**********************************************************",
  //       }
  //     : { private: "", public: "" }
  // );

  // const handleSubmitPaywayKey = async () => {
  //   try {
  //     const ret = await postPaywayKeyOption();
  //     setCurrentKeys(ret);
  //     setKeys(true);
  //     setWarningAlert(true);
  //   } catch (e) {
  //     setMessageError(e);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  return (
    <MainLayout>
      <div className="sm:grid sm:grid-cols-2 sm:gap-x-8">
        <PayWayForm initialValue={data} editable={editable} />
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
