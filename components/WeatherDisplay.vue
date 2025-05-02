<template>
  <div class="border p-3 m-2 flex justify-between">
    <div>
      <h2>{{ locationDisplay }}</h2>
      <br />
      <pre>
Temperature: {{ weather.main.temp }}&deg;C
Feels like: {{ weather.main.feels_like }}&deg;C
Min temperature: {{ weather.main.temp_min }}&deg;C
Max temperature: {{ weather.main.temp_max }}&deg;C
Condition: {{ weather.weather[0].main }}
Wind: {{ weather.wind.speed }} m/s
      </pre>
    </div>
    <div>
      <pre class="text-amber-600 mr-32">{{ getWeatherAscii() }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  weather: WeatherData;
}>();

const getWeatherAscii = () => {
  const condition = props.weather.weather[0].main.toLowerCase();

  if (condition.includes("clear") || condition.includes("sun")) {
    return `
    \\   /
     .-.
  ― (   ) ―
     \`-'
    /   \\
        `;
  } else if (condition.includes("cloud")) {
    if (
      condition.includes("part") ||
      condition.includes("few") ||
      condition.includes("scattered")
    ) {
      return `
   \\  /
    .--.
 -- (    ) --
    \`-\`
        `;
    }
    return `
      .--.
   .-(    ).
  (___.__)__)
        `;
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    return `
     .-.
    (   ).
   (___(__)
    ' ' ' '
   ' ' ' '
        `;
  } else if (condition.includes("snow") || condition.includes("sleet")) {
    return `
     .-.
    (   ).
   (___(__)
    * * * *
   * * * *
        `;
  } else if (condition.includes("thunder") || condition.includes("storm")) {
    return `
     .-.
    (   ).
   (___(__)
    ⚡⚡⚡⚡
   ⚡⚡⚡⚡
        `;
  } else if (
    condition.includes("fog") ||
    condition.includes("mist") ||
    condition.includes("haze")
  ) {
    return `
    _ - _ - _
   _ - _ - _
  _ - _ - _
    _ - _ - _
        `;
  } else {
    return `
   ?????
  ???????
 ?????????
        `;
  }
};

const locationDisplay = computed(() => {
  return props.weather.state
    ? `${props.weather.name}, ${props.weather.state}, ${props.weather.sys.country}`
    : `${props.weather.name}, ${props.weather.sys.country}`;
});
</script>
