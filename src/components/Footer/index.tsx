interface FooterProps {
  mode?: string;
  classname?: string;
}

const Footer = ({ mode = "light", classname }: FooterProps) => {
  return (
    <footer className={`bg-${mode} w-full ${classname} shadow-inner `}>
      <div className="xl:w-[70rem] max-w-[90%] mx-auto py-6 flex justify-center items-center text-white">
        <p className="font-montserrat">Copyright @ Degva Bank</p>
      </div>
    </footer>
  );
};

export default Footer;

