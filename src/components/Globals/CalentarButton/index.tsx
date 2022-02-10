interface CalentarButtonProps{
    onchange : (date:string)=>void
}

const CalentarButton = ({onchange}:CalentarButtonProps) => {

    const handleChangeCalendar=(e : any)=>{
        console.log(e.target.value)
        onchange(e.target.value)
    }

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
