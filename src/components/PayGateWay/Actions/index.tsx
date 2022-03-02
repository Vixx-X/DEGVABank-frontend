import DeleteModal from "@components/Globals/Modal/Delete";
import { SERVER_URLS } from "@config";
import useToggle from "@hooks/useToggle";
import { makeUrl } from "@utils/makeUrl";
import Link from "next/link";

const { URL_USER_PAYWAY_APP } = SERVER_URLS;
interface ActionProp {
  appId: string;
  onDelete?: Function;
}

const Actions = ({ appId, onDelete }: ActionProp) => {
  const [openModal, toggleModal] = useToggle(false);
  return (
    <>
      <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap">
        <Link
          href={makeUrl(URL_USER_PAYWAY_APP, {
            app_id: appId,
            editable: "editable",
          })}
        >
          <a className="text-indigo-600 hover:text-indigo-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </a>
        </Link>
      </td>
      <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap">
        <Link href={makeUrl(URL_USER_PAYWAY_APP, { app_id: appId })}>
          <a className="text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </a>
        </Link>
      </td>
      <td className="text-sm font-medium leading-5 whitespace-no-wrap">
        <button onClick={toggleModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-red-600 hover:text-red-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
      <DeleteModal
        isOpen={openModal}
        setIsOpen={toggleModal}
        payWay={appId}
        submitCallback={onDelete}
      />
    </>
  );
};

export default Actions;