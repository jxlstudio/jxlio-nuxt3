// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindTypography from '@tailwindcss/typography'
const defaultTheme = require('tailwindcss/defaultTheme')

export default defineNuxtConfig({
    ssr: true,
    modules: [
        'nuxt-graphql-client',
        '@nuxtjs/tailwindcss',
        '@nuxt/content'
    ],
    buildModules: [
        '@nuxtjs/google-fonts'
    ],
    app: {
        pageTransition: {
            name: 'fade',
            mode: 'out-in'
        }
    },
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
            extend: {
                theme: {
                    fontFamily: {
                        'sans': ['Lato', ...defaultTheme.fontFamily.sans]
                    }
                }
            },
            plugins: [
                tailwindTypography
            ]
        }
    },
    googleFonts: {
        download: true,
        families: {
            Lato: true
        }
    }
})
