import { useState, useEffect, useRef } from "react";

/**
 * WeatherForm Component
 * Provides a styled input field for searching cities:
 */

export default function WeatherForm({ onSearch }) {
  // Local state
  const [city, setCity] = useState(""); // Input value
  const [isLoading, setIsLoading] = useState(false); // Loading state for search
  const [suggestions, setSuggestions] = useState([]); // List of suggested cities
  const [showSuggestions, setShowSuggestions] = useState(false); // Dropdown visibility
  const [selectedIndex, setSelectedIndex] = useState(-1); // Keyboard navigation index

  // Refs for input & suggestions dropdown
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  /**
   * Custom hook: debounce a value
   * Prevents spamming API calls by waiting `delay` ms after typing stops
   */
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  // Debounced version of city input
  const debouncedCity = useDebounce(city, 300);

  /**
   * Fetch city suggestions from Open-Meteo Geocoding API
   */
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=5`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setSuggestions(data.results);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Refetch suggestions whenever debounced input changes
  useEffect(() => {
    if (debouncedCity) {
      fetchSuggestions(debouncedCity);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedCity]);

  /**
   * Submit handler: triggers onSearch callback
   */
  const handleSubmit = async (cityName = city) => {
    if (cityName.trim() !== "") {
      setIsLoading(true);
      setShowSuggestions(false);
      if (onSearch) {
        await onSearch(cityName.trim());
      }
      setCity(""); // Clear input after search
      setSuggestions([]);
      setIsLoading(false);
    }
  };

  /**
   * Handle keyboard navigation for suggestions
   */
  const handleKeyPress = (e) => {
    if (!showSuggestions) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          const selected = suggestions[selectedIndex];
          const cityName = selected.name;
          setCity(cityName);
          handleSubmit(cityName);
        } else {
          handleSubmit();
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  /** Handle clicking a suggestion */
  const handleSuggestionClick = (suggestion) => {
    const cityName = suggestion.name;
    setCity(cityName);
    handleSubmit(cityName);
  };

  /** Handle typing in input */
  const handleInputChange = (e) => {
    setCity(e.target.value);
    setSelectedIndex(-1);
  };

  /** Hide dropdown after blur (with small delay for click support) */
  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 150);
  };

  /** Show dropdown on focus if suggestions exist */
  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="relative">
        {/* Input box with glowing border */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1 shadow-lg">
            <div className="flex items-center">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Enter city name..."
                  value={city}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  disabled={isLoading}
                  className="w-full px-4 py-4 bg-transparent text-black placeholder-black/60 text-lg font-medium outline-none disabled:opacity-50"
                  autoComplete="off"
                />
              </div>
              <button
                onClick={() => handleSubmit()}
                disabled={isLoading || city.trim() === ""}
                className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 text-black rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 disabled:hover:scale-100 transition-all duration-200 mr-1 group"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <div className="text-lg font-bold">🔍</div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={`${suggestion.latitude}-${suggestion.longitude}-${index}`}
                className={`px-4 py-3 cursor-pointer transition-all duration-150 ${
                  index === selectedIndex
                    ? "bg-white/20 text-white"
                    : "text-black/90 hover:bg-white/10"
                } ${
                  index !== suggestions.length - 1
                    ? "border-b border-white/10"
                    : ""
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{suggestion.name}</div>
                    <div className="text-sm text-black/60">
                      {suggestion.admin1 && `${suggestion.admin1}, `}
                      {suggestion.country}
                    </div>
                  </div>
                  <div className="text-sm text-white/50">📍</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hint text */}
      <p className="text-center text-black/50 text-sm mt-4 font-light">
        Search for weather in any city worldwide
      </p>
    </div>
  );
}
