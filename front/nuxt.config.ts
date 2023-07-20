// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vite-pwa/nuxt"],
  pwa: {
    manifest: {
      name: "Nuxt3 PWA",
      short_name: "Nuxt3 PWA",
      description: "Testing Nuxt3 PWA",
      icons: [
        {
          src: "icons/icon_64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "icons/icon_144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "icons/icon_192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/icon_512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      importScripts: [
        "/sw.js", // この行を追加
      ],
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
  plugins: ["~/plugins/push-notifications.js"],
  vite: {
    server: {
      proxy: {
        // オプションを使用: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
        "^/api/.*": {
          target: "http://localhost:8000",
          changeOrigin: true,
          rewrite: (path: any) => path.replace(/^\/api/, ""),
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      vapidKey: "",
    },
  },
});
