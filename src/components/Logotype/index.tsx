import { LogoSvg } from "@public/assets/imagesSvg";

interface LogotypeProps {
  mode?: string;
  classnameText?: string;
  classnameBox?: string;
  sizeTitle?: string;
  sizeSubTitle?: string;
  textLogo?: boolean;
}

const Logotype = ({
  mode = "dark",
  classnameBox = "h-16",
  classnameText,
  sizeTitle = "text-4xl",
  sizeSubTitle = "text-xl",
  textLogo = true,
}: LogotypeProps) => {
  return (
    <div className={`flex ${classnameBox}`}>
      {textLogo && <LogoSvg />}
      <div className={classnameText}>
        <p className={`font-montserrat ${sizeTitle} uppercase text-${mode}`}>
          Degva
        </p>
        <p
          className={`font-montserrat ${sizeSubTitle} uppercase font-extralight italic tracking-[.3em] text-center text-${mode}`}
        >
          Bank
        </p>
      </div>
    </div>
  );
};

export default Logotype;
