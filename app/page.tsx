import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import Navbar from "@/components/navbar"

export default function HomePage() {
  return (
  <div className="min-h-screen bg-white dark:bg-gray-900">
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <Footer />
  </div>
  )
}