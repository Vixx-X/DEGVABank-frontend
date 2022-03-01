import Button from "@components/Globals/Button/Button";
import MainLayout from "@components/Globals/Layout/MainLayout/Basic";
import Loading from "@components/Globals/Loading";
import Modal from "@components/Globals/Modal";
import Actions from "@components/PayGateWay/Actions";
import DataTable from "@components/PayGateWay/DataTable";
import PayWayForm from "@components/PayGateWay/Forms/payway";
import { API_URLS } from "@config";
import { getListPaywayDataWithURL } from "@fetches/users";
import { useSWRAuth } from "@hooks/useSWRAuth";
import useToggle from "@hooks/useToggle";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const { URL_USER_PAYWAY_APPS } = API_URLS;

const HEADERS = {
  id: "id",
  app_name: "app name",
  date_created: "created date",
  action: "action",
};

const PasarelaOptions: NextPage = () => {
  const { data, error, mutate } = useSWRAuth(
    URL_USER_PAYWAY_APPS,
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
          action: <Actions appName={item.app_name} onDelete={() => mutate()} />,
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
          {!loading ? (
            payWays?.length > 0 ? (
              <>
                <p className="text-darkprimary font-bold uppercase my-4">
                  Lista de pasarela de pago habilitadas
                </p>
                <DataTable headers={HEADERS} items={payWays} />
              </>
            ) : (
              <p>
                {" "}
                No posee ninguna pasarela con nosotros, creala{" "}
                <Link href="#create-modal">aquí</Link>.
              </p>
            )
          ) : (
            <Loading />
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
