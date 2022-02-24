import i18nConfig from "./plugins/i18n/index";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  // ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Baxtlilar",
    title: "Baxtlilar",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    scripts: [
      {
        src: "https://code-ya.jivosite.com/widget/GyXBzOKWA2",
        type: "text/javascript",
        body: true,
        // defer: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/style.css", "~/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/axios.js", mode: "client" },
    // "~/plugins/axios.js",
    "~/plugins/antd-ui.js",
    { src: "~/plugins/vee-validate/index.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/dotenv", "@nuxtjs/laravel-echo"],

  echo: {
    plugins: ["~/plugins/echo.js"],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/i18n",
    "@nuxtjs/proxy",
    "@nuxtjs/toast",
  ],

  i18n: {
    loadLanguagesAsync: true,
    locales: [
      { code: "en", name: "English" },
      { code: "ru", name: "Russian" },
      { code: "uz", name: "Uzbek" },
    ],
    defaultLocale: "uz",
    vueI18nLoader: true,
    vueI18n: i18nConfig,
    strategy: "prefix",
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    prefix: process.env.API_URL,
    credentials: true,
    proxy: true,
  },

  proxy: {
    "/api": process.env.API_URL,
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: "accessToken",
        },
        user: {
          property: "user",
          autoFetch: true,
        },
        endpoints: {
          login: { url: "/api/auth/login", method: "post" },
          logout: { url: "/api/auth/logout", method: "post" },
          user: { url: "/api/user", method: "get", property: false },
        },
      },
    },
    redirect: {
      login: "/",
      logout: "/",
      callback: false,
      home: false,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },

  router: {
    middleware: ["auth"],
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    extendRoutes(routes, resolve) {
      routes.push({
        path: "/:catchAll(.*)",
        component: resolve(__dirname, "layouts/error.vue"),
      });
    },
  },

  loading: {
    color: "orange",
    height: "5px",
    throttle: 0,
  },

  toast: {
    position: "top-right",
    keepOnHover: true,
    duration: 5000,
  },

  pageTransition: "page",

  target: "static",
};
