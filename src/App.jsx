import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MediaCarousel from './components/MediaCarousel'
import PropertyListings from './components/PropertyListings'
import ConstructionListings from './components/ConstructionListings'
import MenPowerListings from './components/MenPowerListings'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'
import PropertyDetail from './pages/PropertyDetail'
import PropertyList from './pages/PropertyList'
import ConstructionDetail from './pages/ConstructionDetail'
import ConstructionList from './pages/ConstructionList'
import MenPowerDetail from './pages/MenPowerDetail'
import MenPowerList from './pages/MenPowerList'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

// Home Page Component
function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      <Header />
      
      <main className="pt-20 sm:pt-24 md:pt-32">
        <section className="relative overflow-hidden mb-8 md:mb-12 lg:mb-16">
          {/* Decorative Background Blur */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-100/30 blur-[120px] rounded-full -z-10 animate-pulse"></div>
          
          <div className="px-4 sm:px-6 mb-8 md:mb-12">
            <div className="mt-20 max-w-7xl mx-auto text-center space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#0A1128] tracking-tight leading-[1.1] px-2">
                Find Your <span className="text-blue-600">Perfect Place</span> <br className="hidden sm:block" />
                to Live and Prosper.
              </h1>
              <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-500 leading-relaxed font-medium px-4">
                We provide the most exclusive property listings in the region, 
                designed for comfort, luxury, and Vastu compliance.
              </p>
            </div>
          </div>

          {/* Media Carousel - Now Full Width Edge-to-Edge */}
          <div className="w-full">
            <MediaCarousel />
          </div>
        </section>

        {/* Property Listings Section */}
        <PropertyListings />

        {/* Construction Section */}
        <ConstructionListings />

        {/* Men Power Section */}
        <MenPowerListings />

        {/* About / Leadership Section */}
        <AboutSection />
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buy-rent/list" element={<PropertyList />} />
        <Route path="/buy-rent/:id" element={<PropertyDetail />} />
        <Route path="/construction/list" element={<ConstructionList />} />
        <Route path="/construction/:id" element={<ConstructionDetail />} />
        <Route path="/men-power/list" element={<MenPowerList />} />
        <Route path="/men-power/:id" element={<MenPowerDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

// skfjsl
