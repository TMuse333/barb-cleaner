"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CarouselHeroProps, defaultCarouselHeroProps } from ".";

import { deriveColorPalette, useAnimatedGradient } from "@/lib";

const CarouselHero: React.FC<CarouselHeroProps> = (props) => {
  // Merge props with defaults
  const {
    title,
    subTitle,
    description,
    buttonText,
    items: rawItems = [],
    textColor,
    baseBgColor,
    mainColor,
    bgLayout,
  } = { ...defaultCarouselHeroProps, ...props };

  // Ensure items array is never empty
  const safeItems = rawItems.length > 0 ? rawItems : defaultCarouselHeroProps.items;

  // Safe color fallbacks
  const safeTextColor = textColor ?? defaultCarouselHeroProps.textColor;
  const safeBaseBgColor = baseBgColor ?? defaultCarouselHeroProps.baseBgColor;
  const safeMainColor = mainColor ?? defaultCarouselHeroProps.mainColor;
  const safeBgLayout = bgLayout ?? defaultCarouselHeroProps.bgLayout;

  const colors = deriveColorPalette(
    { textColor: safeTextColor, baseBgColor: safeBaseBgColor, mainColor: safeMainColor, bgLayout: safeBgLayout },
    safeBgLayout.type
  );
  const backgroundImage = useAnimatedGradient(safeBgLayout, colors);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [tabProgress, setTabProgress] = useState(0);

  // Auto-slide progress
  useEffect(() => setTabProgress(0), [currentIndex]);
  useEffect(() => {
    if (tabProgress >= 100 && safeItems.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % safeItems.length);
    }
  }, [tabProgress, safeItems.length]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (tabProgress < 100) setTabProgress((prev) => prev + 0.5);
    }, 50);
    return () => clearInterval(interval);
  }, [tabProgress]);

  // Scroll to contact section
  const handleScrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const navbarHeight = 80; // Approximate navbar height in pixels
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.section
      className="w-full"
      style={{ background: backgroundImage }}
    >
      <section className="flex flex-col md:flex-row md:h-screen relative items-center mx-auto max-w-[2200px] md:mt-[-4rem] gap-4 px-4">
        {/* Left Text Section */}
        <section className="flex flex-col md:w-[40vw] justify-center items-start py-8 px-6 space-y-3">
          {subTitle && <span className="text-xl font-medium" style={{ color: safeMainColor }}>{subTitle}</span>}
          {title && (
            <h1
              className="text-3xl md:text-4xl font-bold pb-4"
              style={{
                color: safeMainColor,
              }}
            >
              {title}
            </h1>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-start my-2"
          >
            <Image
              src="/logo.png"
              alt="BTQ Cleaning Services Logo"
              width={200}
              height={200}
              className="object-contain max-w-[200px] max-h-[200px]"
              priority
            />
          </motion.div>
          {description && <p className="text-base md:text-lg whitespace-pre-line leading-tight" style={{ color: safeTextColor }}>{description}</p>}
          {buttonText && (
            <motion.button
              onClick={handleScrollToContact}
              whileHover={{ scale: 1.05, boxShadow: `0 10px 30px ${safeMainColor}40` }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: safeMainColor, color: safeBaseBgColor }}
            >
              {buttonText}
            </motion.button>
          )}
        </section>

        {/* Right Carousel Section */}
        <section className="relative w-full md:w-[60vw] bg-black rounded-2xl mx-auto h-[70vh] md:h-[80vh] border-4 border-white overflow-hidden">
          <AnimatePresence mode="wait">
            {safeItems.length > 0 && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex-shrink-0 snap-start rounded-3xl overflow-hidden"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={safeItems[currentIndex]?.image?.src ?? "/placeholder.webp"}
                    alt={safeItems[currentIndex]?.image?.alt ?? "Slide"}
                    fill
                    className={safeItems[currentIndex]?.objectContain ? "object-contain" : "object-cover"}
                  />
                </div>
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full px-8">
                  <p
                    className="text-white text-center bg-white p-3 rounded-lg text-lg font-medium"
                    style={{ color: safeTextColor }}
                  >
                    {safeItems[currentIndex]?.description || ""}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Tabs */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {safeItems.map((_:unknown, idx:number) => (
              <div
                key={idx}
                className="h-2 w-12 bg-gray-600 rounded-full cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setCurrentIndex(idx)}
              >
                {idx === currentIndex && (
                  <div
                    className="bg-white h-full rounded-full"
                    style={{ width: `${tabProgress}%`, transition: "width 0.05s linear" }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      </section>
    </motion.section>
  );
};

export default CarouselHero;
