<template>
  <v-container>
    <ListingEditor @save="saveListing" />
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
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { useHomes } from '~/hooks/api'

export default defineComponent({
  name: 'NewListing',
  setup() {
    const $router = useRouter()
    const { createHome } = useHomes()

    const saveListing = async (
      newListing: Parameters<typeof createHome>[1]
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await createHome({}, newListing, null)
      $router.push(`/listings/${result.mlsn}/edit`)
    }

    return {
      saveListing,
    }
  },
})
</script>
