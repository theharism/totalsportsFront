"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { web_sports, mobile_sports } from "@/lib/constants"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [sports, setSports] = useState(web_sports)
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) {
      setSports(mobile_sports)
    } else {
      setSports(web_sports)
    }
  }, [isMobile])

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`bg-black text-white relative transition-all duration-300 ${
      isScrolled ? 'shadow-2xl shadow-orange-500/20' : ''
    }`}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90"></div>
      
      <div className="container mx-auto px-4 py-2 relative z-10">
        {/* Mobile Header */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between py-3">
            {/* Logo - Enhanced with glow effect */}
            <Link 
              href="/" 
              className="text-2xl font-bold text-orange-500 tracking-widest hover:text-orange-400 transition-all duration-300 transform hover:scale-105"
              style={{
                textShadow: '0 0 20px rgba(249, 115, 22, 0.5)',
                filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.3))'
              }}
            >
              TOTALSPORTEK
            </Link>

            {/* Enhanced Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className="relative flex flex-col items-center justify-center w-10 h-10 space-y-1.5 focus:outline-none group p-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 group-hover:bg-orange-400 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
                style={{ boxShadow: isMenuOpen ? '0 0 10px rgba(249, 115, 22, 0.6)' : '' }}
              ></div>
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 group-hover:bg-orange-400 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 group-hover:bg-orange-400 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
                style={{ boxShadow: isMenuOpen ? '0 0 10px rgba(249, 115, 22, 0.6)' : '' }}
              ></div>
            </button>
          </div>

          {/* Enhanced Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute left-0 right-0 top-full bg-black border-t border-orange-500/30 z-50 backdrop-blur-lg">
              {/* Gradient border effect */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
              
              <nav className="py-4">
                {sports?.map((sport, index) => (
                  <Link
                    key={sport.name}
                    href={sport.href}
                    onClick={closeMenu}
                    className="group flex items-center px-6 py-4 text-md font-bold text-gray-300 hover:bg-gradient-to-r hover:from-gray-900/50 hover:via-orange-500/10 hover:to-gray-900/50 hover:text-orange-400 transition-all duration-300 border-l-2 border-transparent hover:border-orange-500"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isMenuOpen ? 'slideInFromRight 0.3s ease-out forwards' : ''
                    }}
                  >
                    <div className="flex items-center relative">
                      <span className="relative z-10 tracking-wide">{sport.name}</span>
                      <div className="absolute -left-2 w-1 h-6 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* Enhanced Overlay */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-all duration-300" 
              onClick={closeMenu}
              style={{ backdropFilter: 'blur(4px)' }}
            ></div>
          )}
        </div>

        {/* Enhanced Desktop Header */}
        <div className="hidden sm:block">
          <div className="flex flex-col items-center justify-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 py-2">
            {/* Enhanced Desktop Logo */}
            <Link 
              href="/" 
              className="text-2xl font-bold text-orange-500 md:text-2xl tracking-widest hover:text-orange-400 transition-all duration-300 transform hover:scale-105 relative"
              style={{
                textShadow: '0 0 20px rgba(249, 115, 22, 0.4)',
                filter: 'drop-shadow(0 0 6px rgba(249, 115, 22, 0.25))'
              }}
            >
              TOTALSPORTEK
              {/* Subtle underline effect */}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 hover:w-full transition-all duration-500"></div>
            </Link>

            {/* Decorative separator */}
            <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-orange-500/50 to-transparent"></div>

            {/* Enhanced Navigation */}
            <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {sports?.map((sport, index) => (
                <Link
                  key={sport.name}
                  href={sport.href}
                  className="group relative text-xs hover:text-orange-400 md:text-sm tracking-widest transition-all duration-300 font-medium text-gray-300 hover:transform hover:scale-110"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <span className="relative z-10">{sport.name}</span>
                  
                  {/* Hover effect background */}
                  <div className="absolute inset-x-0 -inset-y-1 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                  
                  {/* Animated underline */}
                  <div className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                  
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 15px rgba(249, 115, 22, 0.3)' }}></div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom border with gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
    </header>
  )
}

/* Add these CSS animations to your globals.css or component styles */
/*
@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
*/