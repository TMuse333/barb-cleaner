import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BTQ Cleaning | Professional Halifax House Cleaning Services",
  description: "Professional Halifax house cleaning services with over 20 years of experience. Bonded, insured, and reliable cleaning solutions for your home. Serving Halifax and surrounding areas with customized cleaning plans and pet-friendly products.",
  keywords: [
    "Halifax house cleaning services",
    "Halifax house cleaning",
    "house cleaning Halifax",
    "cleaning services Halifax Nova Scotia",
    "professional cleaning Halifax",
    "BTQ Cleaning",
    "residential cleaning Halifax",
    "deep cleaning Halifax",
    "Halifax cleaning company",
    "eco-friendly cleaning Halifax",
    "pet-friendly cleaning Halifax"
  ],
  openGraph: {
    title: "BTQ Cleaning | Professional Halifax House Cleaning Services",
    description: "Professional Halifax house cleaning services with over 20 years of experience. Bonded, insured, and reliable cleaning solutions for your home. Serving Halifax and surrounding areas.",
    url: "https://www.btqcleaning.ca",
    images: [
      {
        url: "https://www.btqcleaning.ca/logo.png",
        width: 1200,
        height: 630,
        alt: "BTQ Cleaning | Professional Halifax House Cleaning Services"
      }
    ],
    type: "website",
    locale: "en_US",
    siteName: "BTQ Cleaning | Halifax House Cleaning Services"
  },
  icons: {
    icon: ["/favicon.ico?v=4"]
  },
  // manifest: '/site.webmanifest'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
