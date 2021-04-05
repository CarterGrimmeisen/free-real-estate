<template>
  <v-app>
    <NavigationBar @login="authActive = true" />
    <v-main><Nuxt /></v-main>
    <Auth :active.sync="authActive" />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const authActive = ref(false)
    provide('authActive', authActive)

    return { authActive }
  },
})
</script>

<style>
.v-application {
  background-color: var(--v-background-base) !important;
}
</style>
