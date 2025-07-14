// Alternative implementation using box-shadow approach
export function AlternativeCarousel() {
  const items = [
    { id: 1, title: "Item 1", color: "bg-cyan-400" },
    { id: 2, title: "Item 2", color: "bg-emerald-400" },
    { id: 3, title: "Item 3", color: "bg-violet-400" },
    { id: 4, title: "Item 4", color: "bg-rose-400" },
    { id: 5, title: "Item 5", color: "bg-amber-400" },
    { id: 6, title: "Item 6", color: "bg-teal-400" },
  ]

  return (
    <div className="relative w-full mt-12">
      <h2 className="text-2xl font-bold text-center mb-6">Alternative Approach</h2>

      <div className="fade-shadow bg-gray-50">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 p-4" style={{ width: "max-content" }}>
            {items.map((item) => (
              <div
                key={item.id}
                className={`
                  ${item.color} 
                  rounded-xl 
                  p-8 
                  flex-shrink-0 
                  w-56 sm:w-64 md:w-72
                  h-40 sm:h-44 md:h-48
                  flex items-center justify-center
                  text-white font-bold text-lg sm:text-xl
                  shadow-xl
                  transition-all duration-300 hover:scale-105 hover:shadow-2xl
                `}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
