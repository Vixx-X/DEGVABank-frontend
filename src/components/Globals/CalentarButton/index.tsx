import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CalentarButtonProps {
  onchange: (date: string) => void;
  id: number;
}

const CalentarButton = ({ onchange, id }: CalentarButtonProps) => {
  const handleChangeCalendar = (e: any) => {
    const date = new Date(e.target.value);
    date.setDate(date.getDate() + 1);
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    onchange(`${year}-${month}-${day}`);
  };

  return (
    <div className=" relative shadow appearance-none rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      <input
        name="direction"
        id={`date${id}`}
        type="date"
        placeholder="Dirección"
        className="border-none focus:border-none activate:border-none pr-5 text-xs sm:text-base"
        onChange={handleChangeCalendar}
      />
      <label
        htmlFor={`date${id}`}
        className="absolute cursor-pointer h-full items-center flex right-5 top-0 z-[-1]"
      >
        <FontAwesomeIcon icon={faCalendarDay} />
      </label>
    </div>
  );
};

export default CalentarButton;
