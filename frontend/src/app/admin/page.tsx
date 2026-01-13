"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Home, ToggleLeft, ToggleRight } from "lucide-react";
import Link from "next/link";

const ADMIN_PASSWORD = "cleaner123!";
const FULLY_BOOKED_KEY = "btq_fully_booked";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFullyBooked, setIsFullyBooked] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");

  // Check localStorage on mount
  useEffect(() => {
    const storedValue = localStorage.getItem(FULLY_BOOKED_KEY);
    if (storedValue !== null) {
      setIsFullyBooked(storedValue === "true");
    }
  }, []);

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
    const newValue = !isFullyBooked;
    setIsFullyBooked(newValue);
    localStorage.setItem(FULLY_BOOKED_KEY, String(newValue));
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

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
      <div className="max-w-2xl mx-auto pt-12">
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
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Availability Status
          </h2>
          <p className="text-gray-600 mb-6">
            Toggle this to show or hide the "Fully Booked" banner on your website.
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

        {/* Logout hint */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Close this tab to log out
        </p>
      </div>
    </div>
  );
}
