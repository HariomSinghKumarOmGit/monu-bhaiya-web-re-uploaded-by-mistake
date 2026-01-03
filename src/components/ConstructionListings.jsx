import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Building2, MapPin, Calendar } from 'lucide-react'
import { constructionProjects } from '../data/constructionData'

const ConstructionListings = () => {
  const scrollContainerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)


  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.offsetWidth * 0.8
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })

    setTimeout(() => updateScrollButtons(), 300)
  }

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.offsetWidth - 10
    )
  }

  // Auto-scroll effect (RIGHT to LEFT) with 3s pause
  // Auto-scroll effect (RIGHT to LEFT) with 3s pause
  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      const container = scrollContainerRef.current
      if (!container) return

      // Check if we've reached the end (with small buffer)
      const isAtEnd = container.scrollLeft >= container.scrollWidth - container.offsetWidth - 10
      
      if (isAtEnd) {
        // Reset to start instantly
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        // Scroll one card width (approx 350px)
        const scrollAmount = 350 
        container.scrollTo({
          left: container.scrollLeft + scrollAmount,
          behavior: 'smooth'
        })
      }

      setTimeout(() => updateScrollButtons(), 400)
    }, 3000)

    return () => clearInterval(autoScrollInterval)
  }, []) // Empty dependency array, continuous loop

  return (
    <section 
      className="py-16 px-5 bg-white"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-black text-[#0A1128]">Construction</h2>
        <Link to="/construction/list" className="px-6 py-2.5 bg-white border border-slate-200 text-[#0A1128] rounded-lg font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
          Show All →
        </Link>
      </div>

      {/* Construction Carousel */}
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center transition-all ${
            canScrollLeft 
              ? 'opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95' 
              : 'opacity-0 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-6 h-6 text-[#0A1128]" />
        </button>

        {/* Project Cards Container */}
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollButtons}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {constructionProjects.map((project) => (
            <Link
              key={project.id}
              to={`/construction/${project.id}`}
              className="flex-none w-[calc(33.333%-16px)] min-w-[320px] snap-start group/card"
            >
              <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                    {project.type}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0A1128] text-sm font-black rounded-full">
                    {project.status}
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-bold text-[#0A1128] line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    📍 {project.location}
                  </p>

                  {/* Project Stats */}
                  <div className="flex items-center gap-4 pt-2 border-t border-slate-200">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm font-semibold">{project.floors} Floors</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-semibold">{project.area} sq ft</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-semibold">{project.completionTime}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button className="w-full mt-3 py-2.5 bg-white text-[#0A1128] rounded-lg font-bold text-sm hover:bg-green-600 hover:text-white transition-all">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center transition-all ${
            canScrollRight 
              ? 'opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95' 
              : 'opacity-0 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-6 h-6 text-[#0A1128]" />
        </button>
      </div>
    </section>
  )
}

export default ConstructionListings
