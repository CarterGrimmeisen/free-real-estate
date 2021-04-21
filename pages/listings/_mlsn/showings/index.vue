<!-- ShowingPage.vue -->
<template>
  <v-container v-if="showings">
    <v-card>
      <v-card-title v-if="home" class="text--primary">
        Showings for {{ home.street }} {{ home.city }}, {{ home.state }},
        {{ home.zipcode }}
      </v-card-title>
      <v-divider />
      <ShowingTable :showings.sync="showings" />
    </v-card>
  </v-container>
</template>

<router>
{
  meta: {
    auth: 'AGENT'
  }
}
</router>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useData, useHomes, useShowings } from '@/hooks/api'

export default defineComponent({
  setup() {
    const { getHome } = useHomes()
    const { getHomeShowings } = useShowings()
    const $route = useRoute()
    const mlsn = $route.value.params.mlsn
    const home = useData(getHome, { mlsn })
    const showings = useData(getHomeShowings, { mlsn })

    return {
      showings,
      home,
    }
  },
})
</script>
