import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "5F ECO Foundation of India",
    template: "%s | 5F ECO Foundation of India",
  },

  description:
    "5F ECO Foundation of India is dedicated to wildlife rescue, environmental conservation, and restoration efforts across India. Join us in protecting nature and preserving our natural heritage.",

  keywords: [
    "5F ECO Foundation",
    "wildlife rescue India",
    "environment NGO India",
    "animal rescue",
    "forest conservation",
    "nature protection India",
    "eco foundation India",
  ],

  authors: [{ name: "5F ECO Foundation of India" }],
  creator: "5F ECO Foundation of India",

  metadataBase: new URL("https://yourdomain.com"),

  openGraph: {
    title: "5F ECO Foundation of India",
    description:
      "Protecting wildlife and preserving India’s natural heritage through rescue, conservation, and restoration efforts.",
    url: "https://yourdomain.com",
    siteName: "5F ECO Foundation of India",
    images: [
      {
        url: "/og-image.jpg", // 👉 add a real OG image (1200x630)
        width: 1200,
        height: 630,
        alt: "5F ECO Foundation Wildlife Conservation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "5F ECO Foundation of India",
    description:
      "Wildlife rescue and environmental conservation across India. Support our mission to protect nature.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body className="scrollbar-hide bg-[#0a0d08]">
        {children}
      </body>
    </html>
  );
}