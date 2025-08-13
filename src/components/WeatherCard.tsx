import React from "react";
import { WeatherData, WeatherTip } from "@/types/weather.d";

interface WeatherCardProps {
  weatherData: WeatherData;
  weatherTip: WeatherTip;
  iconUrl: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  weatherTip,
  iconUrl,
}) => {
  if (!weatherData) return null;

  const { name, main, weather, wind } = weatherData;

  return (
    <div className="weather-card bg-white/20 p-8 rounded-3xl shadow-xl text-center w-full max-w-2xl backdrop-blur-md animate-fade-in">
      <h2 className="text-3xl font-extrabold text-white mb-2">{name}</h2>
      <div className="flex flex-col items-center justify-center my-4">
        <img
          src={iconUrl}
          alt={weather[0].description}
          className="weather-icon w-32 h-32 my-3 mx-auto drop-shadow-lg"
        />
        <p className="temperature text-6xl font-bold text-white drop-shadow-md">
          {Math.round(main.temp)}°C
        </p>
        <p className="feels-like text-lg text-white/80">
          Känns som: {Math.round(main.feels_like)}°C
        </p>
      </div>
      <p className="description text-xl font-medium mb-2">
        {weather[0].description.charAt(0).toUpperCase() +
          weather[0].description.slice(1)}
      </p>
      <div className="flex justify-center gap-6 text-lg text-white/90 font-medium">
        <p>Luftfuktighet: {main.humidity}%</p>
        <p>Vindhastighet: {wind.speed} m/s</p>
      </div>
      <p className="weather-tip mt-6 p-4 text-2xl font-black rounded-3xl bg-purple-700 text-white animate-pulse-slow drop-shadow-lg">
        <span className="mr-2 text-3xl">{weatherTip.emoji}</span>
        {weatherTip.text}
      </p>
    </div>
  );
};

export default WeatherCard;
