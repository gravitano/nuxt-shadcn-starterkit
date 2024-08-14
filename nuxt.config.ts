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
    '@pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/color-mode',
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

  // nuxt components
  components: [
    // ~/user-module/components/account/UserDeleteDialog.vue => <UserDeleteDialog />
    { path: '~/components/app', pathPrefix: false },

    // It's important that this comes last if you have overrides you wish to apply
    // to sub-directories of `~/components`.
    //
    // ~/components/Btn.vue => <Btn />
    // ~/components/base/Btn.vue => <BaseBtn />
    '~/components',
  ],
})
