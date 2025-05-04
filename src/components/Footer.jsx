
import { Earth, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white/10 p-1.5 rounded-lg">
                <Earth className="h-6 w-6 text-explorer-400" />
              </div>
              <span className="text-xl font-bold">GlobeTrotter</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              Explore the world's destinations, discover new cultures, and plan your next adventure with GlobeTrotter.
            </p>
            <div className="flex space-x-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <Github className="h-4 w-4 text-gray-300" />
              </a>
              <a 
                href="mailto:contact@globetrotter.example.com" 
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <Mail className="h-4 w-4 text-gray-300" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-400 hover:text-white transition-colors">
                  Explore Countries
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-400 hover:text-white transition-colors">
                  My Favorites
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Travel Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Regions */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Explore Regions</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Africa
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Americas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Asia
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Europe
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Oceania
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 GlobeTrotter. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Data provided by REST Countries API</p>
        </div>
      </div>
    </footer>
  );
}