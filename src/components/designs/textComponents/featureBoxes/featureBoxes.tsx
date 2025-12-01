// components/featureBoxes/featureBoxes.tsx
"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { useInView, motion, Variants } from "framer-motion";
import { defaultFeatureBoxesProps, FeatureBoxesProps } from ".";
import { deriveColorPalette, useAnimatedGradient } from "@/lib/colorUtils";

interface BoxProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  boxColor: string;
  boxTextColor: string;
}

const FeatureBox: React.FC<BoxProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  boxColor,
  boxTextColor,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 1 });

  const containerVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 7,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`w-[90vw] mx-auto p-4 mb-8 border rounded-xl sm:w-[40vw] max-w-[550px]`}
      style={{
        backgroundColor: boxColor,
        color: boxTextColor,
        borderColor: boxTextColor,
      }}
    >
      <motion.div
        variants={childVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ type: "spring" as const, stiffness: 500, damping: 7, delay: 0.1 }}
        className="w-[30px] sm:w-[35px] md:h-[40px] mx-auto mb-4"
      >
        <Image src={imageSrc} alt={imageAlt} width={600} height={1300} className="object-contain" />
      </motion.div>

      <motion.h3
        className="text-lg font-semibold"
        variants={childVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ type: "spring" as const, stiffness: 500, damping: 7, delay: 0.2 }}
        style={{ color: boxTextColor }}
      >
        {title}
      </motion.h3>

      <motion.p
        variants={childVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ type: "spring" as const, stiffness: 500, damping: 7, delay: 0.3 }}
        style={{ color: boxTextColor }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const FeatureBoxes: React.FC<FeatureBoxesProps> = (props) => {
  // Merge props with defaults
  const {
    array: rawArray = [],
    images,
    title,
    description,
    textColor,
    baseBgColor,
    mainColor,
    bgLayout,
  } = { ...defaultFeatureBoxesProps, ...props };

  // Ensure array is never empty and extract items
  const safeArray = rawArray.length > 0 ? rawArray : defaultFeatureBoxesProps.array;
  const items = safeArray
    .filter((item): item is { title: string; description: string } => 
      typeof item === 'object' && item !== null && 'title' in item && 'description' in item
    )
    .map((item, index) => ({
      title: item.title ?? "",
      description: item.description ?? "",
      imageKey: String(index),
    }));

  // Safe color fallbacks
  const safeTextColor = textColor ?? defaultFeatureBoxesProps.textColor;
  const safeBaseBgColor = baseBgColor ?? defaultFeatureBoxesProps.baseBgColor;
  const safeMainColor = mainColor ?? defaultFeatureBoxesProps.mainColor;
  const safeBgLayout = bgLayout ?? defaultFeatureBoxesProps.bgLayout;

  const colors = deriveColorPalette(
    { textColor: safeTextColor, baseBgColor: safeBaseBgColor, mainColor: safeMainColor, bgLayout: safeBgLayout },
    safeBgLayout.type
  );
  const background = useAnimatedGradient(safeBgLayout, colors);

  // Get images from images prop, keyed by index
  const getImageForIndex = (index: number) => {
    const imageKey = String(index);
    const image = images?.[imageKey];
    return {
      src: image?.src ?? "/placeholder.webp",
      alt: image?.alt ?? `Feature ${index + 1}`,
    };
  };

  return (
    <motion.section
      style={{ background, color: colors.textColor ?? safeTextColor }}
      className="w-full py-12"
    >
      {(title || description) && (
        <div className="text-center mb-8 px-4">
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl mb-4 font-semibold bg-gradient-to-br bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${colors.lightAccent ?? safeMainColor}, ${colors.darkAccent ?? safeMainColor})`,
              }}
            >
              {title}
            </motion.h2>
          )}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto text-base leading-relaxed md:text-lg"
            >
              {description}
            </motion.p>
          )}
        </div>
      )}

      <section className="flex flex-col mx-auto justify-center items-center mt-6 sm:grid grid-cols-2 max-w-[1200px]">
        {items.map((item, index) => {
          const image = getImageForIndex(index);
          return (
            <FeatureBox
              key={index}
              imageSrc={image.src}
              imageAlt={image.alt}
              title={item.title}
              description={item.description}
              boxColor={`${colors.mainColor}20`}
              boxTextColor={colors.textColor ?? safeTextColor}
            />
          );
        })}
      </section>
    </motion.section>
  );
};

export default FeatureBoxes;
