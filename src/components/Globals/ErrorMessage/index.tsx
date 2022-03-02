interface ErrorProps {
  name: string;
  error: any;
  embed?: boolean;
}

const ErrorMessage = ({ name, error, embed = false }: ErrorProps) => {
  const obj = (embed) ? name.split(".")[0] : name;
  // const let : string| (embed) ? name.split(".")[1] : null;
  return (
    <>
      {error && error.info && error.info.detail && error.info.detail[obj] && (
        <div className="bg-red-400 border border-red-700 w-full p-3 my-3 py-2 rounded-lg text-sm font-normal">
          <strong>Error: </strong>
          {error.info.detail[obj].map((element: string, index: number) => (
            <span key={index}>{element}</span>
          ))}
        </div>
      )}
    </>

    
  );
};

export default ErrorMessage;
