"use client"

import { useState, useRef, useEffect, useCallback } from "react"

export function EnhancedCarousel() {
  const [selectedId, setSelectedId] = useState<number>(1)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  const items = [
    {
      id: 1,
      title: "Product A",
      color: "bg-gradient-to-br from-red-400 to-red-600",
      content: "Premium Quality",
      price: "$99",
    },
    {
      id: 2,
      title: "Product B",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      content: "Best Seller",
      price: "$149",
    },
    {
      id: 3,
      title: "Product C",
      color: "bg-gradient-to-br from-green-400 to-green-600",
      content: "Eco Friendly",
      price: "$79",
    },
    {
      id: 4,
      title: "Product D",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      content: "Limited Edition",
      price: "$199",
    },
    {
      id: 5,
      title: "Product E",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      content: "New Arrival",
      price: "$129",
    },
    {
      id: 6,
      title: "Product F",
      color: "bg-gradient-to-br from-pink-400 to-pink-600",
      content: "Customer Favorite",
      price: "$89",
    },
  ]

  const scrollToCenter = useCallback((cardId: number) => {
    const container = scrollContainerRef.current
    const card = cardRefs.current[cardId]

    if (!container || !card) return

    setIsScrolling(true)

    const containerRect = container.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()

    const containerCenter = containerRect.width / 2
    const cardCenter = cardRect.left - containerRect.left + cardRect.width / 2
    const scrollLeft = container.scrollLeft + cardCenter - containerCenter

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    })

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Set scrolling to false after animation completes
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, 500)
  }, [])

  const handleCardClick = (cardId: number) => {
    if (selectedId !== cardId) {
      setSelectedId(cardId)
      scrollToCenter(cardId)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && selectedId > 1) {
        handleCardClick(selectedId - 1)
      } else if (e.key === "ArrowRight" && selectedId < items.length) {
        handleCardClick(selectedId + 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedId, items.length])

  // Auto-center the first card on mount
  useEffect(() => {
    setTimeout(() => scrollToCenter(1), 100)
  }, [scrollToCenter])

  return (
    <div className="relative w-full mt-12">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Enhanced Interactive Carousel</h2>

      {/* Selected Item Details */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-orange-200">
          <div
            className={`w-4 h-4 rounded-full ${items.find((item) => item.id === selectedId)?.color || "bg-gray-400"}`}
          />
          <div className="text-left">
            <div className="font-bold text-gray-800">{items.find((item) => item.id === selectedId)?.title}</div>
            <div className="text-sm text-gray-600">
              {items.find((item) => item.id === selectedId)?.content} •{" "}
              {items.find((item) => item.id === selectedId)?.price}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className={`overflow-x-auto scrollbar-hide ${isScrolling ? "cursor-wait" : "cursor-grab active:cursor-grabbing"}`}
        style={{
          mask: "linear-gradient(to right, transparent 0%, transparent 10%, black 20%, black 80%, transparent 90%, transparent 100%)",
          WebkitMask:
            "linear-gradient(to right, transparent 0%, transparent 10%, black 20%, black 80%, transparent 90%, transparent 100%)",
        }}
      >
        <div className="flex gap-6 pb-4 px-12" style={{ width: "max-content" }}>
          {items.map((item) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[item.id] = el
              }}
              onClick={() => handleCardClick(item.id)}
              className={`
                ${item.color} 
                rounded-2xl 
                p-8 
                flex-shrink-0 
                w-72 sm:w-80 md:w-88
                h-56 sm:h-60 md:h-64
                flex flex-col justify-between
                text-white font-semibold
                cursor-pointer
                transition-all duration-300 ease-out
                ${
                  selectedId === item.id
                    ? "scale-110 ring-4 ring-orange-300 ring-opacity-80 shadow-2xl transform z-10"
                    : "hover:scale-105 hover:shadow-xl shadow-lg"
                }
                ${isScrolling ? "pointer-events-none" : ""}
              `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl sm:text-3xl mb-2 font-bold">{item.title}</h3>
                  <p className="text-lg opacity-90">{item.content}</p>
                </div>
                {selectedId === item.id && (
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse flex-shrink-0" />
                )}
              </div>

              <div className="flex justify-between items-end">
                <div className="text-3xl font-bold">{item.price}</div>
                {selectedId === item.id && (
                  <div className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">Selected</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Navigation */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => selectedId > 1 && handleCardClick(selectedId - 1)}
          disabled={selectedId === 1}
          className="p-2 rounded-full bg-white bg-opacity-90 backdrop-blur-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow border border-orange-200"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex space-x-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className={`
                w-4 h-4 rounded-full transition-all duration-200
                ${selectedId === item.id ? `${item.color} scale-125 shadow-lg` : "bg-orange-200 hover:bg-orange-300"}
              `}
              aria-label={`Select ${item.title}`}
            />
          ))}
        </div>

        <button
          onClick={() => selectedId < items.length && handleCardClick(selectedId + 1)}
          disabled={selectedId === items.length}
          className="p-2 rounded-full bg-white bg-opacity-90 backdrop-blur-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow border border-orange-200"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center mt-4 text-sm text-gray-600">
        Click cards, use arrow keys, or navigation buttons • Selected item auto-centers
      </div>
    </div>
  )
}
