<template>
  <div class="listing">
    <div>
      <FilterBar />
      <v-container>
        <v-row v-if="loadedHomes.length" v-scroll="onScroll" wrap>
          <v-col
            v-for="home in loadedHomes"
            :key="home.mlsn"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <ListingPreview :home="home" />
          </v-col>
        </v-row>
        <v-row v-if="loadingMore">
          <v-progress-linear indeterminate></v-progress-linear>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useContext,
  onMounted,
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

    const loadMore = async () => {
      if (
        distanceToBottom.value < 550 &&
        !loadingMore.value &&
        !doneLoading.value
      ) {
        loadingMore.value = true
        const newHomes = await getHomes(
          {},
          { take: 12, skip: loadedPages.value++ * 12 }
        )

        if (!newHomes.length) doneLoading.value = true
        loadedHomes.value = [...loadedHomes.value, ...newHomes]
        loadingMore.value = false

        loadMore()
      }
    }

    watch(distanceToBottom, loadMore, { immediate: true })

    onMounted(() => setTimeout(() => onScroll(), 250))

    return {
      $auth,
      onScroll,
      loadedHomes,
      loadingMore,
    }
  },
})
</script>
