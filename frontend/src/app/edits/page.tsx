"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Save, Loader2, Home, X } from "lucide-react";
import Link from "next/link";
import websiteData from "@/data/websiteData.json";

interface EditableSection {
  sectionNumber: number;
  sectionName: string;
  fields: {
    label: string;
    value: string;
    key: string;
    componentId: string;
    fieldPath: string;
  }[];
}

const SECTION_NAMES: Record<string, string> = {
  carouselHero: "Hero Banner",
  experienceCard: "About Section",
  textAndList: "Features Section",
  featureBoxes: "Services Section",
  accordion: "FAQ Section",
  gridCarousel: "Gallery Section",
  testimonials3: "Testimonials Section",
  contactCloser: "Contact Section",
};

export default function EditsPage() {
  const [sections, setSections] = useState<EditableSection[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Parse websiteData.json into editable sections
    const parsedSections: EditableSection[] = [];
    let sectionNumber = 1;

    websiteData.pages[0]?.components.forEach((component) => {
      const sectionName = SECTION_NAMES[component.type] || component.type;
      const fields: EditableSection["fields"] = [];

      // Extract text fields from component props
      if (component.props.title) {
        fields.push({
          label: "Title",
          value: component.props.title,
          key: `${component.id}-title`,
          componentId: component.id,
          fieldPath: "title",
        });
      }

      if (component.props.subTitle) {
        fields.push({
          label: "Subtitle",
          value: component.props.subTitle,
          key: `${component.id}-subTitle`,
          componentId: component.id,
          fieldPath: "subTitle",
        });
      }

      if (component.props.description) {
        fields.push({
          label: "Description",
          value: component.props.description,
          key: `${component.id}-description`,
          componentId: component.id,
          fieldPath: "description",
        });
      }

      if (component.props.buttonText) {
        fields.push({
          label: "Button Text",
          value: component.props.buttonText,
          key: `${component.id}-buttonText`,
          componentId: component.id,
          fieldPath: "buttonText",
        });
      }

      // Handle items array (for carouselHero, gridCarousel)
      if (component.props.items && Array.isArray(component.props.items)) {
        component.props.items.forEach((item: any, index: number) => {
          if (item.description) {
            fields.push({
              label: `Image ${index + 1} Description`,
              value: item.description,
              key: `${component.id}-item-${index}-description`,
              componentId: component.id,
              fieldPath: `items.${index}.description`,
            });
          }
        });
      }

      // Handle array items (for experienceCard, featureBoxes, accordion)
      if (component.props.array && Array.isArray(component.props.array)) {
        component.props.array.forEach((item: any, index: number) => {
          if (item.title) {
            fields.push({
              label: `${sectionName} Item ${index + 1} - Title`,
              value: item.title,
              key: `${component.id}-array-${index}-title`,
              componentId: component.id,
              fieldPath: `array.${index}.title`,
            });
          }
          if (item.description) {
            fields.push({
              label: `${sectionName} Item ${index + 1} - Description`,
              value: item.description,
              key: `${component.id}-array-${index}-description`,
              componentId: component.id,
              fieldPath: `array.${index}.description`,
            });
          }
        });
      }

      // Handle textArray (for textAndList)
      if (component.props.textArray && Array.isArray(component.props.textArray)) {
        component.props.textArray.forEach((item: any, index: number) => {
          if (item.title) {
            fields.push({
              label: `Feature ${index + 1} - Title`,
              value: item.title,
              key: `${component.id}-textArray-${index}-title`,
              componentId: component.id,
              fieldPath: `textArray.${index}.title`,
            });
          }
          if (item.description) {
            fields.push({
              label: `Feature ${index + 1} - Description`,
              value: item.description,
              key: `${component.id}-textArray-${index}-description`,
              componentId: component.id,
              fieldPath: `textArray.${index}.description`,
            });
          }
        });
      }

      // Handle testimonials
      if (component.props.testimonials && Array.isArray(component.props.testimonials)) {
        component.props.testimonials.forEach((testimonial: any, index: number) => {
          if (testimonial.quote) {
            fields.push({
              label: `Testimonial ${index + 1} - Quote`,
              value: testimonial.quote,
              key: `${component.id}-testimonial-${index}-quote`,
              componentId: component.id,
              fieldPath: `testimonials.${index}.quote`,
            });
          }
          if (testimonial.name) {
            fields.push({
              label: `Testimonial ${index + 1} - Name`,
              value: testimonial.name,
              key: `${component.id}-testimonial-${index}-name`,
              componentId: component.id,
              fieldPath: `testimonials.${index}.name`,
            });
          }
          if (testimonial.role) {
            fields.push({
              label: `Testimonial ${index + 1} - Role`,
              value: testimonial.role,
              key: `${component.id}-testimonial-${index}-role`,
              componentId: component.id,
              fieldPath: `testimonials.${index}.role`,
            });
          }
        });
      }

      // Handle contact info (for contactCloser)
      if (component.props.email) {
        fields.push({
          label: "Email",
          value: component.props.email,
          key: `${component.id}-email`,
          componentId: component.id,
          fieldPath: "email",
        });
      }

      if (component.props.phone) {
        fields.push({
          label: "Phone",
          value: component.props.phone,
          key: `${component.id}-phone`,
          componentId: component.id,
          fieldPath: "phone",
        });
      }

      if (fields.length > 0) {
        parsedSections.push({
          sectionNumber: sectionNumber++,
          sectionName,
          fields,
        });
      }
    });

    setSections(parsedSections);

    // Initialize form data
    const initialFormData: Record<string, string> = {};
    parsedSections.forEach((section) => {
      section.fields.forEach((field) => {
        initialFormData[field.key] = field.value;
      });
    });
    setFormData(initialFormData);
  }, []);

  const handleFieldChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Helper function to update nested object/array paths
      // Handles paths like: "title", "items.0.description", "array.1.title", "testimonials.2.quote"
      const updateNestedPath = (obj: any, path: string, value: string) => {
        const pathParts = path.split(".");
        
        // Simple case: direct property
        if (pathParts.length === 1) {
          obj[pathParts[0]] = value;
          return;
        }

        // Navigate to the parent object
        let current: any = obj;
        for (let i = 0; i < pathParts.length - 2; i++) {
          const part = pathParts[i];
          const nextPart = pathParts[i + 1];
          const isNextArrayIndex = !isNaN(parseInt(nextPart));

          if (!current[part]) {
            current[part] = isNextArrayIndex ? [] : {};
          }
          current = current[part];
        }

        // Now handle the last two parts (array index + property, or just property)
        const secondLast = pathParts[pathParts.length - 2];
        const last = pathParts[pathParts.length - 1];
        const isSecondLastArrayIndex = !isNaN(parseInt(secondLast));

        if (isSecondLastArrayIndex) {
          // Path like "items.0.description" or "array.1.title"
          const arrayName = pathParts[pathParts.length - 3];
          const index = parseInt(secondLast);
          if (current[arrayName] && Array.isArray(current[arrayName]) && current[arrayName][index]) {
            current[arrayName][index] = { ...current[arrayName][index], [last]: value };
          }
        } else {
          // Path like "images.main.src" (nested object)
          if (current[secondLast]) {
            current[secondLast] = { ...current[secondLast], [last]: value };
          } else {
            current[secondLast] = { [last]: value };
          }
        }
      };

      // Build the updated website data structure
      const updatedComponents = websiteData.pages[0].components.map((component) => {
        const componentFields = sections
          .flatMap((s) => s.fields)
          .filter((f) => f.componentId === component.id);

        if (componentFields.length === 0) return component;

        // Deep clone the props
        const updatedProps = JSON.parse(JSON.stringify(component.props));

        componentFields.forEach((field) => {
          const value = formData[field.key];
          if (value !== undefined && value !== field.value) {
            try {
              updateNestedPath(updatedProps, field.fieldPath, value);
            } catch (error) {
              console.error(`Error updating path ${field.fieldPath}:`, error);
            }
          }
        });

        return {
          ...component,
          props: updatedProps,
        };
      });

      const updatedWebsiteData = {
        ...websiteData,
        pages: [
          {
            ...websiteData.pages[0],
            components: updatedComponents,
          },
        ],
      };

      // Send to API
      const changes = sections.flatMap((s) =>
        s.fields
          .filter((f) => formData[f.key] !== f.value)
          .map((f) => ({
            section: s.sectionName,
            field: f.label,
            oldValue: f.value,
            newValue: formData[f.key],
          }))
      );

      const response = await fetch("/api/send-edits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          websiteData: updatedWebsiteData,
          originalData: websiteData,
          changes,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitStatus("success");
        setShowSuccessModal(true);
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting edits:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back to Homepage Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home size={16} />
            Back to Homepage
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Website Content</h1>
          <p className="text-gray-600">
            Make your changes below. When you're done, click "Send Changes" to email your updates.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {sections.map((section) => (
            <motion.div
              key={section.sectionNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: section.sectionNumber * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                Section {section.sectionNumber}: {section.sectionName}
              </h2>

              <div className="space-y-6">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <label
                      htmlFor={field.key}
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {field.label}
                    </label>
                    {field.label.toLowerCase().includes("description") ||
                    field.label.toLowerCase().includes("quote") ? (
                      <textarea
                        id={field.key}
                        value={formData[field.key] || ""}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        id={field.key}
                        value={formData[field.key] || ""}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                {submitStatus === "error" && (
                  <p className="text-red-600 font-medium">
                    ✗ Error sending changes. Please try again.
                  </p>
                )}
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Changes
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </form>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                  >
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>
                  <p className="text-gray-600">
                    The developer will update your website soon!
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

