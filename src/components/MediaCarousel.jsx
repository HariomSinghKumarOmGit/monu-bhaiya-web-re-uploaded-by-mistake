import React, { useState, useEffect, useRef } from 'react'

const MediaCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRef = useRef(null)

  // Media playlist: video first, then images
  const mediaItems = [
    { type: 'video', src: 'xmGNrMZyhdE' },
    { type: 'image', src: 'https://i.im.ge/2026/01/12/GUqMrG.WhatsApp-Image-2026-01-03-at-11-57-35.jpeg', alt: 'Featured Project 1' },
    { type: 'image', src: 'https://i.im.ge/2026/01/12/GUqT8a.WhatsApp-Image-2026-01-12-at-20-54-51-2.jpeg', alt: 'Featured Project 2' },
    { type: 'image', src: 'https://i.im.ge/2026/01/12/GUqXMJ.WhatsApp-Image-2026-01-12-at-20-54-54.jpeg', alt: 'Featured Project 3' },
    { type: 'image', src: 'https://i.im.ge/2026/01/12/GUqrxS.WhatsApp-Image-2026-01-12-at-20-54-50-1.jpeg', alt: 'Featured Project 4' },
  ]

  // Advance to next item with transition
  const advanceToNext = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length)
      setIsTransitioning(false)
    }, 500)
  }

  // Auto-advance items
  useEffect(() => {
    const currentItem = mediaItems[currentIndex]
    
    // For images, advance after 4s
    // For the video, advance after 2 minutes and 5 seconds (125,000ms)
    const delay = currentItem.type === 'image' ? 4000 : 125000;
    
    const timer = setTimeout(() => {
      advanceToNext()
    }, delay)
    
    return () => clearTimeout(timer)
  }, [currentIndex])

  const currentItem = mediaItems[currentIndex]

  return (
    <div className="w-full px-3 sm:px-4 md:px-5 relative z-0">
      <div className="relative rounded-2xl sm:rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl shadow-blue-900/20 bg-white aspect-video sm:aspect-21/9 md:aspect-28/9 lg:aspect-32/9">
        {/* Transition Overlay */}
        <div 
          className={`absolute inset-0 bg-black z-30 transition-opacity duration-500 ${
            isTransitioning ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* YouTube Video with Edge-to-Edge Coverage (Simulating object-fit: cover) */}
        {currentItem.type === 'video' && (
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <iframe
                className="w-[200vmax] h-[200vmax] min-w-full min-h-full max-w-none scale-150"
                src={`https://www.youtube.com/embed/${currentItem.src}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&disablekb=1&fs=0`}
                title="Vastu Realty Featured"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
            {/* Dark overlay for better text readability and premium feel */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-slate-900/20" />
          </div>
        )}

        {/* Image - Forced absolute inset for edge-to-edge */}
        {currentItem.type === 'image' && (
          <img
            src={currentItem.src}
            alt={currentItem.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {/* Progress Indicators - Mobile Optimized */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
          {mediaItems.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true)
                setTimeout(() => {
                  setCurrentIndex(index)
                  setIsTransitioning(false)
                }, 300)
              }}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 touch-manipulation active:scale-95 ${
                index === currentIndex 
                  ? 'bg-white w-8 sm:w-10 md:w-12' 
                  : 'bg-white/40 w-6 sm:w-7 md:w-8 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Optional: Property Badge for Images - Mobile Optimized */}
        {currentItem.type === 'image' && (
          <div className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full z-20">
            <span className="text-[10px] sm:text-xs font-bold text-[#0A1128] uppercase tracking-wider">
              Featured Property
            </span>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[350px] md:h-[400px] bg-blue-400/5 blur-[80px] sm:blur-[100px] rounded-full" />
    </div>
  )
}

export default MediaCarousel
