<!-- ShowingPage.vue -->
<template>
  <v-container v-if="showings">
    <ShowingTable :showings.sync="showings" />
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
import { useData, useShowings } from '@/hooks/api'

export default defineComponent({
  setup() {
    const { getHomeShowings } = useShowings()
    const $route = useRoute()
    const mlsn = $route.value.params.mlsn
    const showings = useData(getHomeShowings, { mlsn })

    return {
      showings,
      confirm,
    }
  },
})
</script>
