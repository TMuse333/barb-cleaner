"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Home, ToggleLeft, ToggleRight, Check, X, Trash2 } from "lucide-react";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";

const ADMIN_PASSWORD = "cleaner123!";

interface Review {
  id: number;
  name: string;
  rating: number;
  review: string;
  approved: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");
  const { isFullyBooked, setIsFullyBooked } = useBooking();

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  const handleToggle = () => {
    setIsFullyBooked(!isFullyBooked);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

  // Fetch reviews when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchReviews();
    }
  }, [isAuthenticated]);

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const response = await fetch("/api/reviews/admin");
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleApprove = async (id: number, approved: boolean) => {
    try {
      await fetch("/api/reviews/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved }),
      });
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, approved } : r))
      );
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await fetch("/api/reviews/admin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const renderStars = (rating: number) => "★".repeat(rating) + "☆".repeat(5 - rating);

  // Password Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-gray-600 mt-2">Enter password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
                autoFocus
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-center text-sm"
              >
                {error}
              </motion.p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Unlock
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Home size={16} />
              Back to Homepage
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="max-w-4xl mx-auto pt-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Unlock className="w-5 h-5 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Home size={16} />
              View Site
            </Link>
          </div>
        </motion.div>

        {/* Fully Booked Toggle Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Availability Status
          </h2>
          <p className="text-gray-600 mb-6">
            Toggle this to show or hide the &quot;Fully Booked&quot; banner on your website.
          </p>

          <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-900">
                {isFullyBooked ? "Currently Fully Booked" : "Currently Available"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {isFullyBooked
                  ? "A red banner is showing on your website"
                  : "No banner is displayed"}
              </p>
            </div>

            <button
              onClick={handleToggle}
              className="focus:outline-none"
              aria-label={isFullyBooked ? "Set as available" : "Set as fully booked"}
            >
              {isFullyBooked ? (
                <ToggleRight className="w-14 h-14 text-red-500 hover:text-red-600 transition-colors" />
              ) : (
                <ToggleLeft className="w-14 h-14 text-gray-400 hover:text-gray-500 transition-colors" />
              )}
            </button>
          </div>

          {/* Status indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: saveStatus === "saved" ? 1 : 0 }}
            className="mt-4 text-center text-green-600 font-medium"
          >
            ✓ Changes saved
          </motion.div>

          {/* Preview */}
          {isFullyBooked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <div className="bg-red-600 text-white text-center py-3 px-4 rounded-lg font-semibold">
                We are currently fully booked
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Reviews Management Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Review Management
          </h2>
          <p className="text-gray-600 mb-6">
            Approve or reject customer reviews before they appear on your website.
          </p>

          {reviewsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reviews yet
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className={`p-4 rounded-xl border-2 ${
                    review.approved
                      ? "border-green-200 bg-green-50"
                      : "border-yellow-200 bg-yellow-50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-semibold text-gray-900">{review.name}</span>
                      <span className="ml-2 text-yellow-500">{renderStars(review.rating)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          review.approved
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {review.approved ? "Approved" : "Pending"}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">&quot;{review.review}&quot;</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      {!review.approved && (
                        <button
                          onClick={() => handleApprove(review.id, true)}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          title="Approve"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      {review.approved && (
                        <button
                          onClick={() => handleApprove(review.id, false)}
                          className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                          title="Unapprove"
                        >
                          <X size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Logout hint */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Close this tab to log out
        </p>
      </div>
    </div>
  );
}
