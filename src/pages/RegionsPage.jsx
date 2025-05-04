import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Earth, ArrowRight } from "lucide-react"

export default function RegionsPage() {
  const regions = [
    {
      name: "Africa",
      description: "Explore the diverse countries and cultures of the African continent.",
      imageUrl: "africa.jpg",
      color: "from-yellow-600 to-orange-600",
    },
    {
      name: "America",
      description: "Discover countries from North, Central, and South America.",
      imageUrl: "americas.jpg",
      color: "from-red-600 to-purple-600",
    },
    {
      name: "Asia",
      description: "Explore the countries of the world's largest and most populous continent.",
      imageUrl: "asia.jpg",
      color: "from-green-600 to-teal-600",
    },
    {
      name: "Europe",
      description: "Visit the diverse countries of the European continent.",
      imageUrl: "europe.jpg",
      color: "from-blue-600 to-indigo-600",
    },
    {
      name: "Oceania",
      description: "Discover the island countries of the Pacific Ocean.",
      imageUrl: "oceania.jpg",
      color: "from-cyan-600 to-blue-600",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Explore by Region</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover countries from different regions around the world. Click on a region to explore its countries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regions.map((region) => (
            <Link
              key={region.name}
              to={`/explore?region=${region.name}`}
              className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-60">
                <img
                  src={region.imageUrl || "/placeholder.svg"}
                  alt={`${region.name} region`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${region.color} opacity-60`}></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <Earth className="text-white mb-2 h-8 w-8" />
                  <h2 className="text-2xl font-bold text-white mb-1">{region.name}</h2>
                  <p className="text-white/90 mb-4">{region.description}</p>
                  <div className="flex items-center text-white font-medium">
                    Explore <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
