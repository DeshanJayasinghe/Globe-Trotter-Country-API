"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { getCountryByCode } from "../services/api"
import { isAuthenticated, getCurrentUser } from "../services/auth"
import CountryList from "../components/CountryList"
import { Loader, Star } from "lucide-react"

export default function FavoritesPage() {
  const [favoriteCountries, setFavoriteCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadFavorites = async () => {
      // if (!isAuthenticated()) {
      //   setError("Please log in to view your favorites")
      //   setIsLoading(false)
      //   return
      // }

      const user = getCurrentUser()
      if (!user || user.favoriteCountries.length === 0) {
        setFavoriteCountries([])
        setIsLoading(false)
        return
      }

      try {
        const countriesData = []

        // Fetch each country by code
        for (const code of user.favoriteCountries) {
          try {
            const data = await getCountryByCode(code)
            if (data && data.length > 0) {
              countriesData.push(data[0])
            }
          } catch (err) {
            console.error(`Error fetching country ${code}:`, err)
          }
        }

        setFavoriteCountries(countriesData)
      } catch (err) {
        setError("Failed to load favorite countries")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadFavorites()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
          <Loader className="h-10 w-10 text-explorer-500 animate-spin" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Favorites</h1>
          <p className="text-gray-600 mb-6">Please log in to view and manage your favorite countries.</p>
          <Link
            to="/login"
            className="px-6 py-3 bg-explorer-600 text-white rounded-md hover:bg-explorer-700 transition-colors"
          >
            Sign In
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Star className="h-6 w-6 text-yellow-500 mr-3" fill="currentColor" />
          <h1 className="text-3xl font-bold text-gray-800">My Favorite Countries</h1>
        </div>

        {error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            <Link
              to="/explore"
              className="px-6 py-2 bg-explorer-600 text-white rounded-md hover:bg-explorer-700 transition-colors"
            >
              Explore Countries
            </Link>
          </div>
        ) : favoriteCountries.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 mb-6">You haven't added any countries to your favorites yet.</p>
            <Link
              to="/explore"
              className="px-6 py-2 bg-explorer-600 text-white rounded-md hover:bg-explorer-700 transition-colors"
            >
              Explore Countries
            </Link>
          </div>
        ) : (
          <CountryList countries={favoriteCountries} isLoading={false} />
        )}
      </main>

      <Footer />
    </div>
  )
}
