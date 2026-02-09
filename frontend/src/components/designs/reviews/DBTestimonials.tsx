"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Review {
  id: number;
  name: string;
  rating: number;
  review: string;
  created_at: string;
}

interface DBTestimonialsProps {
  title?: string;
  description?: string;
  mainColor?: string;
  accentColor?: string;
  baseBgColor?: string;
  textColor?: string;
  ctaText?: string;
  ctaLink?: string;
}

const DBTestimonials: React.FC<DBTestimonialsProps> = ({
  title = "What Our Clients Say",
  description = "Real reviews from real customers",
  mainColor = "#3B82F6",
  accentColor = "#60A5FA",
  baseBgColor = "#F9FAFB",
  textColor = "#111827",
  ctaText = "Leave a Review",
  ctaLink = "/reviews",
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const nextReview = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (isLoading) {
    return (
      <section className="py-16" style={{ backgroundColor: baseBgColor }}>
        <div className="flex justify-center">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2"
            style={{ borderColor: mainColor }}
          ></div>
        </div>
      </section>
    );
  }

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
            style={{ color: textColor, opacity: 0.7 }}
          >
            {description}
          </p>
        )}

        {/* Reviews Carousel */}
        {reviews.length > 0 ? (
          <div className="relative overflow-hidden mb-10">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="min-w-full flex justify-center px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 rounded-xl shadow-lg w-full max-w-2xl border-2 bg-white"
                    style={{ borderColor: accentColor }}
                  >
                    {/* Stars */}
                    <div className="text-2xl mb-4 text-center text-yellow-400">
                      {renderStars(review.rating)}
                    </div>

                    {/* Quote */}
                    <p className="text-lg italic text-gray-700 mb-6 text-center">
                      &quot;{review.review}&quot;
                    </p>

                    {/* Author */}
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {review.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(review.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            {reviews.length > 1 && (
              <>
                <button
                  onClick={prevReview}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-2 rounded-full hover:opacity-80 transition-colors"
                  style={{ background: accentColor }}
                  aria-label="Previous review"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextReview}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-2 rounded-full hover:opacity-80 transition-colors"
                  style={{ background: accentColor }}
                  aria-label="Next review"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className="w-3 h-3 rounded-full transition-colors"
                      style={{
                        background: index === currentIndex ? accentColor : "#d1d5db",
                      }}
                      aria-label={`Go to review ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-8 mb-10">
            <p className="text-gray-500 text-lg">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <Link href={ctaLink}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full font-semibold text-white text-lg shadow-lg transition-all"
              style={{ backgroundColor: mainColor }}
            >
              {ctaText}
            </motion.button>
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Had a great experience? We&apos;d love to hear from you!
          </p>
        </div>
      </div>
    </section>
  );
};

export default DBTestimonials;
