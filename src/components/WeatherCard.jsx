import React from "react";
import { getWeatherDescription } from "../utils/weatherDescriptions";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { text, icon } = getWeatherDescription(weather.weathercode);

  return (
    <div className="bg-white/10 backdrop-blur-md text-white rounded-2xl p-6 mt-6 shadow-lg max-w-md w-full">
      <h2 className="text-3xl font-bold mb-2 text-center">{weather.city}</h2>
      <p className="text-center text-lg text-gray-200 mb-2">As of {weather.time}</p>

      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-lg text-gray-200">{text}</p>
        <p className="text-6xl">{icon}</p>
        <p className="text-5xl font-bold">{weather.temperature}°C</p>
      </div>

      <div className="mt-4 text-center space-y-2">
        <p className="text-lg text-gray-200">Wind: {weather.windspeed} km/h</p>
        <p className="text-lg text-gray-200">
          Precipitation Probability:{" "}
          {weather.precipitation !== null ? `${weather.precipitation}%` : "N/A"}
        </p>

        {weather.floodDischarge !== null && weather.floodDischarge !== undefined ? (
          <p
            className={`text-lg ${
              weather.floodDischarge > 500
                ? "text-red-500 font-semibold"
                : "text-white/90"
            }`}
          >
            River Discharge: {weather.floodDischarge.toFixed(1)} m³/s{" "}
            {weather.floodDischarge > 500 ? "⚠️ High Flood Risk" : ""}
          </p>
        ) : (
          <p className="text-lg text-gray-300">Flood data unavailable</p>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
