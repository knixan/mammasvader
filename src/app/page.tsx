// src/app/page.tsx
"use client"; // Detta markerar komponenten som en Client Component

import useWeather from "@/hooks/useWeather";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import WeatherCard from "@/components/WeatherCard";
import Forecast from "@/components/Forecast";
import Footer from "@/components/Footer";

export default function Home() {
  const {
    city,
    setCity,
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeatherData,
    getWeatherTip,
    API_ICON_URL,
  } = useWeather();

  const handleSearch = () => {
    fetchWeatherData(city);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white">
      <Header />
      <main className="w-full max-w-3xl flex-grow flex flex-col items-center">
        <div className="weather-card bg-indigo-900/40 p-8 rounded-3xl shadow-2xl text-center w-full backdrop-blur-lg border border-white/10">
          <SearchInput city={city} setCity={setCity} onSearch={handleSearch} />

          {loading && (
            <div className="text-xl mt-6 p-4 rounded-xl bg-white/20 text-white animate-pulse">
              Laddar väder...
            </div>
          )}

          {error && (
            <div className="error-message bg-red-600/80 p-4 rounded-xl mt-5 animate-fade-in-down">
              <p className="text-lg font-bold">⚠️ {error}</p>
            </div>
          )}

          {!loading && weatherData && (
            <>
              <WeatherCard
                weatherData={weatherData}
                weatherTip={getWeatherTip(
                  weatherData.weather[0].id,
                  weatherData.main.temp,
                  weatherData.wind.speed
                )}
                iconUrl={`${API_ICON_URL}${weatherData.weather[0].icon}@2x.png`}
              />
              <div className="mt-8">
                {forecastData && (
                  <Forecast
                    forecastData={forecastData}
                    getWeatherTip={getWeatherTip}
                    iconUrl={API_ICON_URL}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
