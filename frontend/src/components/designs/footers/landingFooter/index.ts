import LandingFooter from "./landingFooter";
import { BaseFooterProps } from "@/types/navbar";
import { Facebook } from "lucide-react";

export interface LandingFooterProps extends BaseFooterProps {}

export const defaultLandingFooterProps: LandingFooterProps = {
  brandName: "BTQ Cleaning",
  contact: {
    email: "btqcleaningservices@gmail.com",
    phone: "902-220-1089",
  },
  navItems: [],
  socialLinks: [],
  developerCredit: undefined,
};

export default LandingFooter;

