<template>
    <div>
        <DefaultHeader />
        <main>
            <slot />
        </main>
        <DefaultFooter/>
    </div>
</template>

<style lang="postcss">
*, a, .prose a, .prose h1 {
    @apply text-white;
}

a:hover, .prose a:hover {
    @apply text-gray-300;
}
</style>