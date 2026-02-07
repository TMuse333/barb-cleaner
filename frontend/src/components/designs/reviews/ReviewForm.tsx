"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface ReviewFormProps {
  mainColor?: string;
  onSuccess?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  mainColor = "#3B82F6",
  onSuccess
}) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, review }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setName("");
        setRating(5);
        setReview("");
        onSuccess?.();
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Failed to submit review");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
      >
        <div className="text-green-600 text-4xl mb-3">✓</div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">Your review has been submitted and is pending approval.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm underline text-green-600 hover:text-green-800"
        >
          Submit another review
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Leave a Review</h3>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="John D."
        />
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="text-2xl transition-transform hover:scale-110"
              aria-label={`Rate ${star} stars`}
            >
              {star <= rating ? "★" : "☆"}
            </button>
          ))}
        </div>
      </div>

      {/* Review */}
      <div>
        <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
          Your Review
        </label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          maxLength={2000}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Share your experience with BTQ Cleaning..."
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 rounded-lg font-semibold text-white transition-colors disabled:opacity-50"
        style={{ backgroundColor: mainColor }}
      >
        {status === "submitting" ? "Submitting..." : "Submit Review"}
      </motion.button>
    </form>
  );
};

export default ReviewForm;
