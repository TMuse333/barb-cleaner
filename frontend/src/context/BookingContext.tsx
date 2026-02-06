"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface BookingContextType {
  isFullyBooked: boolean;
  setIsFullyBooked: (value: boolean) => void;
  isLoading: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isFullyBooked, setIsFullyBookedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial status from API
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("/api/booking-status");
        const data = await response.json();
        setIsFullyBookedState(data.isFullyBooked);
      } catch (error) {
        console.error("Error fetching booking status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  // Update status via API
  const setIsFullyBooked = async (value: boolean) => {
    setIsFullyBookedState(value); // Optimistic update
    try {
      await fetch("/api/booking-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFullyBooked: value }),
      });
    } catch (error) {
      console.error("Error updating booking status:", error);
      setIsFullyBookedState(!value); // Revert on error
    }
  };

  return (
    <BookingContext.Provider value={{ isFullyBooked, setIsFullyBooked, isLoading }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
