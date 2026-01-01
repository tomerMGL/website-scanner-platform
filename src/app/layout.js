import { Heebo } from "next/font/google";
import "./globals.css";

import { WebScanProvider } from "./components/WebScanContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import waves from "@/app/assets/waves.webp";
import Image from "next/image";
import CookieConsent from "./components/CookieConsent";
import Script from "next/script";
import GoogleTagManager from "./components/GoogleTagManager";
import GoogleTagManagerNoScript from "./components/GoogleTagManagerNoScript";

const heebo = Heebo({
  subsets: ["hebrew"],
  display: "swap",
  variable: "--font-heebo",
  preload: true,
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "בדיקת ביצועי אתר - כלי חינמי לניתוח מהירות ו-SEO | AXIS Studio",
  description:
    "כלי חינמי לבדיקת ביצועי אתר, מהירות טעינה, SEO ונגישות. קבלו דוח מפורט עם המלצות מקצועיות לשיפור האתר תוך 30 שניות.",
  keywords: [
    "בדיקת אתר",
    "ביצועי אתר",
    "מהירות אתר",
    "pagespeed",
    "seo",
    "נגישות",
    "דוח ביצועים",
    "אופטימיזציה לאתר",
    "מהירות טעינה",
    "כלי אבחון אתרים",
    "ניתוח אתר אינטרנט",
  ],
  openGraph: {
    title: "בדיקת ביצועי אתר - כלי חינמי לניתוח מהירות ו-SEO",
    description: "קבלו דוח מפורט עם המלצות לשיפור האתר תוך 30 שניות",
    type: "website",
    locale: "he_IL",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/pub-og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "AXIS Website Scanner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "בדיקת ביצועי אתר - כלי חינמי לניתוח מהירות ו-SEO",
    description: "קבלו דוח מפורט עם המלצות לשיפור האתר תוך 30 שניות",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/pub-og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" className={heebo.className}>
      <head>
        <Script
          id="enable-accessibility"
          src="https://cdn.enable.co.il/licenses/enable-L23965u9cxre54n0-0124-69539/init.js"
          strategy="lazyOnload"
        />
        <GoogleTagManager />
      </head>
      <body className={`w-screen h-screen`}>
        <GoogleTagManagerNoScript />
        
        <div className="absolute inset-0 -z-10 bg-no-repeat bg-cover">
          <Image
            className="h-full w-full object-cover"
            src={waves}
            alt="גלים בגוונים של כחול"
            priority
            fill
            sizes="100vw"
          />
        </div>

        <Header />

        <main>
          <WebScanProvider>{children}</WebScanProvider>
        </main>
        <CookieConsent />
        <Footer />
      </body>
    </html>
  );
}
