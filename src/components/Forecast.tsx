import React from "react";
import Image from "next/image";
import useWeather from "@/hooks/useWeather";

const Forecast: React.FC = () => {
  const { getFilteredForecast, getWeatherTip, API_ICON_URL } = useWeather();
  const forecastItems = getFilteredForecast();

  if (!forecastItems || forecastItems.length === 0) {
    return null;
  }

  return (
    <div className="forecast-display mt-10 animate-fade-in-up">
      <h3 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow-md">
        Prognos ✨
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {forecastItems.map((item, index) => {
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
              <Image
                src={`${API_ICON_URL}${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                width={64}
                height={64}
                className="forecast-icon mx-auto drop-shadow-lg"
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
