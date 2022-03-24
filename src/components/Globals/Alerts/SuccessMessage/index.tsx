interface SuccessMessage {
  children: JSX.Element[] | JSX.Element | string;
}

const ErrorMessage = ({ children }: SuccessMessage) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
      role="alert"
    >
      {children}
    </div>
  );
};

export default ErrorMessage;
