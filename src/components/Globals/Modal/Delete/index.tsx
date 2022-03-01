import Button from "@components/Globals/Button/Button";
import { deletePayway } from "@fetches/users";
import { Dialog, Transition } from "@headlessui/react";
import { useFetchCallback } from "@hooks/useFetchCallback";
import { Fragment, useCallback } from "react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: any;
  payWay: string;
  submitCallback?: Function;
}

export default function DeleteModal({
  isOpen,
  setIsOpen,
  payWay,
  submitCallback,
}: ModalProps) {
  const deleteOption = useFetchCallback(deletePayway);

  const deletePayWay = useCallback(() => {
    deleteOption(payWay);
    setIsOpen(false);
  }, [payWay, deleteOption, setIsOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setIsOpen}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  ¿Está seguro de eliminar la pasarela de pago {payWay} ?
                </Dialog.Title>

                <div className="mt-4 flex justify-around">
                  <Button
                    onClick={() => {
                      deletePayWay();
                      submitCallback?.();
                      setIsOpen(false);
                    }}
                  >
                    <>Aceptar</>
                  </Button>
                  <Button onClick={setIsOpen}>
                    <>Cancelar</>
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
