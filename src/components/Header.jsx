import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X, Earth, LogIn, User } from "lucide-react";
import { isAuthenticated, logout, getCurrentUser } from "../services/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = getCurrentUser();
  const authenticated = isAuthenticated();

  // Effect to detect scrolling for header style change
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Small delay to allow the input to be rendered before focusing
      setTimeout(() => {
        const searchInput = document.getElementById("search-input");
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md" 
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="bg-travel-gradient p-1.5 rounded-lg transition-transform group-hover:scale-110">
              <Earth className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">GlobeTrotter</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-full transition-colors hover:bg-black/5
                ${location.pathname === "/" 
                  ? "font-medium text-explorer-600" 
                  : "text-gray-700"
                }`}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className={`px-3 py-1.5 rounded-full transition-colors hover:bg-black/5
                ${location.pathname === "/explore" 
                  ? "font-medium text-explorer-600" 
                  : "text-gray-700"
                }`}
            >
              Explore
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSearch} 
              className="ml-2 text-gray-700"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            {authenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2 gap-2 border-explorer-100 bg-explorer-50 hover:bg-explorer-100 hover:text-explorer-700"
                  >
                    <User className="h-4 w-4" />
                    <span className="font-medium">{user?.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 animate-fade-in">
                  <DropdownMenuItem asChild>
                    <Link to="/favorites" className="cursor-pointer">
                      My Favorites
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                asChild
                size="sm" 
                variant="default" 
                className="bg-travel-gradient hover:opacity-90"
              >
                <Link to="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSearch} 
              className="text-gray-700"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar (Desktop & Mobile) */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-100 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search for a country..."
                  className="w-full pl-10 pr-12 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-explorer-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 pt-16 animate-fade-in md:hidden">
            <nav className="container mx-auto px-4 py-6">
              <div className="space-y-1">
                <Link
                  to="/"
                  className={`block px-4 py-3 rounded-lg transition-colors 
                    ${location.pathname === "/" 
                      ? "bg-explorer-50 text-explorer-600 font-medium" 
                      : "text-gray-700 hover:bg-gray-50"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/explore"
                  className={`block px-4 py-3 rounded-lg transition-colors 
                    ${location.pathname === "/explore" 
                      ? "bg-explorer-50 text-explorer-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Explore
                </Link>
                {authenticated ? (
                  <>
                    <Link
                      to="/favorites"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Favorites
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-explorer-600 font-medium hover:bg-explorer-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <LogIn className="h-5 w-5" />
                      <span>Sign In</span>
                    </div>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
