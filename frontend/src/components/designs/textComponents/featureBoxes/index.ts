// components/featureBoxes/index.ts
import FeatureBoxes from "./featureBoxes";
import {  BaseComponentProps, EditableComponent, ImageProp } from "@/types";



export interface FeatureBoxesProps extends Partial<BaseComponentProps> {
  real?:boolean
  // Uses array from BaseComponentProps for feature boxes (title/description)
  // Uses images from BaseComponentProps, keyed by index (e.g., "0", "1", "2")
}

export const defaultFeatureBoxesProps: Required<Omit<FeatureBoxesProps, 'array' | 'images'>> & { 
  array: Array<{ title: string; description: string }>;
  images: Record<string, ImageProp>;
} = {
  textColor: "#1f2937",
  baseBgColor: "#f0f9ff",
  mainColor: "#3B82F6",
  bgLayout: {
    type: "radial" as const,
    radialSize: "125% 125%",
    radialPosition: "50% 0%",
    radialBaseStop: 50,
  },
  title: "Our Features",
  description: "Discover what makes us different and how we can help you achieve your goals.",
  subTitle: "",
  buttonText: "",
  array: [
    {
      title: "Feature One",
      description: "This is a description for the first feature box. It highlights a key benefit or capability.",
    },
    {
      title: "Feature Two",
      description: "This is a description for the second feature box. It showcases another important aspect.",
    },
    {
      title: "Feature Three",
      description: "This is a description for the third feature box. It demonstrates additional value.",
    },
    {
      title: "Feature Four",
      description: "This is a description for the fourth feature box. It presents another key feature.",
    },
  ],
  images: {
    "0": { src: "/placeholder.webp", alt: "Feature One" },
    "1": { src: "/placeholder.webp", alt: "Feature Two" },
    "2": { src: "/placeholder.webp", alt: "Feature Three" },
    "3": { src: "/placeholder.webp", alt: "Feature Four" },
  },
  real:true
 
};


