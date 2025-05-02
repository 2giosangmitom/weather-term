export async function getWeatherData(city: string, country: string) {
  const runtimeConfig = useRuntimeConfig();
  const apiKey = runtimeConfig.public.openWeatherApi;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

  const response = await fetch(url);
  const json = await response.json();

  return json;
}
