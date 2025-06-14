// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@pinia/nuxt",
  ],
  imports: {
    presets: [{ from: "nanoid", imports: ["nanoid"] }],
  },
  runtimeConfig: {
    public: {
      openWeatherApi: "",
    }
  },
});
