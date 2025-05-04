"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../services/auth"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Globe, LogIn } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required")
      return
    }

    try {
      setIsLoading(true)
      setError("")
      await login(username, password)
      navigate("/")
    } catch (err) {
      setError("Invalid username or password")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-explorer-600 to-explorer-800 py-6 px-8 text-white text-center">
            <Globe className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Sign In to GlobeTrotter</h1>
            <p className="mt-2 text-explorer-100">Access your favorite countries</p>
          </div>

          <form onSubmit={handleSubmit} className="py-8 px-8">
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">{error}</div>}

            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-explorer-500"
                placeholder="Enter username"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-explorer-500"
                placeholder="Enter password"
              />
              <p className="mt-1 text-sm text-gray-500">
                For demo purposes, use username: "demo" and password: "password"
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-3 flex justify-center items-center bg-explorer-600 text-white rounded-md font-medium hover:bg-explorer-700 transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </span>
              )}
            </button>
          </form>

          <div className="bg-gray-50 py-4 px-8 border-t border-gray-200">
            <p className="text-gray-600 text-center">
              Don't have an account? This is a demo app, so just use the credentials above.
            </p>
            <div className="mt-4 text-center">
              <Link to="/" className="text-explorer-600 hover:text-explorer-800">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
