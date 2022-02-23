import Button from "@components/Globals/Button/Button";

interface ConfirmTrasactionProps {
  headers: any[];
  value: any[];
}

const ConfirmTrasaction = ({ headers, value }: ConfirmTrasactionProps) => {
  console.log(headers);

  return (
    <div className="w-full">
      <div className="w-full border">
        {headers.map((item: any, index: number) => {
          return (
            <div
              className="flex border w-full  font-montserrat"
              key={index}
            >
              <div className="py-3 w-1/2 text-darkprimary ">
                <p className="px-5 text-left">{item}</p>
              </div>
              <div className="py-3 w-1/2 text-dark ">
                <p className="px-5 text-left">{value[index]}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center">
        <div className="mx-2 my-3">
          <Button>
            <p>Aceptar</p>
          </Button>
        </div>
        <div className="mx-2 my-3">
          <Button>
            <p>Cancelar</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTrasaction;
