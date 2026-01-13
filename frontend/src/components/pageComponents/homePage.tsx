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
// import SparkleHome from "@/components/svg/SparkleHome";
// import PetFriendlyBadge from "@/components/svg/PetFriendlyBadge";
import CleaningTransform from "@/components/svg/CleaningTransform";
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
      <main className="mt-5 sm:mt-10 md:mt-16">
        <section id="hero" className="">
          <CarouselHero {...carouselHeroData} />
        </section>

        {/* Trust Badges Section - commented out for now
        <section className="py-8 md:py-12 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="flex flex-col items-center">
                <SparkleHome
                  width={200}
                  height={180}
                  primaryColor="#3B82F6"
                  secondaryColor="#60A5FA"
                  accentColor="#FCD34D"
                />
              </div>
              <div className="flex flex-col items-center">
                <PetFriendlyBadge
                  width={180}
                  height={200}
                  primaryColor="#3B82F6"
                  secondaryColor="#60A5FA"
                  accentColor="#F472B6"
                />
              </div>
            </div>
          </div>
        </section>
        */}

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

        {/* Before/After Transformation Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
              See the BTQ Difference
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Watch the transformation happen — from cluttered and dusty to sparkling clean.
            </p>
            <div className="flex justify-center">
              <CleaningTransform
                width={420}
                height={240}
                primaryColor="#3B82F6"
                secondaryColor="#60A5FA"
                accentColor="#FCD34D"
              />
            </div>
          </div>
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
