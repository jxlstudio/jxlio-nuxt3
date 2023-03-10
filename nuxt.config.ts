// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindTypography from '@tailwindcss/typography'

export default defineNuxtConfig({
    ssr: true,
    modules: [
        'nuxt-graphql-client',
        '@nuxtjs/tailwindcss',
        '@nuxt/content'
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
    },
    content: {
        // https://content.nuxtjs.org/api/configuration
    },
    tailwindcss: {
        config: {
            plugins: [
                tailwindTypography
            ]
        }
    }
})
