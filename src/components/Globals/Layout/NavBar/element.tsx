import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface elementProps {
  icon?: any;
  link: string;
  text: string;
  activate: boolean;
}

const ElementNavBar = ({ icon, link, text, activate }: elementProps) => {
  const className = activate ? "bg-white/20" : " hover:bg-white/20";
  return (
    <Link href={link}>
      <a
        className={`h-full md:min-w-[8rem] flex items-center justify-center transition rounded ${className} px-3`}
      >
        <div className="flex flex-col justify-center items-center">
          <FontAwesomeIcon
            icon={icon}
            color="white"
            className="text-2xl md:text-4xl"
          />
          <p className="hidden md:block text-light">{text}</p>
        </div>
      </a>
    </Link>
  );
};

export default ElementNavBar;
