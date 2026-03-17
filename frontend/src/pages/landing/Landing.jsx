import LandingNavbar from './../../components/Landingpage/LandingNavbar';
import Hero from './../../components/Landingpage/Hero';
import Stats from './../../components/Landingpage/Stats';
import Problem from './../../components/Landingpage/Problem';
import HowItWorks from './../../components/Landingpage/HowItWorks';
import Features from './../../components/Landingpage/Features';
import Comparison from './../../components/Landingpage/Comparison';
import Testimonials from './../../components/Landingpage/Testimonials';
import Pricing from './../../components/Landingpage/Pricing';
import FAQ from './../../components/Landingpage/FAQ';
import CTA from './../../components/Landingpage/CTA';
import LandingFooter from './../../components/Landingpage/Footer';

export default function Landing() {
  return (
    <div className="lp">
      <LandingNavbar />
      <Hero />
      <Stats />
      <Problem />
      <HowItWorks />
      <Features />
      <Comparison />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <LandingFooter />
    </div>
  );
}