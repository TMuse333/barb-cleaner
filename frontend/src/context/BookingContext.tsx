"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

const FULLY_BOOKED_KEY = "btq_fully_booked";

interface BookingContextType {
  isFullyBooked: boolean;
  setIsFullyBooked: (value: boolean) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isFullyBooked, setIsFullyBookedState] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedValue = localStorage.getItem(FULLY_BOOKED_KEY);
    if (storedValue !== null) {
      setIsFullyBookedState(storedValue === "true");
    }
  }, []);

  // Sync to localStorage when value changes
  const setIsFullyBooked = (value: boolean) => {
    setIsFullyBookedState(value);
    localStorage.setItem(FULLY_BOOKED_KEY, String(value));
  };

  return (
    <BookingContext.Provider value={{ isFullyBooked, setIsFullyBooked }}>
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
