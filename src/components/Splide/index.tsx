import { Splide, SplideSlide } from "splide-nextjs/react-splide";
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css";

interface SplideProps {
  options: any;
  Item: JSX.Element;
  itemProps: any;
}

const options = {
  rewind: true,
  perPage: 3,
  perMove: 1,
  classes: {
    pagination: `splide__pagination ${classes.bottomSplide}`,
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

export default function SplideComponent({ options, Item, itemProps } : SplideProps) {
  return (
    <Splide options={options} className="mb-8">
      {itemProps.map(({ id }, index: number) => {
        return (
          <SplideSlide className="p-4" key={index}>
            <Item {...itemProps[index]} />
          </SplideSlide>
        );
      })}
    </Splide>
  );
}
