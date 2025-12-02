import ContactCloser from "./contactCloser";
import { BaseComponentProps } from "@/types";

export interface ContactCloserProps extends Partial<BaseComponentProps> {
  title?: string;
  description?: string;
  buttonText?: string;
  email?: string;
  phone?: string;
  facebookUrl?: string;
}

export const defaultContactCloserProps: ContactCloserProps = {
  title: "Ready to Get Started?",
  description: "Contact us today to discuss your cleaning needs. We're here to help!",
  buttonText: "Get in Touch",
  email: "",
  phone: "",
  facebookUrl: "",
  mainColor: "#3B82F6",
  textColor: "#000000",
  baseBgColor: "#FFFFFF",
  bgLayout: {
    type: "solid",
  },
};

export default ContactCloser;

