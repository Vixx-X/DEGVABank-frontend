import { useState } from "react";

const arrayBills = [
  {
    id: "013400000000002091933",
    tipo: "Ahorro",
    saldo: 32.7,
    fecha: new Date(),
  },
  {
    id: "013400000000002091934",
    tipo: "Ahorro",
    saldo: 0.0,
    fecha: new Date(),
  },
  {
    id: "013400000000002091933",
    tipo: "Ahorro",
    saldo: 32.7,
    fecha: new Date(),
  },
  {
    id: "013400005500002091933",
    tipo: "Corriente",
    saldo: 17.7,
    fecha: new Date(),
  },
];

const CardBill = () => {
  const [bill, setbill] = useState(arrayBills[0]);

  const handleCurrentBill = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const findBill = arrayBills.find(({ id }) => e.target.value == id);
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
          <option selected disabled>
            --Seleccionar--
          </option>
          {arrayBills.map(({ id, tipo }) => (
            <option key={id} value={id}>
              {`Cuenta de ${tipo} : ${id}`}
            </option>
          ))}
        </select>
        <p className="text-darkprimary mt-6">
          Saldo disponible: <span className="text-gray-500">{bill.id}</span>
        </p>
        <p className="text-4xl mt-2">{`$${bill.saldo}`}</p>
      </div>
    </>
  );
};

export default CardBill;
