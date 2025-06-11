"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { sports } from "@/lib/constants"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-black text-white relative">
      <div className="container mx-auto px-4 py-2">
        {/* Mobile Header */}
        <div className="sm:hidden">
          <div className="flex items-center justify-between py-2">
            {/* Logo - Left aligned and larger */}
            <Link href="/" className="text-3xl font-bold text-orange-500 tracking-widest">
              TOTALSPORTEK
            </Link>

            {/* Hamburger Menu - Right aligned */}
            <button
              onClick={toggleMenu}
              className="flex flex-col items-center justify-center w-8 h-8 space-y-1.5 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              ></div>
              <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></div>
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              ></div>
            </button>
          </div>
          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute left-0 right-0 top-full bg-black border-t border-gray-800 z-50">
              <nav className="py-4">
                {sports.map((sport, index) => (
                  <Link
                    key={sport.name}
                    href={sport.href}
                    onClick={closeMenu}
                    className="flex items-center px-6 py-3 text-md font-bold text-gray-400 hover:bg-gray-900 hover:text-orange-500 transition-colors"
                  >
                    <div className="flex items-center">
                      <span>{sport.name}</span>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* Overlay to close menu when clicking outside */}
          {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu}></div>}
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:block">
          <div className="flex flex-col items-center justify-start space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link href="/" className="text-2xl font-bold text-orange-500 md:text-2xl tracking-widest">
              TOTALSPORTEK
            </Link>
            <div className="h-4 sm:h-0 sm:w-0"></div>
            <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {sports.map((sport) => (
                <Link
                  key={sport.name}
                  href={sport.href}
                  className="text-xs hover:text-orange-500 md:text-sm tracking-widest transition-colors"
                >
                  {sport.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
