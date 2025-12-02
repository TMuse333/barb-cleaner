"use client";

import React from "react";
import CarouselHero from "@/components/designs/herobanners/carouselHero/carouselHero";
import ExperienceCard from "@/components/designs/contentPieces/experienceCard/experienceCard";
import TextAndList from "@/components/designs/textComponents/textAndList/textAndList";
import FeatureBoxes from "@/components/designs/textComponents/featureBoxes/featureBoxes";
import Accordion from "@/components/designs/textComponents/accordion/accordion";
import GridCarousel from "@/components/designs/carousels/gridCarousel/gridCarousel";
import Testimonials3 from "@/components/designs/testimonials/testimonials3/testimonials3";
import ContactCloser from "@/components/designs/miscellaneous/contactCloser/contactCloser";
import {
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
    <main>
      <CarouselHero {...carouselHeroData} />
      <ExperienceCard {...experienceCardData} />
      <TextAndList {...textAndListData} />
      <FeatureBoxes {...featureBoxesData} />
      <Accordion {...accordionData} />
      <GridCarousel {...gridCarouselData} />
      <Testimonials3 {...testimonials3Data} />
      <ContactCloser {...contactCloserData} />
    </main>
  );
}
