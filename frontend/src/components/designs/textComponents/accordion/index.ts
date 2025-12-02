// components/accordion/index.ts
import Accordion from "./accordion";
import { BaseComponentProps, EditableComponent } from "@/types";



export interface AccordionProps extends Omit<Partial<BaseComponentProps>, 'items'> {
  real?:boolean
  // Uses array from BaseComponentProps for accordion items
  // Each item should be StandardText type: { title: string, description: string }
}

export const defaultAccordionProps: Required<Omit<AccordionProps, 'array'>> & { 
  array: Array<{ title: string; description: string }>;
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
  title: "A list of items that can be expanded and collapsed",
  description: "This is a description for the accordion section. It provides additional information that can be expanded when clicked.",
  subTitle: "Accordion Section",
  buttonText: "",
  array: [
    {
      title: "First Accordion Item",
      description: "This is a description for the first accordion item. Click to expand and see more details about this topic.",
    },
    {
      title: "Second Accordion Item",
      description: "This is a description for the second accordion item. It provides additional information that can be expanded when clicked.",
    },
    {
      title: "Third Accordion Item",
      description: "This is a description for the third accordion item. Use accordions to organize content in a space-efficient way.",
    },
    {
      title: "Fourth Accordion Item",
      description: "This is a description for the fourth accordion item. They're great for FAQs, features, or any collapsible content.",
    },
    {
      title: "Fifth Accordion Item",
      description: "This is a description for the fifth accordion item. The component supports pagination when you have many items.",
    },
  ],
  images: {},
  real:true
};

