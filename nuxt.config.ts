// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: {
    enabled: true,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/test-utils/module',
    '@nuxt/fonts',
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },

  vite: {
    optimizeDeps: {
      // https://github.com/nuxt/nuxt/issues/27544#issuecomment-2168194904
      exclude: ['vee-validate'],
    },
  },

  // runtime config
  runtimeConfig: {
    public: {
      apiUrl: '',
    },
  },

  // eslint
  eslint: {
    config: {
      standalone: false,
    },
  },

  // vue
  vue: {
    propsDestructure: true,
  },

  // color mode
  colorMode: {
    classSuffix: '',
  },

  imports: {
    dirs: ['./queries'],
  },
})
