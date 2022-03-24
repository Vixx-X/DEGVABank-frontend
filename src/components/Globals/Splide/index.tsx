import { Splide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

interface SplideProps {
  options?: any;
  children: any;
}

const defaultOptions = {
  rewind: true,
  perPage: 1,
  perMove: 1,
  classes: {
    pagination: "splide__pagination",
  },
  gap: "1rem",
  width: "100%",
};

export default function SplideComponent({
  options = defaultOptions,
  children,
}: SplideProps) {
  // const mergedOptions = {
  //   ...defaultOptions,
  //   ...options,
  return <Splide options={options}>{children}</Splide>;
}
