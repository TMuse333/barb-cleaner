"use client";

import React, { useState } from "react";
import ReviewsList from "./ReviewsList";
import ReviewForm from "./ReviewForm";

interface ReviewsSectionProps {
  title?: string;
  description?: string;
  mainColor?: string;
  accentColor?: string;
  baseBgColor?: string;
  textColor?: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  title = "Customer Reviews",
  description = "See what our clients are saying",
  mainColor = "#3B82F6",
  accentColor = "#60A5FA",
  baseBgColor = "#F9FAFB",
  textColor = "#111827",
}) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReviewSuccess = () => {
    // Could trigger a refresh, but new reviews need approval first
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <section className="py-16" style={{ backgroundColor: baseBgColor }}>
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {title && (
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-2"
            style={{ color: textColor }}
          >
            {title}
          </h2>
        )}
        {description && (
          <p
            className="text-lg sm:text-xl text-center mb-10"
            style={{ color: textColor, opacity: 0.8 }}
          >
            {description}
          </p>
        )}

        {/* Reviews Carousel */}
        <div className="mb-12" key={refreshKey}>
          <ReviewsList mainColor={mainColor} accentColor={accentColor} />
        </div>

        {/* Review Form */}
        <div className="max-w-xl mx-auto">
          <ReviewForm mainColor={mainColor} onSuccess={handleReviewSuccess} />
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
