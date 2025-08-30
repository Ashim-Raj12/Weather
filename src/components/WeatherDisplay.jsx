import React from "react";

/**
 * WeatherDisplay Component
 *
 * Displays current weather details in a styled card:
 * - Location name & country
 * - Weather emoji (based on weather code)
 * - Temperature & feels-like
 * - Wind speed + direction
 * - Last updated time
 */

const WeatherDisplay = ({ weather, location }) => {
  if (!weather || !location) {
    return null; // If no data, render nothing
  }

  /**
   * Get emoji representation for Open-Meteo weather codes.
   */

  const getWeatherEmoji = (code) => {
    const weatherCodes = {
      0: "☀️", // Clear sky
      1: "🌤️", // Mainly clear
      2: "⛅", // Partly cloudy
      3: "☁️", // Overcast
      45: "🌫️", // Fog
      48: "🌫️", // Depositing rime fog
      51: "🌦️", // Light drizzle
      53: "🌦️", // Moderate drizzle
      55: "🌦️", // Dense drizzle
      61: "🌧️", // Slight rain
      63: "🌧️", // Moderate rain
      65: "🌧️", // Heavy rain
      71: "🌨️", // Slight snow
      73: "🌨️", // Moderate snow
      75: "❄️", // Heavy snow
      77: "🌨️", // Snow grains
      80: "🌦️", // Slight rain showers
      81: "🌧️", // Moderate rain showers
      82: "⛈️", // Violent rain showers
      85: "🌨️", // Slight snow showers
      86: "❄️", // Heavy snow showers
      95: "⛈️", // Thunderstorm
      96: "⛈️", // Thunderstorm with slight hail
      99: "⛈️", // Thunderstorm with heavy hail
    };
    return weatherCodes[code] || "🌤️"; // Default fallback
  };

  /**
   * Convert wind direction degrees into compass direction.
   */

  const getWindDirection = (degrees) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  /**
   * Format ISO time string into human-readable time.
   */

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="relative group">
        {/* Glowing animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

        {/* Main weather card */}
        <div className="relative bg-white/15 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-2xl">
          {/* Location header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-black mb-1">
              {location.name}
            </h2>
            <p className="text-black/70 text-sm font-medium">
              📍 {location.country}
            </p>
          </div>

          {/* Main temperature + emoji */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">
              {getWeatherEmoji(weather.weathercode)}
            </div>
            <div className="text-5xl font-bold text-black mb-2">
              {Math.round(weather.temperature)}°
            </div>
            <div className="text-black/80 text-lg">
              Feels like {Math.round(weather.temperature)}°C
            </div>
          </div>

          {/* Weather details (wind + direction) */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Wind speed */}
            <div className="bg-black/10 rounded-2xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl mb-2">💨</div>
              <div className="text-black/70 text-xs font-medium mb-1">WIND</div>
              <div className="text-black font-bold">
                {weather.windspeed} km/h
              </div>
              <div className="text-black/60 text-xs">
                {getWindDirection(weather.winddirection)}
              </div>
            </div>

            {/* Wind direction */}
            <div className="bg-black/10 rounded-2xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl mb-2">🧭</div>
              <div className="text-black/70 text-xs font-medium mb-1">
                DIRECTION
              </div>
              <div className="text-black font-bold">
                {weather.winddirection}°
              </div>
              <div className="text-black/60 text-xs">
                {getWindDirection(weather.winddirection)}
              </div>
            </div>
          </div>

          {/* Last updated time */}
          <div className="bg-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
            <div className="text-2xl mb-2">🕐</div>
            <div className="text-black/70 text-xs font-medium mb-1">
              LAST UPDATED
            </div>
            <div className="text-black font-bold">
              {formatTime(weather.time)}
            </div>
          </div>

          {/* Small glowing decorations */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-6 left-4 w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
