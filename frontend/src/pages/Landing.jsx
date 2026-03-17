import LandingNavbar from './Navbar';
import Hero from './Hero';
import Stats from './Stats';
import Problem from './Problem';
import HowItWorks from './HowItWorks';
import Features from './Features';
import Comparison from './Comparison';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import FAQ from './FAQ';
import CTA from './CTA';
import LandingFooter from './Footer';

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