<template>
  <v-app>
    <NavigationBar @login="authActive = true" />
    <v-main><Nuxt /></v-main>
    <Auth :active.sync="showAuth" />
  </v-app>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const $route = useRoute()
    const $router = useRouter()

    const showAuth = computed({
      get: () => ($route.value.query.auth as string) !== undefined,
      set: (_) => {
        if ($route.value.query.auth) {
          if ($route.value.query.auth !== 'true')
            $router.replace($route.value.query.auth as string)
          else $router.replace({ query: { auth: undefined } })
        }
      },
    })

    return { showAuth }
  },
})
</script>

<style>
.v-application {
  background-color: var(--v-background-base) !important;
}
</style>
