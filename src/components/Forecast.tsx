// src/components/Forecast.tsx
import React from "react";
import { ForecastData, WeatherTip } from "@/types/weather.d";

interface ForecastProps {
  forecastData: ForecastData;
  getWeatherTip: (weatherId: number, temp: number, wind: number) => WeatherTip;
  iconUrl: string;
}

const Forecast: React.FC<ForecastProps> = ({
  forecastData,
  getWeatherTip,
  iconUrl,
}) => {
  if (!forecastData) return null;

  const getForecastItems = () => {
    const items = forecastData.list;
    const now = Date.now() / 1000;
    const forecast = [3, 6, 9, 12].map((hours) => {
      const targetTime = now + hours * 3600;
      return items.find(
        (item) => item.dt > now && Math.abs(item.dt - targetTime) <= 3600
      );
    });
    return forecast;
  };

  const forecastItems = getForecastItems();

  return (
    <div className="forecast-display mt-10 animate-fade-in-up">
      <h3 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow-md">
        Prognos ✨
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {forecastItems.map((item, index) => {
          if (!item) {
            return (
              <div
                key={index}
                className="forecast-item p-4 bg-gray-800/50 rounded-2xl text-center shadow-lg"
              >
                <p className="forecast-time font-bold text-lg text-gray-300">
                  Om {3 * (index + 1)} timmar
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Ingen prognos tillgänglig.
                </p>
              </div>
            );
          }
          const tip = getWeatherTip(
            item.weather[0].id,
            item.main.temp,
            item.wind.speed
          );
          return (
            <div
              key={item.dt}
              className="forecast-item p-4 bg-purple-900/50 rounded-2xl text-center shadow-lg transform transition-transform hover:scale-105"
            >
              <p className="forecast-time font-bold text-lg text-white">
                Om {3 * (index + 1)} timmar
              </p>
              <img
                src={`${iconUrl}${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                className="forecast-icon w-16 h-16 mx-auto drop-shadow-lg"
              />
              <p className="forecast-temp text-3xl font-bold text-white">
                {Math.round(item.main.temp)}°C
              </p>
              <p className="forecast-feels-like text-sm text-gray-200">
                Känns som: {Math.round(item.main.feels_like)}°C
              </p>
              <p className="forecast-desc text-xs text-gray-100">
                {item.weather[0].description.charAt(0).toUpperCase() +
                  item.weather[0].description.slice(1)}
              </p>
              <p className="forecast-tip text-xs mt-3 p-2 rounded-xl font-bold bg-pink-500 text-white leading-tight">
                {tip.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
