import Benefits from "@/components/Home/Benefits";
import BlogSection from "@/components/Home/BlogSection";
import Courses from "@/components/Home/Courses";
import CtaComponent from "@/components/Home/CtaComponent";
import Depositions from "@/components/Home/Depositions";
import FAQ from "@/components/Home/FAQ";
import Hero from "@/components/Home/Hero";

import Stats from "@/components/Home/Stats";
import { SubscriptionForm } from "@/components/Home/SubscriptionForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Courses />
      <Benefits />
      <SubscriptionForm />
      <Depositions />
      <BlogSection />
      <FAQ />
      <CtaComponent />
    </>
  );
}
