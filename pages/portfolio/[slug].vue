<script lang="ts" setup>
import { StringLiteral } from '@babel/types';

const route = useRoute()
const slug = route.params.slug as string
const { data } = await useAsyncGql('SinglePortfolioParent', { slug: slug })
// console.log(data)
</script>

<template>
    <div>
        <!-- Breadcrumbs!!!!!!!? -->
        <h1>{{ data?.portfolioParentPageCollection?.items[0]?.title }}</h1>
        <pre>{{ data }}</pre>
    </div>
</template>