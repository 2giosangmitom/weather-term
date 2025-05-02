export async function getWeatherData(query: string): Promise<WeatherData> {
  const {
    public: { openWeatherApi: apiKey },
  } = useRuntimeConfig();

  const getGeolocation = async (): Promise<GeocodingData> => {
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`;
    const res = await fetch(geocodingUrl);

    if (!res.ok) throw new Error(`Geocoding request failed (${res.status})`);

    const data: GeocodingData[] = await res.json();
    if (data.length === 0) throw new Error("Location not found");

    return data[0];
  };

  const getWeather = async (lat: number, lon: number): Promise<WeatherData> => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const res = await fetch(weatherUrl);

    if (!res.ok) throw new Error(`Weather data request failed (${res.status})`);

    return await res.json();
  };

  const location = await getGeolocation();
  const weather = await getWeather(location.lat, location.lon);

  // Optionally include additional metadata
  weather.name = location.name;
  if (location.state) weather.state = location.state;

  return weather;
}
