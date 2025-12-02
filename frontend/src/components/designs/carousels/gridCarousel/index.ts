import { BaseComponentProps,  EditableComponent, CarouselItem } from "@/types";
import GridCarousel from "./gridCarousel";


export interface GridCarouselProps extends Partial<BaseComponentProps> {
  items?: CarouselItem[];
}

export const defaultGridCarouselProps: Required<Omit<GridCarouselProps, 'items'>> & { items: CarouselItem[] } = {
  textColor: "#1f2937",
  baseBgColor: "#f0f9ff",
  mainColor: "#3B82F6",
  bgLayout: {
    type: "radial",
    radialSize: "125% 125%",
    radialPosition: "50% 0%",
    radialBaseStop: 50,
  } as const,
  title: "This is where you can display your best work or services in a grid format",
  description: "This is a description for the grid carousel section. It provides additional information that can be expanded when clicked.",
  subTitle: "",
  buttonText: "",
  array: [],
  images: {},
  items: [
    {
      image: { src: "/placeholder.webp", alt: "Image 1" },
    },
    {
      image: { src: "/placeholder.webp", alt: "Image 2" },
    },
    {
      image: { src: "/placeholder.webp", alt: "Image 3" },
    },
    {
      image: { src: "/placeholder.webp", alt: "Image 4" },
    },
  ],
};

