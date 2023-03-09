<script setup lang="ts">
// Playground: https://app.contentful.com/spaces/l22n8qgszx4s/apps/app_installations/graphql-playground/graphql
const { data } = await useAsyncGql({
    operation: 'PortfolioParents'
})
const rawData = data.value
const portfolioParents = rawData?.portfolioParentPageCollection?.items

const getBannerImage = (img: string | null | undefined) => {
    if (img !== null) {
        return img
    } else {
        return ''
    }
}
</script>
<template>
    <div>
        <h1>Portfolio</h1>
        <!-- <pre>{{ data }}</pre>-->
        <div class="flex flex-row flex-wrap">
            <a class="w-full md:w-1/2 lg:w-1/3 h-[300px] flex items-center text-center text-white" v-for="item in portfolioParents" :key="item?.sys.id" :style="'background: #000 url(' + getBannerImage(item?.bannerImage?.url) + ') center center no-repeat;background-size: cover;box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 0px 1000px inset;'" :href="`/portfolio/${item?.slug}`">
                <div class="font-black uppercase w-full text-center text-2xl">{{ item?.title }}</div>
            </a>
        </div>
    </div>
</template>