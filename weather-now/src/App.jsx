import React, { useState, useRef } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import { fetchWeatherData } from "./utils/weatherService.js";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#1a1a2e");
  const currentRequest = useRef(null);

  const updateBackground = (temp) => {
    if (typeof temp !== "number") return setBackgroundColor("#1a1a2e");

    let color = "#1a1a2e";
    if (temp <= 0) color = "#1e3a8a"; // cold
    else if (temp <= 10) color = "#3b82f6";
    else if (temp <= 20) color = "#60a5fa";
    else if (temp <= 30) color = "#f59e0b";
    else color = "#dc2626"; // hot
    setBackgroundColor(color);
  };

  const handleSearch = async (cityName) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);
    const requestId = Date.now();
    currentRequest.current = requestId;

    try {
      const data = await fetchWeatherData(cityName);
      if (currentRequest.current === requestId) {
        setWeather(data);
        updateBackground(data.temperature);
      }
    } catch (err) {
      if (currentRequest.current === requestId) {
        setError(err.message || "Unable to load weather data.");
      }
    } finally {
      if (currentRequest.current === requestId) setLoading(false);
    }
  };

  return (
      <div
        className="min-h-screen flex flex-col items-center justify-start text-center pt-10 transition-colors duration-[2000ms]"
        style={{ backgroundColor }}
      >

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Weather Now
      </h1>

      <SearchBar onSearch={handleSearch} />

      <div className="flex flex-col items-center justify-center flex-grow mt-6">
        {loading && (
          <p className="text-white/80 text-lg animate-pulse">
            Loading weather...
          </p>
        )}

        {!loading && error && <ErrorMessage message={error} />}

        {!loading && !error && weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
};

export default App;
