import Benefits from "@/components/Benefits";
import BlogSection from "@/components/BlogSection";
import Courses from "@/components/Courses";
import CtaComponent from "@/components/CtaComponent";
import Depositions from "@/components/Depositions";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import { SubscriptionForm } from "@/components/SubscriptionForm";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <Courses />
      <Benefits />
      <SubscriptionForm />
      <Depositions />
      <BlogSection />
      <FAQ />
      <CtaComponent />
      <Footer />
    </>
  );
}
