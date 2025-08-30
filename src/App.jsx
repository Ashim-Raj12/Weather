import { useState, useEffect } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import { getCoordinates, getWeather, getReverseGeocoding } from "./api/weatherApi";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    try {
      // Clear previous data and errors when starting new search
      setError("");
      setWeather(null);
      setLocation(null);
      
      const coords = await getCoordinates(city);
      const weatherData = await getWeather(coords.lat, coords.lon);
      setWeather(weatherData);
      setLocation(coords);
    } catch (err) {
      // Clear any existing weather data when error occurs
      setWeather(null);
      setLocation(null);
      setError("City not found, try again.");
    }
  };

  const handleLocationSearch = async (latitude, longitude) => {
    try {
      // Clear previous data and errors when starting location search
      setError("");
      setWeather(null);
      setLocation(null);
      
      // Get weather data directly using coordinates
      const weatherData = await getWeather(latitude, longitude);
      
      // Get location name using reverse geocoding
      const locationData = await getReverseGeocoding(latitude, longitude);
      
      setWeather(weatherData);
      setLocation(locationData);
    } catch (err) {
      setWeather(null);
      setLocation(null);
      setError("Could not get weather for your location.");
    }
  };

  // Auto-detect location on app load
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords;
            
            // Get weather data
            const weatherData = await getWeather(latitude, longitude);
            
            // Get location name using the fixed reverse geocoding
            const locationData = await getReverseGeocoding(latitude, longitude);
            
            setWeather(weatherData);
            setLocation(locationData);
          } catch (err) {
            console.error("Weather fetch failed:", err);
            setError("Could not fetch weather for your location.");
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          // Don't show error on page load, just log it
          console.log("Location access denied or unavailable.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mt-6">🌤 Weather Go</h1>
      <WeatherForm onSearch={handleSearch} onLocationSearch={handleLocationSearch} />
      {error && <p className="text-red-500 mt-4 text-center font-medium">{error}</p>}
      <WeatherDisplay weather={weather} location={location} />
    </div>
  );
}