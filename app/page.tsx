"use client"

import { useState, useRef, useEffect } from "react"
import { EnhancedCarousel } from "@/components/enhanced-carousel"

export default function Home() {
  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: "#FFECE1" }}>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Interactive Fade Masked Carousel</h1>
        <FadeCarousel />
        <EnhancedCarousel />
      </div>
    </div>
  )
}

function FadeCarousel() {
  const [selectedId, setSelectedId] = useState<number>(1)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  const items = [
    { id: 1, title: "Slide 1", color: "bg-red-400", content: "First slide content" },
    { id: 2, title: "Slide 2", color: "bg-blue-400", content: "Second slide content" },
    { id: 3, title: "Slide 3", color: "bg-green-400", content: "Third slide content" },
    { id: 4, title: "Slide 4", color: "bg-yellow-400", content: "Fourth slide content" },
    { id: 5, title: "Slide 5", color: "bg-purple-400", content: "Fifth slide content" },
    { id: 6, title: "Slide 6", color: "bg-pink-400", content: "Sixth slide content" },
    { id: 7, title: "Slide 7", color: "bg-indigo-400", content: "Seventh slide content" },
    { id: 8, title: "Slide 8", color: "bg-orange-400", content: "Eighth slide content" },
  ]

  const scrollToCenter = (cardId: number) => {
    const container = scrollContainerRef.current
    const card = cardRefs.current[cardId]

    if (!container || !card) return

    const containerRect = container.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()

    // Calculate the scroll position to center the card
    const containerCenter = containerRect.width / 2
    const cardCenter = cardRect.left - containerRect.left + cardRect.width / 2
    const scrollLeft = container.scrollLeft + cardCenter - containerCenter

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    })
  }

  const handleCardClick = (cardId: number) => {
    setSelectedId(cardId)
    scrollToCenter(cardId)
  }

  // Auto-center the first card on mount
  useEffect(() => {
    setTimeout(() => scrollToCenter(1), 100)
  }, [])

  return (
    <div className="relative w-full">
      {/* Selected Card Info */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-orange-200">
          <div
            className={`w-3 h-3 rounded-full ${items.find((item) => item.id === selectedId)?.color || "bg-gray-400"}`}
          />
          <span className="font-medium text-gray-700">
            Selected: {items.find((item) => item.id === selectedId)?.title}
          </span>
        </div>
      </div>

      {/* Carousel Container with Fade Mask */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{
          mask: "linear-gradient(to right, #FFECE1 0%, rgba(255, 236, 225, 0.8) 5%, transparent 8%, transparent 92%, rgba(255, 236, 225, 0.8) 95%, #FFECE1 100%)",
          WebkitMask:
            "linear-gradient(to right, #FFECE1 0%, rgba(255, 236, 225, 0.8) 5%, transparent 8%, transparent 92%, rgba(255, 236, 225, 0.8) 95%, #FFECE1 100%)",
        }}
      >
        <div className="flex gap-4 pb-4 px-8" style={{ width: "max-content" }}>
          {items.map((item) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[item.id] = el
              }}
              onClick={() => handleCardClick(item.id)}
              className={`
                ${item.color} 
                rounded-lg 
                p-6 
                flex-shrink-0 
                w-64 sm:w-72 md:w-80 
                h-48 sm:h-52 md:h-56
                flex flex-col justify-center items-center
                text-white font-semibold
                shadow-lg
                cursor-pointer
                transition-all duration-300
                ${
                  selectedId === item.id
                    ? "scale-105 ring-4 ring-orange-300 ring-opacity-60 shadow-2xl transform"
                    : "hover:scale-102 hover:shadow-xl"
                }
              `}
            >
              <h3 className="text-xl sm:text-2xl mb-2 relative">
                {item.title}
                {selectedId === item.id && (
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-white rounded-full animate-pulse" />
                )}
              </h3>
              <p className="text-sm sm:text-base text-center opacity-90">{item.content}</p>
              {selectedId === item.id && (
                <div className="mt-2 text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">Selected</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleCardClick(item.id)}
            className={`
              w-3 h-3 rounded-full transition-all duration-200
              ${selectedId === item.id ? `${item.color} scale-125 shadow-md` : "bg-orange-200 hover:bg-orange-300"}
            `}
            aria-label={`Select ${item.title}`}
          />
        ))}
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="text-center mt-4 text-sm text-gray-600">Click on any card or dot to select and center it</div>
    </div>
  )
}
