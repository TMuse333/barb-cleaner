// components/textAndList/index.ts
import TextAndList from "./textAndList";
import {  BaseComponentProps, EditableComponent, ImageProp } from "@/types";



export const defaultTextAndListProps = {
  subTitle: "Introducing the Text and List Component",
  title: "What This Section Can Showcase",
  images: {
    main: {
      src: "/placeholder.webp",
      alt: "placeholder",
    } as ImageProp,
  },
  description: "Use this component to highlight key points, features, or benefits in a clear and engaging way. Combine a short intro paragraph with a supporting image and a structured list to communicate value effectively.",
  textArray: [
    {
      title: "Data-Backed Highlights",
      description: "Display information supported by facts, numbers, or research to add credibility and help viewers make informed decisions.",
    },
    {
      title: "Personalized Messaging",
      description: "Present points that connect emotionally or logically with your audience, using a tone that matches your brand’s personality.",
    },
    {
      title: "Strategic Structure",
      description: "Organize details into concise, scannable blocks so readers can easily follow and absorb your main ideas.",
    },
    {
      title: "Multilingual Flexibility",
      description: "Adapt your content for multiple languages to reach broader audiences while keeping formatting and style consistent.",
    },
    {
      title: "Global-Friendly Design",
      description: "Showcase diverse experiences, services, or features with a layout that supports cultural adaptability and inclusive presentation.",
    },
  ],
  textColor: "#1f2937",
  baseBgColor: "#f0f9ff",
  mainColor: "#3B82F6",
  bgLayout: {
    type: "radial" as const,
    radialSize: "125% 125%",
    radialPosition: "50% 0%",
    radialBaseStop: 50,
  },
  items: [],
  array: [],
} 

export interface TextAndListProps extends Partial<BaseComponentProps> {
  subTitle?: string;
  title?: string;
  images?: {
    main?: ImageProp;
  };
  description?: string;
  textArray?: Array<{ title: string; description: string }>;
}

