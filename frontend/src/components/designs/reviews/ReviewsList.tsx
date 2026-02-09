"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Review {
  id: number;
  name: string;
  rating: number;
  review: string;
  created_at: string;
}

interface ReviewsListProps {
  mainColor?: string;
  accentColor?: string;
}

const ReviewsList: React.FC<ReviewsListProps> = ({
  mainColor = "#3B82F6",
  accentColor = "#60A5FA",
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

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: mainColor }}></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return null; // Don't show section if no reviews
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {reviews.map((review, index) => (
          <div key={review.id} className="min-w-full flex justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-xl shadow-lg w-full max-w-2xl border-2 bg-white"
              style={{ borderColor: accentColor }}
            >
              {/* Stars */}
              <div className="text-2xl mb-4 text-yellow-400">
                {renderStars(review.rating)}
              </div>

              {/* Quote */}
              <p className="text-lg italic text-gray-700 mb-6">
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
  );
};

export default ReviewsList;
