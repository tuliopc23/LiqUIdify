import Header from "../components/ui/Header";
import Hero from "../components/ui/Hero";
import Features from "../components/ui/Features";
import Install from "../components/ui/Install";
import CTA from "../components/ui/CTA";
import Footer from "../components/ui/Footer";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <Features />
      <Install />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
