"use client";

import React from "react";
import CarouselHero from "@/components/designs/herobanners/carouselHero/carouselHero";
import ExperienceCard from "@/components/designs/contentPieces/experienceCard/experienceCard";
import TextAndList from "@/components/designs/textComponents/textAndList/textAndList";
import FeatureBoxes from "@/components/designs/textComponents/featureBoxes/featureBoxes";
import Accordion from "@/components/designs/textComponents/accordion/accordion";
import GridCarousel from "@/components/designs/carousels/gridCarousel/gridCarousel";
import Testimonials3 from "@/components/designs/testimonials/testimonials3/testimonials3";
import ContactCloser from "@/components/designs/misc/contactCloser/contactCloser";

export default function IndexPage() {
  return (
    <main>
      <CarouselHero {...{
  "subTitle": "Welcome to BTQ Cleaning",
  "title": "Your Reliable & Friendly Cleaning Service",
  "description": "Experience a clean home that welcomes you back. We specialize in customized cleaning solutions with a personal touch.",
  "buttonText": "Get Started",
  "array": [],
  "mainColor": "#3B82F6",
  "textColor": "#000000",
  "baseBgColor": "#FFFFFF",
  "bgLayout": {
    "type": "solid"
  }
}} />
      <ExperienceCard {...{
  "title": "Why Choose Us?",
  "description": "With over 20 years of experience, we pride ourselves on delivering exceptional cleaning services that meet your unique needs. Our clients become our friends.",
  "subTitle": "Key Highlights",
  "buttonText": "Learn More",
  "array": [
    {
      "title": "Personalized Cleaning Plans",
      "description": "We tailor our services to fit your specific requirements and preferences."
    },
    {
      "title": "Eco-Friendly Products",
      "description": "We use environmentally friendly cleaning products that are safe for your family and pets."
    },
    {
      "title": "Trustworthy & Dependable",
      "description": "We are bonded and insured, ensuring you receive reliable and trustworthy service."
    },
    {
      "title": "Stress-Free Experience",
      "description": "Enjoy peace of mind knowing your home is clean, allowing you to relax after a long day."
    },
    {
      "title": "Pet-Friendly Services",
      "description": "We treat your pets with kindness, ensuring they feel comfortable during our cleaning."
    }
  ],
  "mainColor": "#3B82F6",
  "textColor": "#000000",
  "baseBgColor": "#FFFFFF",
  "bgLayout": {
    "type": "solid"
  }
}} />
      <TextAndList {...{
  "subTitle": "Our Commitment to Quality",
  "title": "Discover the BTQ Difference",
  "description": "We are dedicated to providing exceptional cleaning services that enhance your living space. Here are our key benefits:",
  "textArray": [
    {
      "title": "Customized Services",
      "description": "Every home is unique, and so are our cleaning solutions tailored to your needs."
    },
    {
      "title": "Experienced Team",
      "description": "Our skilled team has over 20 years of cleaning experience, ensuring top-notch results."
    },
    {
      "title": "Client Relationships",
      "description": "We build strong relationships with our clients, fostering trust and satisfaction."
    },
    {
      "title": "Flexible Scheduling",
      "description": "We work around your schedule to provide convenient cleaning services."
    }
  ],
  "array": [
    {
      "title": "Customized Services",
      "description": "Every home is unique, and so are our cleaning solutions tailored to your needs."
    },
    {
      "title": "Experienced Team",
      "description": "Our skilled team has over 20 years of cleaning experience, ensuring top-notch results."
    },
    {
      "title": "Client Relationships",
      "description": "We build strong relationships with our clients, fostering trust and satisfaction."
    },
    {
      "title": "Flexible Scheduling",
      "description": "We work around your schedule to provide convenient cleaning services."
    }
  ],
  "mainColor": "#3B82F6",
  "textColor": "#000000",
  "baseBgColor": "#FFFFFF",
  "bgLayout": {
    "type": "solid"
  }
}} />
      <FeatureBoxes {...{
  "array": [
    {
      "title": "Home Cleaning",
      "description": "Thorough cleaning services for every room in your home, ensuring a fresh and tidy atmosphere."
    },
    {
      "title": "Deep Cleaning",
      "description": "In-depth cleaning that reaches every corner, perfect for seasonal refreshes or special occasions."
    },
    {
      "title": "Move-In/Move-Out Cleaning",
      "description": "Comprehensive cleaning services to ensure a spotless transition to your new home."
    }
  ],
  "title": "Our Services",
  "description": "Explore our range of cleaning services designed to meet your needs and exceed your expectations.",
  "mainColor": "#3B82F6",
  "textColor": "#000000",
  "baseBgColor": "#FFFFFF",
  "bgLayout": {
    "type": "solid"
  }
}} />
      <Accordion {...{
  "array": [
    {
      "title": "What areas do you serve?",
      "description": "We provide cleaning services across various neighborhoods. Please contact us for specific locations."
    },
    {
      "title": "Do you bring your own supplies?",
      "description": "Yes, we bring all necessary cleaning supplies, including eco-friendly products and equipment."
    },
    {
      "title": "How do I book a service?",
      "description": "Booking is simple! Contact us via email or phone to schedule your cleaning."
    }
  ],
  "title": "Frequently Asked Questions",
  "description": "Here are some common questions we receive from our clients.",
  "buttonText": "Contact Us",
  "mainColor": "#3B82F6",
  "textColor": "#000000",
  "baseBgColor": "#FFFFFF",
  "bgLayout": {
    "type": "solid"
  }
}} />
      <GridCarousel {...{
  "subTitle": "See Our Work",
  "title": "Transformations We Create",
  "description": "Browse through our gallery to see the beautiful clean spaces we have achieved for our clients.",
  "array": [],
  "mainColor": "#3B82F6",
  "textColor": "#000000",
  "baseBgColor": "#FFFFFF",
  "bgLayout": {
    "type": "solid"
  }
}} />
      <Testimonials3 {...{
  "testimonials": [
    {
      "name": "Sarah L.",
      "role": "Homeowner",
      "quote": "BTQ Cleaning Services transformed my home! I couldn't be happier with the results."
    },
    {
      "name": "Mark T.",
      "role": "Business Owner",
      "quote": "Dependable and thorough! They always exceed my expectations."
    },
    {
      "name": "Emily R.",
      "role": "Client",
      "quote": "I love coming home to a clean house. Thank you for your amazing service!"
    }
  ],
  "title": "Client Testimonials",
  "description": "Hear what our satisfied clients have to say about our cleaning services.",
  "array": [],
  "mainColor": "#3B82F6",
  "textColor": "#000000",
  "baseBgColor": "#FFFFFF",
  "bgLayout": {
    "type": "solid"
  }
}} />
      <ContactCloser {...{
  "title": "Ready for a Spotless Home?",
  "description": "Contact us today to schedule your cleaning service. Experience the joy of a clean space tailored to your needs. We look forward to serving you!",
  "buttonText": "Get in Touch",
  "array": [],
  "mainColor": "#3B82F6",
  "textColor": "#000000",
  "baseBgColor": "#FFFFFF",
  "bgLayout": {
    "type": "solid"
  }
}} />
    </main>
  );
}
