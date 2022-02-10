import { useState } from "react";

interface Bill{
  id:number,
  status:string,
  type:string,
  balance:string,
  creation_date:string,
  user:number
}
interface CardBillProps{
  ITEMS_BILLS: Bill[]
}

const CardBill = ({ITEMS_BILLS}:CardBillProps) => {
  const [bill, setbill] = useState(ITEMS_BILLS[0]);

  const handleCurrentBill = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const findBill = ITEMS_BILLS.find(({ id }) => e.target.value == id.toString());
    if (findBill) {
      setbill(findBill);
    }
  };
  return (
    <>
      <div className="rounded-2xl w-full overflow-hidden shadow-lg p-8">
        <label
          className="text-darkprimary font-bold uppercase"
          htmlFor="idBill"
        >
          Cuentas
        </label>
        <select
          id="idBill"
          className="form-select appearance-none block w-full px-3 py-2 text-base font-normal text-gray-500 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-4"
          onChange={handleCurrentBill}
          value={bill.id}
        >
          <option disabled>
            --Seleccionar--
          </option>
          {ITEMS_BILLS.map(({ id, type }, index) => (
            <option key={index} value={id}>
              {`Cuenta de ${type} : ${id}`}
            </option>
          ))}
        </select>
        <p className="text-darkprimary mt-6">
          Saldo disponible: <span className="text-gray-500">{bill.id}</span>
        </p>
        <p className="text-4xl mt-2">{`$${bill.balance}`}</p>
      </div>
    </>
  );
};

export default CardBill;
