import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ChevronDown, Home, Building2, Users } from 'lucide-react'
import Logo3D from './Logo3D'
import ContactModal from './ContactModal'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setExpandedMenu(null)
  }

  const toggleSubMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu)
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl py-2 md:py-3 shadow-lg shadow-blue-900/5' 
          : 'bg-white/80 backdrop-blur-md py-3 md:py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo & Name Area - Mobile Optimized */}
          <Link to="/" className="flex items-center gap-2 md:gap-4 group cursor-pointer" onClick={closeMobileMenu}>
            <div className="relative scale-75 md:scale-100">
              <div className="absolute -inset-2 bg-blue-500/10 rounded-full blur-xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              <Logo3D />
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-[#0A1128] leading-tight">
                Vastu <span className="text-blue-600">Realty</span>
              </span>
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="h-px w-3 bg-blue-600"></span>
                <span className="text-[8px] md:text-[9px] uppercase font-bold tracking-[0.25em] text-slate-400">
                  Premium Estates
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Construction Nav */}
            <div className="relative group">
              <Link 
                to="/construction/list"
                className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors py-4 inline-block"
              >
                Construction
              </Link>
              <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="p-4 flex flex-col gap-3">
                  <span className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer">Residential</span>
                  <span className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer">Commercial</span>
                  <span className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer">Industrial</span>
                  <span className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer">Renovation</span>
                </div>
              </div>
            </div>

            {/* Buy/Rent Nav */}
            <div className="relative group">
              <Link 
                to="/buy-rent/list"
                className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors py-4 inline-block"
              >
                Buy/Rent
              </Link>
              <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="p-4 flex flex-col gap-3">
                  <span className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer">2 BHK Apartments</span>
                  <span className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer">3 BHK Apartments</span>
                  <span className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer">Villas</span>
                  <span className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer">Penthouses</span>
                </div>
              </div>
            </div>

            {/* Men Power Nav */}
            <div className="relative group">
              <Link 
                to="/men-power/list"
                className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors py-4 inline-block"
              >
                Men Power
              </Link>
              <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="p-4 flex flex-col gap-3">
                  <span className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer">Engineers</span>
                  <span className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer">Laborers</span>
                  <span className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer">Supervisors</span>
                  <span className="text-sm font-medium text-slate-600 hover:text-blue-600 cursor-pointer">Electricians</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Buttons + Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="hidden md:block text-sm font-bold text-[#0A1128] hover:text-blue-600 transition-colors px-4 py-2">
              Login
            </button>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="hidden sm:block px-4 md:px-6 py-2 md:py-2.5 bg-[#0A1128] text-white text-xs md:text-sm font-bold rounded-lg hover:bg-blue-600 transition-all transform hover:-translate-y-0.5 shadow-xl shadow-blue-900/10 active:scale-95"
            >
              Contact
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A1128] transition-all active:scale-95"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay & Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden transition-opacity"
            onClick={closeMobileMenu}
          />
          
          {/* Slide-in Menu */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-[70] lg:hidden shadow-2xl overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-2xl font-black text-[#0A1128]">Menu</h2>
                <button 
                  onClick={closeMobileMenu}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all active:scale-95"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {/* Home */}
                <Link 
                  to="/" 
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 text-[#0A1128] hover:text-blue-600 font-bold transition-all active:scale-95"
                >
                  <Home size={20} />
                  <span>Home</span>
                </Link>

                {/* Construction */}
                <div className="space-y-2">
                  <button 
                    onClick={() => toggleSubMenu('construction')}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 text-[#0A1128] hover:text-blue-600 font-bold transition-all active:scale-95"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 size={20} />
                      <span>Construction</span>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform ${expandedMenu === 'construction' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {expandedMenu === 'construction' && (
                    <div className="ml-4 space-y-1 pl-4 border-l-2 border-blue-200">
                      <Link to="/construction/list" onClick={closeMobileMenu} className="block p-3 text-slate-600 hover:text-blue-600 font-medium">All Projects</Link>
                      <div className="block p-3 text-slate-500 text-sm">Residential</div>
                      <div className="block p-3 text-slate-500 text-sm">Commercial</div>
                      <div className="block p-3 text-slate-500 text-sm">Industrial</div>
                      <div className="block p-3 text-slate-500 text-sm">Renovation</div>
                    </div>
                  )}
                </div>

                {/* Buy/Rent */}
                <div className="space-y-2">
                  <button 
                    onClick={() => toggleSubMenu('buyrent')}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 text-[#0A1128] hover:text-blue-600 font-bold transition-all active:scale-95"
                  >
                    <div className="flex items-center gap-3">
                      <Home size={20} />
                      <span>Buy/Rent Properties</span>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform ${expandedMenu === 'buyrent' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {expandedMenu === 'buyrent' && (
                    <div className="ml-4 space-y-1 pl-4 border-l-2 border-blue-200">
                      <Link to="/buy-rent/list" onClick={closeMobileMenu} className="block p-3 text-slate-600 hover:text-blue-600 font-medium">All Properties</Link>
                      <div className="block p-3 text-slate-500 text-sm">2 BHK Apartments</div>
                      <div className="block p-3 text-slate-500 text-sm">3 BHK Apartments</div>
                      <div className="block p-3 text-slate-500 text-sm">Villas</div>
                      <div className="block p-3 text-slate-500 text-sm">Penthouses</div>
                    </div>
                  )}
                </div>

                {/* Men Power */}
                <div className="space-y-2">
                  <button 
                    onClick={() => toggleSubMenu('menpower')}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 text-[#0A1128] hover:text-blue-600 font-bold transition-all active:scale-95"
                  >
                    <div className="flex items-center gap-3">
                      <Users size={20} />
                      <span>Men Power Services</span>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform ${expandedMenu === 'menpower' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {expandedMenu === 'menpower' && (
                    <div className="ml-4 space-y-1 pl-4 border-l-2 border-blue-200">
                      <Link to="/men-power/list" onClick={closeMobileMenu} className="block p-3 text-slate-600 hover:text-blue-600 font-medium">All Services</Link>
                      <div className="block p-3 text-slate-500 text-sm">Engineers</div>
                      <div className="block p-3 text-slate-500 text-sm">Laborers</div>
                      <div className="block p-3 text-slate-500 text-sm">Supervisors</div>
                      <div className="block p-3 text-slate-500 text-sm">Electricians</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => {
                    closeMobileMenu()
                    setIsContactModalOpen(true)
                  }}
                  className="w-full py-4 bg-[#0A1128] text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
                >
                  Contact Us
                </button>
                <button className="w-full py-4 bg-slate-100 text-[#0A1128] font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-95">
                  Login / Register
                </button>
              </div>

              {/* Footer Info */}
              <div className="pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
                <p className="font-medium">Available 24/7</p>
                <p className="text-blue-600 font-bold mt-1">+91 9953330277</p>
              </div>
            </div>
          </div>
        </>
      )}

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        title="Contact Vastu Realty"
      />
    </>
  )
}

export default Header
