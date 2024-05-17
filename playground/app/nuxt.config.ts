// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vue-storefront/nuxt"],
  vsf: {
    middleware: {
      apiUrl: "http://localhost:4000",
    },
  },
  vite: {
    server: {
      fs: {
        strict: false,
        // used to allow importing from outside of the root directory
      },
    },
  },
});
