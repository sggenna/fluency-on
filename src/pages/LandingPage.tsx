import React from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Courses } from "../components/Courses";
import { Methodology } from "../components/Methodology";
import { Pricing } from "../components/Pricing";
import { FreeResources } from "../components/FreeResources";
import { ClassSchedule } from "../components/ClassSchedule";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Courses />
        <Methodology />
        <Pricing />
        <ClassSchedule />
        <Testimonials />
        <FAQ />
        <CTA />
        <FreeResources />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

