import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0F1419]">
      <Header />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}