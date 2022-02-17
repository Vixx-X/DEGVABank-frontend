import Logotype from "../Logotype";

const Loading = () => {
  return (
    <div className="absolute flex flex-col w-full h-full top-0 left-0 w-full bg-black/10 items-center justify-center">
      <div>
        <Logotype
          sizeTitle="text-4xl"
          classnameText="hidden md:block"
          classnameBox="h-12 md:h-16"
        />
      </div>
      <div className="relative w-96 bg-gray-200 rounded mt-4">
        <div className="w-full absolute top-0 h-4 rounded shim-blue"></div>
      </div>
    </div>
  );
};

export default Loading;
