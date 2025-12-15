// components/testimonials3/testimonials3.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { defaultTestimonials3Props, Testimonials3Props } from ".";
import { deriveColorPalette, useAnimatedGradient } from "@/lib/colorUtils";
import { GradientConfig } from "@/types";
import { motion } from "framer-motion";

const Testimonials3: React.FC<Testimonials3Props> = (props) => {
  const {
    title,
    description,
    testimonials = [],
    textColor,
    baseBgColor,
    mainColor,
    bgLayout,
  } = { ...defaultTestimonials3Props, ...props };

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Safe color fallbacks
  const safeTextColor = textColor ?? defaultTestimonials3Props.textColor;
  const safeBaseBgColor = baseBgColor ?? defaultTestimonials3Props.baseBgColor;
  const safeMainColor = mainColor ?? defaultTestimonials3Props.mainColor;
  const safeBgLayout = (bgLayout ?? defaultTestimonials3Props.bgLayout) as GradientConfig;

  const colors = deriveColorPalette(
    { textColor: safeTextColor, baseBgColor: safeBaseBgColor, mainColor: safeMainColor, bgLayout: safeBgLayout },
    safeBgLayout.type
  );

  const background = useAnimatedGradient(safeBgLayout, colors);

  return (
    <motion.section
      style={{ background, color: colors.textColor ?? "#111111" }}
      className="py-16"
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        {title && (
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-2"
          >
            {title}
          </h2>
        )}
        {description && (
          <p
            className="text-lg sm:text-xl md:text-2xl text-center mb-10"
          >
            {description}
          </p>
        )}

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="min-w-full flex justify-center">
                <div
                  className="p-8 rounded-xl shadow-lg w-full max-w-2xl border border-2"
                  style={{
                    background: "#ffffff",
                    borderColor: colors.accentColor ?? "#00bfff",
                  }}
                >
                  <p
                    className="text-lg italic mb-6"
                  >
                    &quot;{testimonial.quote ?? ""}&quot;
                  </p>
                  <div className="text-center">
                    <h3
                      className="text-xl font-semibold mb-2"
                    >
                      {testimonial.name ?? ""}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.role ?? ""}</p>
                    {testimonial.src && (
                      <div className="mt-4">
                        <Image
                          src={testimonial.src}
                          alt={testimonial.alt ?? testimonial.name ?? ""}
                          className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                          width={80}
                          height={80}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-2 rounded-full hover:opacity-80 transition-colors"
            style={{ background: colors.accentColor ?? "#00bfff" }}
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-2 rounded-full hover:opacity-80 transition-colors"
            style={{ background: colors.accentColor ?? "#00bfff" }}
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Carousel Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="w-3 h-3 rounded-full"
                style={{
                  background: index === currentIndex ? colors.accentColor ?? "#00bfff" : "#d1d5db",
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials3;