<!-- ShowingPage.vue -->
<template>
  <v-container v-if="showings">
    <ShowingTable :showings.sync="showings" />
  </v-container>
</template>

<router>
{
  meta: {
    auth: 'USER'
  }
}
</router>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useData, useShowings } from '@/hooks/api'

export default defineComponent({
  setup() {
    const { getUserShowings } = useShowings()
    const showings = useData(getUserShowings)

    return {
      showings,
    }
  },
})
</script>
