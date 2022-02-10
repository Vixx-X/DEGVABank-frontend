import Link from "next/link";

interface elementProps {
  link?: string;
  text: string;
  className?: string;
}

const SideBarOption = ({ link = "/", text, className }: elementProps) => {
  return (
    <li className="relative">
      <Link href={link}>
        <a
          className={`flex items-center text-sm overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out ${className}`}
          data-mdb-ripple="true"
          data-mdb-ripple-color="primary"
        >
          <span>{text}</span>
        </a>
      </Link>
    </li>
  );
};

export default SideBarOption;
