import ExperienceCard from "./experienceCard";
import {  BaseComponentProps, EditableComponent, ImageProp, StandardText } from "@/types";



export interface ExperienceCardProps extends Omit<Partial<BaseComponentProps>, 'array'> {
  images?: {
    main?: ImageProp;
  };
  reverse?: boolean;
  // Redefine `array` with `description` omitted from StandardText
  array?: (Omit<StandardText, "description">)[];
}

export const defaultExperienceCardProps: Required<Omit<ExperienceCardProps, 'array' | 'reverse'>> & { array: (Omit<StandardText, "description">)[] } = {
  textColor: "#1f2937",
  baseBgColor: "#f0f9ff",
  mainColor: "#3B82F6",
  bgLayout: {
    type: "radial",
    radialSize: "125% 125%",
    radialPosition: "50% 0%",
    radialBaseStop: 50,
  } as const,
  title: "Welcome Section",
  subTitle: "Get to Know Me",
  description: "This is where you can introduce yourself a bit more, share a snapshot of who you are, and display some quick facts or highlights about your experience.",
  buttonText: "Discover More",
  images: {
    main: {
      src: "/placeholder.webp",
      alt: "Intro Placeholder Image",
    },
  },
  array: [
    { type: "StandardText", title: "Quick Fact One" },
    { type: "StandardText", title: "Quick Fact Two" },
    { type: "StandardText", title: "Quick Fact Three" },
  ],

};

