interface ButtonProps {
  className?: string;
  [key: string]: any;
  children?: JSX.Element[] | JSX.Element;
}

const Button = ({ className, children, ...props }: ButtonProps) => {
  
  return (
    <button
      className={
        className ??
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;