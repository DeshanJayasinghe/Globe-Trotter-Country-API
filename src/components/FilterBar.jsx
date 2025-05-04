"use client"

import { useState, useEffect, useRef } from "react"
import { Filter, ChevronDown, X } from "lucide-react"

export default function FilterBar({
  onRegionChange,
  onLanguageChange,
  onReset,
  selectedRegion = "",
  allLanguages = [],
}) {
  const [regionsOpen, setRegionsOpen] = useState(false)
  const [languagesOpen, setLanguagesOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [currentRegion, setCurrentRegion] = useState("")

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

  const regionRef = useRef(null)
  const languageRef = useRef(null)

  const handleRegionSelect = (region) => {
    const newRegion = region === currentRegion ? "" : region
    setCurrentRegion(newRegion)
    onRegionChange(newRegion)
    setRegionsOpen(false)
  }

  const handleLanguageSelect = (language) => {
    const newLanguage = language === selectedLanguage ? "" : language
    setSelectedLanguage(newLanguage)
    onLanguageChange(newLanguage)
    setLanguagesOpen(false)
  }

  const handleReset = () => {
    setCurrentRegion("")
    setSelectedLanguage("")
    onReset()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        regionRef.current &&
        !regionRef.current.contains(event.target) &&
        languageRef.current &&
        !languageRef.current.contains(event.target)
      ) {
        setRegionsOpen(false)
        setLanguagesOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-4 md:space-y-0">
      <div className="flex items-center">
        <Filter className="h-5 w-5 text-gray-500 mr-2" />
        <span className="text-gray-700 font-medium">Filters:</span>
        {(selectedRegion || selectedLanguage) && (
          <button
            onClick={handleReset}
            className="ml-3 text-sm text-explorer-600 hover:text-explorer-800 flex items-center"
          >
            Reset <X className="h-4 w-4 ml-1" />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
        {/* Region Filter */}
        <div className="relative" ref={regionRef}>
          <button
            className={`flex items-center justify-between px-4 py-2 w-full sm:w-48 border rounded-md ${
              regionsOpen ? "border-explorer-500" : "border-gray-300"
            } ${currentRegion ? "bg-explorer-50" : "bg-white"}`}
            onClick={() => setRegionsOpen(!regionsOpen)}
          >
            <span className={currentRegion ? "text-explorer-800" : "text-gray-500"}>
              {currentRegion || "Select Region"}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${regionsOpen ? "transform rotate-180" : ""}`} />
          </button>

          {regionsOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {regions.map((region) => (
                <button
                  key={region}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    currentRegion === region ? "bg-explorer-50 text-explorer-800" : "text-gray-700"
                  }`}
                  onClick={() => handleRegionSelect(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Filter */}
        <div className="relative" ref={languageRef}>
          <button
            className={`flex items-center justify-between px-4 py-2 w-full sm:w-48 border rounded-md ${
              languagesOpen ? "border-explorer-500" : "border-gray-300"
            } ${selectedLanguage ? "bg-explorer-50" : "bg-white"}`}
            onClick={() => setLanguagesOpen(!languagesOpen)}
          >
            <span className={selectedLanguage ? "text-explorer-800" : "text-gray-500"}>
              {selectedLanguage || "Select Language"}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${languagesOpen ? "transform rotate-180" : ""}`} />
          </button>

          {languagesOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {allLanguages.map((language) => (
                <button
                  key={language}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    selectedLanguage === language ? "bg-explorer-50 text-explorer-800" : "text-gray-700"
                  }`}
                  onClick={() => handleLanguageSelect(language)}
                >
                  {language}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
