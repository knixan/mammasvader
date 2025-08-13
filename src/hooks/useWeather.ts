import { useState, useEffect, useCallback } from "react";
import { getCookie, setCookie } from "cookies-next";
import { WeatherData, ForecastData, WeatherTip } from "@/types/weather.d";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5";
const API_ICON_URL = "https://openweathermap.org/img/wn/";

const getWeatherTip = (
  weatherId: number,
  temperature: number,
  windSpeed: number
): WeatherTip => {
  // Uppdaterade tips för barn med emojis
  if (windSpeed >= 24)
    return {
      text: "Mamma säger: STORM! Stanna helst inne! ⛈️",
      emoji: "⛈️",
    };
  if (weatherId >= 600 && weatherId <= 602)
    return {
      text: "Mamma säger: Snö på gång! Klä dig varmt, mössa och vantar! ❄️",
      emoji: "❄️",
    };
  if (weatherId >= 611 && weatherId <= 613)
    return {
      text: "Mamma säger: Snöblandat regn! Fodrade regnkläder, eller regnkläder och varma kläder under. 🌨️",
      emoji: "🌨️",
    };
  if (weatherId >= 200 && weatherId <= 201)
    return {
      text: "Mamma säger: Regnkläder och Stövlar på! OBS! INGET PARAPLY och BADA INTE - Du kan bli träffad av blixten! ⚡",
      emoji: "⚡",
    };
  if (weatherId === 202)
    return {
      text: "Mamma säger: Du blir nog blöt hur du än gör! Regnkläder och Stövlar på! OBS! INGET PARAPLY och BADA INTE - Du kan bli träffad av blixten! ⚡",
      emoji: "⚡",
    };
  if (weatherId === 210)
    return {
      text: "Mamma säger: Regnkläderna behövs inte det ska bara åska utan regn, men ta med en regnjacka i fall att. OBS! INGET PARAPLY och BADA INTE - Du kan bli träffad av blixten! ⚡",
      emoji: "⚡",
    };
  if (weatherId >= 211 && weatherId <= 232)
    return {
      text: "Mamma säger: Åska och kanske regn. Se upp för blixten och ta regnkläder! OBS! INGET PARAPLY och BADA INTE - Du kan bli träffad av blixten! ⚡",
      emoji: "⚡",
    };
  if (weatherId >= 300 && weatherId <= 321)
    return {
      text: "Mamma säger: Lätt duggregn, ta med ett paraply eller en lätt regnjacka. ☔",
      emoji: "☔",
    };
  if (weatherId === 500)
    return {
      text: "Mamma säger: Lätt regn, ta med paraply eller regnkläder. 🌧️",
      emoji: "🌧️",
    };
  if (weatherId === 501)
    return {
      text: "Mamma säger: Måttligt regn. Ta med ett paraply eller regnkläder. Ta på dig gummistövlar! 🌧️",
      emoji: "🌧️",
    };
  if (weatherId >= 502 && weatherId <= 504)
    return {
      text: "Mamma säger: Kraftigt regn! Regnkläder och stövlar är ett måste. Det blir blött! 🌧️",
      emoji: "🌧️",
    };
  if (weatherId >= 520 && weatherId <= 531)
    return {
      text: "Mamma säger: Duschregn! Du kommer bli blöt hur du än klär dig, men ta på dig regnkläder och gummistövlar. 🌧️",
      emoji: "🌧️",
    };
  if (weatherId >= 701 && weatherId <= 781)
    return {
      text: "Mamma säger: Dimma eller dis, kör försiktigt och var uppmärksam på sikten. 🌫️",
      emoji: "🌫️",
    };
  if (weatherId === 800) {
    if (temperature >= 5 && temperature <= 8)
      return {
        text: "Mamma säger: Ta på dig en fodrad jacka. 😎",
        emoji: "😎",
      };
    if (temperature > 7 && temperature <= 12)
      return {
        text: "Mamma säger: Vår/Höst jackan på! Eller ta en kofta eller luvtröja. 😊",
        emoji: "😊",
      };
    if (temperature > 12 && temperature <= 15)
      return {
        text: "Mamma säger: Ta på en jacka, kofta eller en hoodie. 😊",
        emoji: "😊",
      };
    if (temperature > 15 && temperature <= 19)
      return {
        text: "Mamma säger: Kan vara bra att ha med en kofta eller en hoodie, även om du inte behöver ha den på hela tiden. 😊",
        emoji: "😊",
      };
    if (temperature > 19 && temperature <= 24)
      return {
        text: "Mamma säger: Blir ganska varmt idag, ta på en keps eller solhatt. ☀️",
        emoji: "☀️",
      };
    if (temperature > 24 && temperature <= 33)
      return {
        text: "Mamma säger: OJ OJ!!! Nu blir det jättevarmt! Ta på dig solhatt eller keps! Smörj med solkräm! GLÖM INTE TA MED VATTEN! Du kommer att bli törstig. ☀️",
        emoji: "☀️",
      };
  }
  if (weatherId >= 801 && weatherId <= 804) {
    if (temperature < 5)
      return {
        text: "Mamma säger: Molnigt och kallt. Klä dig varmt! 🌥️",
        emoji: "🌥️",
      };
    if (temperature > 4 && temperature <= 10)
      return {
        text: "Mamma säger: Molnigt och lite kyligt, en jacka behövs. 🌥️",
        emoji: "🌥️",
      };
    if (temperature > 10 && temperature <= 15)
      return {
        text: "Mamma säger: Molnigt men milt, men en tjocktröja räcker nog. ☁️",
        emoji: "☁️",
      };
    if (temperature > 15 && temperature <= 20)
      return {
        text: "Mamma säger: Molnigt men ganska varmt. En tjocktröja eller sommarjacka kan vara bra om det blåser. ☁️",
        emoji: "☁️",
      };
    if (temperature > 20)
      return {
        text: "Mamma säger: Molnigt men varmt. Korta ärmar går bra. ☁️",
        emoji: "☁️",
      };
  }
  return {
    text: "Mamma kan inte rekommendera något just nu. 🤷",
    emoji: "🤷",
  };
};

const useWeather = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedCity = getCookie("last_city");
    if (savedCity && typeof savedCity === "string") {
      setCity(savedCity);
      fetchWeatherData(savedCity);
    }
  }, []);

  const fetchWeatherData = useCallback(async (searchCity: string) => {
    if (!searchCity || !API_KEY) {
      setError(
        "Vänligen ange en stad och se till att API-nyckeln är inställd."
      );
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const currentWeatherResponse = await fetch(
        `${API_URL}/weather?q=${searchCity}&appid=${API_KEY}&units=metric&lang=sv`
      );
      if (!currentWeatherResponse.ok) {
        throw new Error("Staden hittades inte, kontrollera stavningen!");
      }
      const currentData: WeatherData = await currentWeatherResponse.json();

      const forecastResponse = await fetch(
        `${API_URL}/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${API_KEY}&units=metric&lang=sv`
      );
      if (!forecastResponse.ok) {
        throw new Error("Kunde inte hämta prognosdata.");
      }
      const forecastData: ForecastData = await forecastResponse.json();

      setWeatherData(currentData);
      setForecastData(forecastData);
      setCookie("last_city", searchCity, { maxAge: 60 * 60 * 24 * 30 });
    } catch (err: any) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    city,
    setCity,
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeatherData,
    getWeatherTip,
    API_ICON_URL,
  };
};

export default useWeather;
