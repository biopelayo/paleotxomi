import HeroSection from "@/components/home/HeroSection";
import FacetCards from "@/components/home/FacetCards";
import ExpoActualBanner from "@/components/home/ExpoActualBanner";

export default function HomePage() {
  return (
    <>
      <ExpoActualBanner />
      <HeroSection />
      <FacetCards />
    </>
  );
}
