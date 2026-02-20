import "./globals.css";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import { BookingProvider } from "@/context/BookingContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.btqcleaning.ca'),
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
  alternates: {
    canonical: '/',
  },
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
    locale: "en_CA",
    siteName: "BTQ Cleaning | Halifax House Cleaning Services"
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTQ Cleaning | Professional Halifax House Cleaning Services',
    description: 'Professional Halifax house cleaning services with over 20 years of experience. Bonded, insured, and reliable.',
    images: ['https://www.btqcleaning.ca/logo.png'],
  },
  icons: {
    icon: ["/favicon.ico?v=4"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'nvnZ4JWtTBg7JAoI1G9BPXkRLZ2A12reck6lSYz5i6U',
  },
}

// Structured data for Local Business (helps Google understand this is a local service)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'BTQ Cleaning Services',
  description: 'Professional Halifax house cleaning services with over 20 years of experience. Bonded, insured, and reliable cleaning solutions.',
  url: 'https://www.btqcleaning.ca',
  telephone: '902-220-1089',
  email: 'btqcleaningservices@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Halifax',
    addressRegion: 'NS',
    addressCountry: 'CA'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 44.6488,
    longitude: -63.5752
  },
  areaServed: {
    '@type': 'City',
    name: 'Halifax',
    '@id': 'https://www.wikidata.org/wiki/Q2141'
  },
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00'
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=100063656887498'
  ],
  image: 'https://www.btqcleaning.ca/logo.png',
  serviceType: [
    'House Cleaning',
    'Deep Cleaning',
    'Residential Cleaning',
    'Eco-Friendly Cleaning'
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={poppins.className}>
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  )
}
