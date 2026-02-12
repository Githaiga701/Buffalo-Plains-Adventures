"use client";

import React from "react";
import "../src/index.css";
import Navbar from "@/next/Navbar";

export const metadata = {
  title: "Kenya Explorer",
  description: "Premium Kenya tours and safaris — mobile friendly and responsive",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden antialiased text-foreground bg-background">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <div className="min-h-screen">
          <Navbar />
          <main id="main-content" className="pt-20">{/* account for sticky navbar height */}
            <div className="max-w-7xl mx-auto px-4 md:px-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
