<!-- Detailed Listing -->
<template>
  <v-container>
    <ListingEditor
      v-if="home"
      :listing="home"
      @save="saveListing"
      @delete="deleteListing"
    />
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
import { defineComponent, useRoute, useRouter } from '@nuxtjs/composition-api'
import { CompleteHome } from '~/api/api'
import { useData, useHomes } from '~/hooks/api'
export default defineComponent({
  name: 'EditListing',
  setup() {
    const $route = useRoute()
    const $router = useRouter()
    const { getHome, updateHome, deleteHome } = useHomes()

    const home = useData(getHome, { mlsn: $route.value.params.mlsn })

    const saveListing = async (updatedListing: CompleteHome) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { mlsn, agentId, dailyHits, ...body } = updatedListing
      home.value = await updateHome({ mlsn: $route.value.params.mlsn }, body)
    }

    const deleteListing = async () => {
      // $router.go(-1)
      await deleteHome({ mlsn: $route.value.params.mlsn })
      $router.replace('/listings')
    }

    return {
      home,
      saveListing,
      deleteListing,
    }
  },
})
</script>
