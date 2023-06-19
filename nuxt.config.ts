// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app:{
    head: {
      charset: 'utf-16',
      viewport:"width=device-width, initial-scale=1",
      title: "Nuxt Wordpress",
      titleTemplate: "%s - Nuxt Wordpress",
      meta: [{ name: "description", content: "Nuxt Wordpress" }],
    }
  },
  modules: [ 
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    public: {
      wordpressUrl: 'http://nuxt-wordpress.local/graphql',
    }
  }
})
