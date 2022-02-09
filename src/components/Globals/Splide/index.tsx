import { Splide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

interface SplideProps {
  options?: any;
  children: JSX.Element;
}

const defaultOptions = {
  rewind: true,
  perPage: 3,
  perMove: 1,
  classes: {
    pagination: "splide__pagination",
  },
  breakpoints: {
    960: {
      perPage: 3,
    },
    1250: {
      perPage: 2,
    },
    600: {
      perPage: 2,
    },
    530: {
      perPage: 1,
      fixedWidth: "20rem",
      padding: {
        right: "16rem",
        bottom: "16rem",
      },
      type: "loop",
      arrows: false,
    },
  },
  gap: "1rem",
  width: "100%",
};

export default function SplideComponent({ options, children }: SplideProps) {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };
  return (
    <Splide options={mergedOptions} className="mb-8">
      {children}
    </Splide>
  );
}
