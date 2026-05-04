import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "5fecofoundation",
  description: "Market intelligence terminal for salon lead generation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scrollbar-hide" suppressHydrationWarning>
      <body className="scrollbar-hide bg-[#0a0d08]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}