import { useState } from "react";

interface InputImageProps {
  initialImage: string;
}

const InputImage = ({ initialImage }: InputImageProps) => {
  const [image, setImage] = useState(initialImage);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log("Imagen!", URL.createObjectURL(event.target.files[0]));
      setImage(URL.createObjectURL(event.target.files[0]));
    }
    return;
  };

  return (
    <div className="flex-col content-center">
      <img
        className="rounded-[50%] w-[6em] h-[6em] m-1"
        src={image}
        alt="preview image"
      ></img>
      <label htmlFor="imageInput" className="cursor-pointer text-primary">
        Editar Foto
      </label>
      <input
        onChange={handleChange}
        id="imageInput"
        type="file"
        className="hidden"
      ></input>
    </div>
  );
};

export default InputImage;
