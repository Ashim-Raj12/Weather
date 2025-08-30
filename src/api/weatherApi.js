/**
 * Fetch coordinates (latitude & longitude) for a given city name.
 * Uses Open-Meteo's geocoding API.
 */

export const getCoordinates = async (city) => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1`
  );
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }

  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude,
    name: data.results[0].name,
    country: data.results[0].country,
  };
};

/**
 * Fetch current weather conditions for a given latitude & longitude.
 * Uses Open-Meteo's forecast API with current_weather=true.
 */

export const getWeather = async (lat, lon) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );
  const data = await res.json();
  return data.current_weather;
};

/**
 * Perform reverse geocoding: Convert latitude & longitude into a city/location name.
 * Uses Open-Meteo's geocoding API.
 */

export const getReverseGeocoding = async (latitude, longitude) => {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?latitude=${latitude}&longitude=${longitude}&count=1`
    );
    const data = await res.json();

    if (data && data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        name: result.name || result.admin1 || result.admin2 || "Your Location",
        country: result.country || "",
        lat: latitude,
        lon: longitude,
      };
    }

    // Fallback if no results
    return {
      name: "Your Location",
      country: "",
      lat: latitude,
      lon: longitude,
    };
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return {
      name: "Your Location",
      country: "",
      lat: latitude,
      lon: longitude,
    };
  }
};
