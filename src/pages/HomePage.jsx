"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"
import { getAllCountries } from "../services/api"
import { Earth, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { initAuth } from "../services/auth"

export default function HomePage() {
  const [featuredCountries, setFeaturedCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize authentication from localStorage if available
    initAuth()

    // Fetch some random countries for the featured section
    const fetchFeaturedCountries = async () => {
      try {
        const allCountries = await getAllCountries()

        // Get 3 random countries with population > 10 million for featured section
        const largePop = allCountries.filter((country) => country.population > 10000000)
        const shuffled = [...largePop].sort(() => 0.5 - Math.random())
        setFeaturedCountries(shuffled.slice(0, 3))
      } catch (error) {
        console.error("Error fetching featured countries:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedCountries()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-explorer-900 min-h-[85vh] flex items-center">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080"
            alt="World Map"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-explorer-900 via-explorer-900/90 to-explorer-900/80"></div>
        </div>
        
        <div className="container mx-auto px-4 pt-16 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover the World with GlobeTrotter
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Explore countries, cultures and destinations from around the globe. Your next adventure is just a click away.
            </p>
            
            <div className="max-w-xl mb-8">
              <SearchBar className="w-full" />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link
                to="/explore"
                className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 hover:text-white transition-colors"
              >
                All Countries
              </Link>
              <Link
                to="/regions"
                className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 hover:text-white transition-colors"
              >
                Browse by Region
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Countries Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Countries</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                      <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
                      <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  ))
              : featuredCountries.map((country) => (
                  <Link
                    key={country.cca3}
                    to={`/country/${country.cca3}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={country.flags.svg || "/placeholder.svg"}
                      alt={`Flag of ${country.name.common}`}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{country.name.common}</h3>
                      {country.capital && (
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-2 text-explorer-500" />
                          <span>{country.capital[0]}</span>
                        </div>
                      )}
                      <p className="text-gray-600">
                        <span className="font-medium">Region:</span> {country.region}
                      </p>
                      <button className="mt-4 px-4 py-2 bg-explorer-100 text-explorer-700 rounded-md hover:bg-explorer-200 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-explorer-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Discover the World?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Explore countries, learn about different cultures, and test your geography knowledge.
          </p>
          <Link
            to="/explore"
            className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 hover:text-white transition-colors inline-block"
          >
            Explore All Countries
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
