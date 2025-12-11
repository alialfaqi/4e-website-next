"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import i18n from "../lib/i18n";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize i18next
    i18n.init();
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
