import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { isAuthenticated, getCurrentUser, addFavoriteCountry, removeFavoriteCountry } from "../services/auth";

export default function CountryCard({ country }) {
  const user = getCurrentUser();
  const isFavorite = user?.favoriteCountries.includes(country.cca3) || false;
  const [favorite, setFavorite] = useState(isFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population);
  };

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated()) {
      alert("Please login to save favorite countries");
      return;
    }

    setIsLoading(true);
    try {
      if (favorite) {
        await removeFavoriteCountry(country.cca3);
        setFavorite(false);
      } else {
        await addFavoriteCountry(country.cca3);
        setFavorite(true);
      }
    } catch (error) {
      console.error("Failed to update favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link
      to={`/country/${country.cca3}`}
      className="country-card group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative flag-container h-44 overflow-hidden">
        <img
          src={country.flags.svg || "/placeholder.svg"}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {isAuthenticated() && (
          <button
            onClick={handleFavoriteToggle}
            disabled={isLoading}
            className={`absolute top-3 right-3 p-1.5 rounded-full shadow-md transition-all duration-300
              ${favorite 
                ? "bg-amber-400 text-amber-900" 
                : "bg-white/90 text-gray-500 opacity-0 group-hover:opacity-100"
              }`}
          >
            <Star className="h-4 w-4" fill={favorite ? "currentColor" : "none"} />
          </button>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-lg">{country.name.common}</h3>
        </div>
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-explorer-600 transition-colors duration-300">
          {country.name.common}
        </h3>
        <div className="space-y-1.5 text-sm text-gray-600">
          {country.capital && country.capital.length > 0 && (
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mr-1.5 mt-0.5 text-explorer-500 flex-shrink-0" />
              <span className="line-clamp-1">{country.capital[0]}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-gray-500">{country.region}</span>
            <span className="font-medium text-gray-700">{formatPopulation(country.population)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
