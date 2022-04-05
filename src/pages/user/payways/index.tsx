import Button from "@components/Globals/Button/Button";
import DataTable from "@components/Globals/DataTable";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import Loading from "@components/Globals/Loading";
import Modal from "@components/Globals/Modal";
import Actions from "@components/PayGateWay/Actions";
import PayWayForm from "@components/PayGateWay/Forms/payway";
import { API_URLS } from "@config";
import { getListPaywayDataWithURL } from "@fetches/users";
import { useSWRAuth } from "@hooks/useSWRAuth";
import useToggle from "@hooks/useToggle";
import { makeUrl } from "@utils/makeUrl";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const { URL_USER_PAYWAY_APPS } = API_URLS;

const HEADERS = {
  app_name: "app name",
  transactions: "transactions",
  public: "public key",
  private: "private key",
  date_created: "created date",
  action: "action",
};

const PasarelaOptions: NextPage = () => {
  const router = useRouter();
  const page = parseInt((router?.query?.page as string) ?? 1, 10);

  const paramsURL: any = {};

  const { data, error, mutate } = useSWRAuth(
    makeUrl(URL_USER_PAYWAY_APPS, { ...paramsURL, offset: (page - 1) * 10 }),
    getListPaywayDataWithURL
  );

  const [payWays, setPayWays] = useState<any[]>([]);

  const loading = useMemo(() => !data && !error, [data, error]);

  useEffect(() => {
    if (!data) return;
    setPayWays(
      data.map((item: any) => {
        return {
          ...item,
          public: item?.api_keys?.public ?? "Never created",
          private: item?.api_keys?.private ?? "Never created",
          date_created: new Date(item.date_created).toLocaleString(),
          action: <Actions appId={item.app_id} onDelete={() => mutate()} />,
        };
      })
    );
  }, [data, mutate]);

  const [openModal, toggleModal] = useToggle(false);

  return (
    <MainLayout>
      <>
        <div className="flex justify-start w-full">
          <Button id="create-modal" onClick={toggleModal}>
            Crear pasarela
          </Button>
        </div>
        <div className="mt-8">
          {loading ? (
            <Loading />
          ) : payWays?.length > 0 ? (
            <div className="w-full">
              <DataTable headers={HEADERS} items={payWays} />
              <div className="mt-3 w-full flex justify-end gap-2">
                {page > 1 && (
                  <div className="justify-self-start">
                    <Link passHref href={`?page=${page - 1}`}>
                      <Button>Anterior</Button>
                    </Link>
                  </div>
                )}
                {page < data.count / 10 && (
                  <div className="justify-self-end">
                    <Link passHref href={`?page=${page + 1}`}>
                      <Button>Siguiente</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>
              {" "}
              No posee ninguna pasarela con nosotros, creala{" "}
              <Link href="#create-modal">aquí</Link>.
            </p>
          )}
        </div>
        <Modal isOpen={openModal} setIsOpen={toggleModal}>
          <PayWayForm
            editable
            submitCallback={() => {
              toggleModal(false);
              mutate();
            }}
          />
        </Modal>
      </>
    </MainLayout>
  );
};

export default PasarelaOptions;
