<template>
    <RouterView v-slot="{Component}" :key="$route.path">
        <Suspense>
            <component :is="Component">
            </component>
            <template #fallback>
                <v-progress-linear indeterminate color="primary"></v-progress-linear>
            </template>
        </Suspense>
    </RouterView>
</template>
<script lang="ts" setup>
</script>