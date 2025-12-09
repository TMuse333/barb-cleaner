"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavbarProps } from ".";

const LandingNavbar: React.FC<NavbarProps> = (props) => {
  const {
    logoSrc,
    logoAlt,
    logoText,
    tabs = [],
    sticky = true,
    alignment = "left",
    buttonText,
    ctaDestination,
    mainColor,
    textColor,
    baseBgColor,
  } = props;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (scrollTo?: string) => {
    if (!scrollTo) return;
    const element = document.getElementById(scrollTo);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height in pixels
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavClick = (item: typeof tabs[0]) => {
    if (item.type === "scroll" && item.scrollTo) {
      handleScrollTo(item.scrollTo);
    } else if (item.href) {
      if (item.target === "_blank") {
        window.open(item.href, "_blank");
      } else {
        window.location.href = item.href;
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full z-50 transition-all duration-300 ${
        sticky ? "fixed top-0" : "relative"
      } ${isScrolled ? "shadow-lg" : ""}`}
      style={{
        backgroundColor: isScrolled ? baseBgColor ?? "#FFFFFF" : `${baseBgColor ?? "#FFFFFF"}F0`,
        backdropFilter: isScrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="max-w-[2200px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {logoSrc && (
              <img
                src={logoSrc}
                alt={logoAlt ?? "Logo"}
                className="h-8 md:h-10 w-auto"
              />
            )}
            {logoText && (
              <div className="flex flex-col">
                <span
                  className="text-xl md:text-2xl font-bold"
                  style={{ color: mainColor ?? "#3B82F6" }}
                >
                  {logoText}
                </span>
                <span
                  className="text-[10px] md:text-xs opacity-70"
                  style={{ color: textColor ?? "#000000" }}
                >
                  (Barbs Top Quality Cleaning)
                </span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {tabs.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item)}
                className="font-medium transition-colors hover:opacity-70"
                style={{ color: textColor ?? "#000000" }}
              >
                {item.label}
              </button>
            ))}

            {buttonText && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScrollTo(ctaDestination)}
                className="px-6 py-2 rounded-full font-semibold transition-all"
                style={{
                  backgroundColor: mainColor ?? "#3B82F6",
                  color: baseBgColor ?? "#FFFFFF",
                }}
              >
                {buttonText}
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: textColor ?? "#000000" }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
        style={{ backgroundColor: baseBgColor ?? "#FFFFFF" }}
      >
        <div className="px-4 py-4 space-y-4">
          {tabs.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(item)}
              className="block w-full text-left font-medium py-2 transition-colors hover:opacity-70"
              style={{ color: textColor ?? "#000000" }}
            >
              {item.label}
            </button>
          ))}
          {buttonText && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                handleScrollTo(ctaDestination);
              }}
              className="w-full px-6 py-3 rounded-full font-semibold transition-all"
              style={{
                backgroundColor: mainColor ?? "#3B82F6",
                color: baseBgColor ?? "#FFFFFF",
              }}
            >
              {buttonText}
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default LandingNavbar;

