interface CalentarButtonProps {
  onchange: (date: string) => void;
}

const CalentarButton = ({ onchange }: CalentarButtonProps) => {
  const handleChangeCalendar = (e: any) => {
    const date = new Date(e.target.value);
    date.setDate(date.getDate() + 1);
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    onchange(`${year}-${month}-${day}`);
  };

  return (
    <input
      name="direction"
      className="shadow appearance-none rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="nacionality"
      type="date"
      placeholder="Dirección"
      onChange={handleChangeCalendar}
    />
  );
};

export default CalentarButton;
