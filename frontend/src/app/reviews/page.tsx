"use client";

import React from "react";
import { ReviewsSection } from "@/components/designs/reviews";
import LandingNavbar from "@/components/designs/navbars/landingNavbar/landingNavbar";
import LandingFooter from "@/components/designs/footers/landingFooter/landingFooter";
import { navbarData, footerData } from "@/data/homepage.data";

export default function ReviewsPage() {
  return (
    <>
      <LandingNavbar {...navbarData} />
      <main className="mt-20 min-h-screen">
        <ReviewsSection
          title="Customer Reviews"
          description="See what our clients are saying about BTQ Cleaning"
          mainColor="#3B82F6"
          accentColor="#60A5FA"
          baseBgColor="#F9FAFB"
          textColor="#111827"
        />
      </main>
      <LandingFooter {...footerData} />
    </>
  );
}
