interface ErrorProps {
  name: string;
  error: any;
}

const ErrorMessage = ({ name, error }: ErrorProps) => {
  return (
    <>
      {error && error.info && error.info.detail && error.info.detail[name] && (
        <div className="bg-red-400 border border-red-700 w-full p-3 my-3 py-2 rounded-lg text-sm font-normal">
          <strong>Error: </strong>
          {error.info.detail[name].map((element: string, index: number) => (
            <span key={index}>{element}</span>
          ))}
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
