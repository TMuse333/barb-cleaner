"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Facebook } from "lucide-react";
import { BaseFooterProps } from "@/types/navbar";

const LandingFooter: React.FC<BaseFooterProps> = (props) => {
  const {
    brandName = "BTQ Cleaning",
    contact,
    navItems = [],
    socialLinks = [],
    developerCredit,
  } = props;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white py-12 md:py-16">
      <div className="max-w-[2200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-white">{brandName}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional cleaning services with over 20 years of experience.
              Your trusted partner for a spotless home.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-4 mt-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                      aria-label={link.name}
                    >
                      <Icon size={20} className="text-white" />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          {navItems.length > 0 && (
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Information */}
          {contact && (
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-semibold text-white">Contact Us</h4>
              <div className="space-y-3">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <Mail size={18} />
                    <span>{contact.email}</span>
                  </a>
                )}
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/\D/g, "")}`}
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <Phone size={18} />
                    <span>{contact.phone}</span>
                  </a>
                )}
                {contact.address && (
                  <p className="text-gray-400 text-sm">{contact.address}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} {brandName}. All rights reserved.
            </p>
            {developerCredit && (
              <a
                href={developerCredit.href}
                className="text-gray-500 hover:text-gray-400 transition-colors text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                {developerCredit.name}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;

