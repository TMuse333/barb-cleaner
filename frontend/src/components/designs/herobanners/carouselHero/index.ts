import CarouselHero from "./carouselHero";
import {  BaseComponentProps, EditableComponent, ImageProp, CarouselItem } from "@/types";



export interface CarouselHeroProps extends Partial<BaseComponentProps> {
  items?: CarouselItem[];
}

export const defaultCarouselHeroProps: Required<Omit<CarouselHeroProps, 'items'>> & { items: CarouselItem[] } = {
  textColor: "#1f2937",
  baseBgColor: "#f0f9ff",
  mainColor: "#3B82F6",
  bgLayout: {
    type: "radial",
    radialSize: "125% 125%",
    radialPosition: "50% 0%",
    radialBaseStop: 50,
  } as const,
  title: "Your Carousel Hero",
  description: "This is a carousel hero component with images and descriptions.",
  subTitle: "Welcome",
  buttonText: "Get Started",
  array: [],
  images: {},
  items: [
    { image: { src: "/placeholder.webp", alt: "Slide 1" }, description: "First slide description" },
    { image: { src: "/placeholder.webp", alt: "Slide 2" }, description: "Second slide description" },
  ],
};


