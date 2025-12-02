"use client";

import React from "react";
import LandingNavbar from "@/components/designs/navbars/landingNavbar/landingNavbar";
import LandingFooter from "@/components/designs/footers/landingFooter/landingFooter";
import CarouselHero from "@/components/designs/herobanners/carouselHero/carouselHero";
import ExperienceCard from "@/components/designs/contentPieces/experienceCard/experienceCard";
import TextAndList from "@/components/designs/textComponents/textAndList/textAndList";
import FeatureBoxes from "@/components/designs/textComponents/featureBoxes/featureBoxes";
import Accordion from "@/components/designs/textComponents/accordion/accordion";
import GridCarousel from "@/components/designs/carousels/gridCarousel/gridCarousel";
import Testimonials3 from "@/components/designs/testimonials/testimonials3/testimonials3";
import ContactCloser from "@/components/designs/miscellaneous/contactCloser/contactCloser";
import {
  navbarData,
  footerData,
  carouselHeroData,
  experienceCardData,
  textAndListData,
  featureBoxesData,
  accordionData,
  gridCarouselData,
  testimonials3Data,
  contactCloserData,
} from "@/data/homepage.data";

export default function IndexPage() {
  return (
    <>
      <LandingNavbar {...navbarData} />
      <main className="pt-16 md:pt-20">
        <section id="hero">
          <CarouselHero {...carouselHeroData} />
        </section>
        <section id="about">
          <ExperienceCard {...experienceCardData} />
        </section>
        <section id="features">
          <TextAndList {...textAndListData} />
        </section>
        <section id="services">
          <FeatureBoxes {...featureBoxesData} />
        </section>
        <section id="faq">
          <Accordion {...accordionData} />
        </section>
        <section id="gallery">
          <GridCarousel {...gridCarouselData} />
        </section>
        <section id="testimonials">
          <Testimonials3 {...testimonials3Data} />
        </section>
        <section id="contact">
          <ContactCloser {...contactCloserData} />
        </section>
      </main>
      <LandingFooter {...footerData} />
    </>
  );
}
