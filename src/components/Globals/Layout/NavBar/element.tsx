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
        className={`h-full px-4 md:px-12 flex items-center transition rounded ${className}`}
      >
        <div className="flex flex-col justify-center items-center">
          <FontAwesomeIcon icon={icon} color="white" size="2x" />
          <p className="hidden md:block text-light">{text}</p>
        </div>
      </a>
    </Link>
  );
};

export default ElementNavBar;
