<!-- Detailed Listing -->
<template>
  <v-container>
    <ListingEditor v-if="home" :listing="home" @save="saveListing" />
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
import { CompleteHome } from '~/api/api'
import { useData, useHomes } from '~/hooks/api'
export default defineComponent({
  name: 'EditListing',
  setup() {
    const $route = useRoute()
    const { getHome, updateHome } = useHomes()

    const home = useData(getHome, { mlsn: $route.value.params.mlsn })

    const saveListing = async (updatedListing: CompleteHome) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { mlsn, agentId, dailyHits, ...body } = updatedListing
      home.value = await updateHome({ mlsn: $route.value.params.mlsn }, body)
    }

    return {
      home,
      saveListing,
    }
  },
})
</script>
