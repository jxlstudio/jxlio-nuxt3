// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    modules: [
        'nuxt-graphql-client',
        '@nuxtjs/tailwindcss'
    ],
    // https://nuxt-graphql-client.web.app/getting-started/quick-start
    'graphql-client': {
        clients: {
            default: {
                host: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
                token: {
                    type: 'Bearer',
                    name: 'Authorization',
                    value: process.env.CONTENTFUL_ACCESS_TOKEN
                },
                retainToken: false
            }
        }
    }
})
