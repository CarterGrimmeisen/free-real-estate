<template>
  <v-app>
    <NavigationBar @login="authActive = true" />
    <v-main><Nuxt /></v-main>
    <Auth />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>

<style>
.v-application {
  background-color: var(--v-background-base) !important;
}
</style>
