"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"

interface DropdownOption {
  id: string
  name: string
  count?: number
}

interface CustomDropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Select option",
  className = "",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.id === value)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className={`relative z-10 ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-theme-primary border border-theme rounded-lg px-3 py-2 text-left text-theme-primary h-10 flex items-center justify-between hover:border-[#3B82F6]/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]/50"
      >
        <span className="truncate">
          {selectedOption ? (
            <>
              {selectedOption.name}
              {selectedOption.count !== undefined && (
                <span className="text-theme-secondary ml-1">({selectedOption.count})</span>
              )}
            </>
          ) : (
            placeholder
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-theme-secondary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-[100] w-full mt-1 bg-black/90 border border-gray-800/50 rounded-lg shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="max-h-60 overflow-y-auto scrollbar-premium">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.id)
                  setIsOpen(false)
                }}
                className={`w-full px-3 py-2.5 text-left hover:bg-[#3B82F6] hover:text-white transition-colors duration-150 flex items-center justify-between group ${
                  value === option.id ? "bg-[#3B82F6] text-white" : "text-gray-200 bg-black/90 hover:bg-[#3B82F6]"
                }`}
              >
                <span className="flex items-center">
                  {option.name}
                  {option.count !== undefined && (
                    <span
                      className={`ml-2 text-sm ${
                        value === option.id ? "text-white/70" : "text-gray-400 group-hover:text-white/70"
                      }`}
                    >
                      ({option.count})
                    </span>
                  )}
                </span>
                {value === option.id && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
