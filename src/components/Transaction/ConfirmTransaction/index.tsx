import Button from "@components/Globals/Button/Button";

interface ConfirmTrasactionProps {
  value: any;
  onSubmit: (TransferData: any) => void;
  onCancel: () => void;
}

const HEADERS = [
  { value: "name", name: "Nombre" },
  { value: "lastname", name: "Apellido" },
  { value: "account_dest", name: "Cuenta Destino" },
  { value: "account_src", name: "Cuenta Origen" },
  { value: "amount", name: "Cantidad" },
  { value: "email", name: "Correo Electronico" },
  { value: "reason", name: "Razon" },
];

const ConfirmTrasaction = ({
  value,
  onSubmit,
  onCancel,
}: ConfirmTrasactionProps) => {
  const handleSubmit = () => {
    console.log("Me hicieron click", value);
    onSubmit(value);
  };

  return (
    <div className="w-full">
      <p className="text-darkprimary py-3 font-bold text-md uppercase">
        CONFIRMACION DE PAGO
      </p>
      <div className="w-full border">
        {HEADERS.map((item: any, index: number) => {
          return (
            <div className="flex border w-full  font-montserrat" key={index}>
              <div className="py-3 w-1/2 text-darkprimary ">
                <p className="px-5 text-left">{item.name}</p>
              </div>
              <div className="py-3 w-1/2 text-dark ">
                <p className="px-5 text-left">{value[item.value]}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center gap-x-6 mt-5">
        <Button
          className="w-full md:w-60 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={onCancel}
        >
          <p>Cancelar</p>
        </Button>
        <Button
          onClick={handleSubmit}
          className=" w-full md:w-60 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          <p>Aceptar</p>
        </Button>

        <div className="mx-2 my-3"></div>
      </div>
    </div>
  );
};

export default ConfirmTrasaction;
