interface ErrorProps {
  name: string;
  error: any;
  embed?: boolean;
}

const ErrorMessage = ({ name, error, embed = false }: ErrorProps) => {
  const obj = embed ? name.split(".")[0] : name;
  const obj2: string | null = embed ? name.split(".")[1] : null;
  console.log("Name",obj)
  return (
    <>
      {error && error.info && error.info && error.info.detail && error.info.detail[obj] &&(
        <div className="bg-red-400 border border-red-700 w-full p-3 my-3 py-2 rounded-lg text-sm font-normal">
          <strong>Error: </strong>
          {!obj2
            ? error.info.detail[obj].map((element: string, index: number) => (
                <span key={index}>{element}</span>
              ))
            : error.info.detail[obj][obj2].map(
                (element: string, index: number) => (
                  <span key={index}>{element}</span>
                )
              )}
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
