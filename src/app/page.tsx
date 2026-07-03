import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import InsightFlow from "@/components/insight-flow/InsightFlow";
import DashboardPreview from "@/components/dashboard/DashboardPreview";
import SignatureSection from "@/components/signature/SignatureSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <InsightFlow />
        <DashboardPreview />
        <SignatureSection />
      </main>
      <Footer />
    </>
  );
}
