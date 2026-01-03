import React, { useState, useEffect, useRef } from 'react'

const MediaCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const videoRef = useRef(null)

  // Media playlist: video first, then images
  const mediaItems = [
    { type: 'video', src: 'xmGNrMZyhdE' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', alt: 'Luxury Modern Villa' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', alt: 'Premium Penthouse Interior' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', alt: 'Contemporary Beach House' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', alt: 'Architectural Masterpiece' },
  ]

  // Handle video end - advance to next item
  const handleVideoEnd = () => {
    advanceToNext()
  }

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
    if (currentItem.type === 'image') {
      const timer = setTimeout(() => {
        advanceToNext()
      }, 4000)
      return () => clearTimeout(timer)
    }

    // For YouTube videos, we listen for the 'ended' state through the API
    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.event === 'onStateChange' && data.info === 0) { // 0 is Ended
          advanceToNext()
        }
      } catch (e) {
        // Not a YouTube API message
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [currentIndex])

  const currentItem = mediaItems[currentIndex]

  return (
    <div className="w-full px-5 relative  z-0">
      <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-blue-900/20  bg-white aspect-21/9 md:aspect-28/9 lg:aspect-32/9">
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
          />
        )}

        {/* Progress Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-12' 
                  : 'bg-white/40 w-8 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Optional: Property Badge for Images */}
        {currentItem.type === 'image' && (
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full z-20">
            <span className="text-xs font-bold text-[#0A1128] uppercase tracking-wider">
              Featured Property
            </span>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-400/5 blur-[100px] rounded-full" />
    </div>
  )
}

export default MediaCarousel
