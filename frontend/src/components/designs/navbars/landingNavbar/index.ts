import LandingNavbar from "./landingNavbar";
import { NavbarProps } from "@/types/navbar";

export type { NavbarProps };
export interface LandingNavbarProps extends NavbarProps {
  real?:boolean
}

export const defaultLandingNavbarProps: LandingNavbarProps = {
  logoSrc: undefined,
  logoAlt: "Logo",
  logoText: "BTQ Cleaning",
  tabs: [],
  sticky: true,
  alignment: "left",
  buttonText: "Get Started",
  ctaDestination: "hero",
  mainColor: "#3B82F6",
  textColor: "#000000",
  baseBgColor: "#FFFFFF",
  bgLayout: {
    type: "solid",
  },

};

export default LandingNavbar;

