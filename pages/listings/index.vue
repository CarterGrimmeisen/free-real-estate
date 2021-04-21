<template>
  <div class="listing">
    <div>
    <FilterBar /> 
      <div class="container">
        <v-row v-if="loadedHomes.length" v-scroll="onScroll" no-gutters>
          <v-col v-for="home in loadedHomes" :key="home.mlsn" cols="4">
            <ListingPreview :home="home" />
          </v-col>
        </v-row>
        <v-row v-if="loadingMore">
          <v-progress-linear indeterminate></v-progress-linear>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useContext,
} from '@nuxtjs/composition-api'
import { useHomes } from '@/hooks/api'
import { HomeWithImage } from '~/api/api'

export default defineComponent({
  setup() {
    const { $auth } = useContext()
    const { getHomes } = useHomes()

    const loadingMore = ref(false)
    const doneLoading = ref(false)
    const loadedPages = ref(0)
    const loadedHomes = ref<HomeWithImage[]>([])
    const distanceToBottom = ref(0)
    const onScroll = () => {
      distanceToBottom.value = Math.max(
        document.body.offsetHeight - (window.pageYOffset + window.innerHeight),
        0
      )
    }

    watch(
      distanceToBottom,
      async () => {
        if (
          distanceToBottom.value < 550 &&
          !loadingMore.value &&
          !doneLoading.value
        ) {
          loadingMore.value = true
          const newHomes = await getHomes(
            {},
            { take: 12, skip: loadedPages.value++ * 12, priceMin: 200000}
          )

          // eslint-disable-next-line no-console
          console.dir(newHomes.map((e) => e.mlsn))

          if (!newHomes.length) doneLoading.value = true
          loadedHomes.value = [...loadedHomes.value, ...newHomes]
          loadingMore.value = false
        }
      },
      { immediate: true }
    )

    return {
      $auth,
      onScroll,
      loadedHomes,
      loadingMore,
    }
  },
})
</script>
