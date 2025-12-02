// components/testimonials3/index.ts
import { BaseComponentProps, } from "@/types";
import Testimonials3 from "./testimonials3";




export const defaultTestimonials3Props = {
  title: "Trusted by Our Clients",
  description: "",
  testimonials: [
    {
      name: "Hiroshi Yamada",
      role: "CEO, Amada Enterprises",
      quote: "This team elevated our brand with unmatched creativity and precision. Their solutions drove measurable growth.",
      src: "/placeholder.webp",
      alt: "Hiroshi Yamada's photo",
    },
    {
      name: "Emma Wilson",
      role: "Freelance Consultant, Wilson Strategies",
      quote: "Their platform simplified my workflow, saving me hours daily. Exceptional support and results!",
      src: "/placeholder.webp",
      alt: "Emma Wilson's photo",
    },
    {
      name: "Rahul Patel",
      role: "Product Manager, TechTrend Innovations",
      quote: "Their innovative approach aligned perfectly with our vision, delivering outstanding outcomes.",
      src: "/placeholder.webp",
      alt: "Rahul Patel's photo",
    },
  ],
  textColor: "#1f2937",
  baseBgColor: "#f0f9ff",
  mainColor: "#3B82F6",
  bgLayout: {
    type: "radial",
    radialSize: "125% 125%",
    radialPosition: "50% 0%",
    radialBaseStop: 50,
  } as const,
  items: [],
  array: [],
};

export interface Testimonials3Props extends Partial<BaseComponentProps> {
  title?: string;
  description?: string;
  testimonials?: Array<{
    name: string;
    role: string;
    quote: string;
    src?: string;
    alt?: string;
  }>;
}

