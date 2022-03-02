import Button from "@components/Globals/Button/Button";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import Loading from "@components/Globals/Loading";
import PayWayForm from "@components/PayGateWay/Forms/payway";
import { API_URLS, SERVER_URLS } from "@config";
import { getPaywayDataWithURL, postPaywayKey } from "@fetches/users";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { useSWRAuth } from "@hooks/useSWRAuth";
import useToggle from "@hooks/useToggle";
import { makeUrl } from "@utils/makeUrl";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const { URL_USER_PAYWAY_APP } = API_URLS;
const { URL_USER_PAYWAY_APPS } = SERVER_URLS;
const HIDDEN_KEY = "****************";

const PasarelaOptions: NextPage = () => {
  const router = useRouter();
  const { app_id } = router.query;
  const [editable, setEditable] = useToggle(!!router.query?.editable ?? false);

  const { data, error } = useSWRAuth(
    makeUrl(URL_USER_PAYWAY_APP, { app_id: app_id as string }),
    getPaywayDataWithURL
  );
  const isLoading = useMemo(() => !data && !error, [data, error]);

  const Keys = ({ appId }: any) => {
    const renewKey = useFetchCallback(postPaywayKey);
    const [currentkeys, setCurrentKeys] = useState({
      public: HIDDEN_KEY,
      private: HIDDEN_KEY,
    });
    const [warningAlert, setWarningAlert] = useState<boolean>(false);
    return (
      <div>
        <div>
          <label className="text-darkprimary font-bold uppercase">
            Generar llave publica y privada
          </label>
        </div>
        <>
          <label className="block text-sm xl:text-md pt-5 font-bold mb-2 text-dark">
            Clave privada
          </label>

          <p>{currentkeys?.private}</p>

          <label className="block text-sm xl:text-md pt-5 font-bold mb-2 text-dark">
            Clave pública
          </label>
          <p>{currentkeys?.public}</p>
        </>

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
                <span className="font-medium">Alerta!</span> Guarde ambas claves
                porque no volverán a aparecer completas. De necesitarlo podrá
                volver a generarla
              </div>
            </div>
          )}
          <Button
            className=" w-full md:w-60 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={async () => {
              setCurrentKeys(await renewKey(appId));
              setWarningAlert(true);
            }}
          >
            <p>Generar</p>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <MainLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!editable && (
            <div className="flex justify-end">
              <Button onClick={() => setEditable?.(true)}>Edit</Button>
            </div>
          )}
          <div className="sm:grid sm:gap-x-8 divide-y">
            <PayWayForm
              initialValue={data}
              editable={editable}
              submitCallback={() => setEditable(false)}
              setEditable={setEditable}
            />
            <div className="mt-8 pt-8">
              <Keys appId={app_id} />
            </div>
          </div>
          <div className="w-full flex justify-center text-center mt-16">
            <Link href={URL_USER_PAYWAY_APPS}>
              <a className="w-full md:w-60 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                <span>Volver</span>
              </a>
            </Link>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default PasarelaOptions;
