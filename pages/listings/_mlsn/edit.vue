<!-- Detailed Listing -->
<template>
  <v-container>
    <ListingEditor
      v-if="home && images"
      :listing="home"
      :images="images"
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
import { File } from '@prisma/client'
import isEqual from 'fast-deep-equal'
import { CompleteHome } from '~/api/api'
import { useData, useFiles, useHomes } from '~/hooks/api'
export default defineComponent({
  name: 'EditListing',
  setup() {
    const $route = useRoute()
    const $router = useRouter()
    const { getHome, updateHome, deleteHome } = useHomes()
    const { getHomeFiles } = useFiles()
    const { createFile, deleteFile } = useFiles()

    const home = useData(getHome, { mlsn: $route.value.params.mlsn })
    const images = useData(
      getHomeFiles,
      { mlsn: $route.value.params.mlsn },
      { type: 'IMAGE' }
    )

    const saveListing = async ([updatedListing, addedImages, removedImages]: [
      CompleteHome,
      File[],
      string[]
    ]) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await Promise.all(removedImages.map((each) => deleteFile({ id: each })))

      images.value = [
        ...images.value!.filter((each) => !removedImages.includes(each.id)),
        ...(await Promise.all(
          addedImages.map((each) =>
            createFile({}, { ...each, homeMlsn: $route.value.params.mlsn })
          )
        )),
      ]

      if (!isEqual(home.value, updatedListing)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { mlsn, agentId, dailyHits, ...body } = updatedListing
        home.value = await updateHome({ mlsn: $route.value.params.mlsn }, body)
      }
    }

    const deleteListing = async () => {
      // $router.go(-1)
      await deleteHome({ mlsn: $route.value.params.mlsn })
      $router.replace('/listings')
    }

    return {
      home,
      images,
      saveListing,
      deleteListing,
    }
  },
})
</script>
