"use client"

import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleRiver } from "@/components/particle-river"

export function HeroSection() {
  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.webp"
          alt="Hero Background"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-theme-primary/20 via-theme-primary/60 to-theme-primary"></div>
      </div>

      {/* Grid Background Overlay */}
      <div className="absolute inset-0 z-1">
        <img
          src="/hero-grid.png"
          alt="Grid Background"
          className="object-cover opacity-5"
        />
      </div>

      {/* Particle River Effect */}
      <div className="absolute inset-0 h-full w-full z-5">
        <ParticleRiver />
      </div>

      {/* Top Glow Effect */}
      <div className="absolute left-[50%] top-[-20%] z-5 h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] translate-x-[-50%] bg-[#3B82F6] blur-[200px] opacity-80"></div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        {/* Trusted By Badge */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="bg-[#3B82F6]/10 text-xs flex flex-row items-center gap-2 pl-3 sm:pl-4 pr-6 sm:pr-8 py-1 rounded-full shadow-sm border border-[#3B82F6]/50 relative transform scale-100 sm:scale-107">
            <span className="text-theme-primary">Trusted By Komerza.com</span>
            <div className="absolute grid place-items-center top-1/2 -translate-y-1/2 right-[2px] text-white w-4 h-4 sm:w-5 sm:h-5 bg-[#3B82F6] rounded-full">
              <svg
                height="10"
                width="10"
                className="sm:h-3 sm:w-3"
                viewBox="0 0 18 18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="currentColor">
                  <path
                    d="M9 1.75L11.24 6.289L16.25 7.017L12.625 10.551L13.481 15.54L9 13.185L4.519 15.54L5.375 10.551L1.75 7.017L6.76 6.289L9 1.75Z"
                    fill="currentColor"
                    fillOpacity="0.3"
                    stroke="none"
                  ></path>
                  <path
                    d="M9 1.75L11.24 6.289L16.25 7.017L12.625 10.551L13.481 15.54L9 13.185L4.519 15.54L5.375 10.551L1.75 7.017L6.76 6.289L9 1.75Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-theme-primary text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center mx-auto mb-4 sm:mb-6 leading-tight max-w-5xl heading-semibold drop-shadow-2xl">
          Transform your ideas into
          <br />
          Reality with <span className="text-[#3B82F6]">Komerza</span>
        </h1>

        {/* Subheading */}
        <p className="text-theme-secondary text-sm sm:text-base text-center max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed drop-shadow-lg px-4">
          Expert web development services for stunning online experiences.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
          <Link to="/products">
            <Button className="w-full sm:w-auto bg-[#3B82F6] text-white hover:bg-[#2563EB] h-10 sm:h-8 px-6 sm:px-4 py-3 sm:py-2 rounded-md flex items-center justify-center gap-2 text-base sm:text-sm tracking-20-smaller transition-all duration-300 shadow-lg font-normal">
              <ArrowUpRight className="w-5 h-5 sm:w-4 sm:h-4" />
              <span>Products</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

