<template>
  <div class="listing">
    <div>
      <FilterBar
        :price-range.sync="priceRange"
        :sqft-range.sync="sqftRange"
        :zipcode.sync="zipcode"
      />
      <v-container>
        <v-row v-if="loadedHomes.length" v-scroll="onScroll" wrap>
          <v-col
            v-for="home in loadedHomes"
            :key="home.mlsn"
            cols="12"
            sm="6"
            lg="4"
            xl="3"
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
  nextTick,
} from '@nuxtjs/composition-api'
import { useHomes } from '@/hooks/api'
import { HomeWithImage } from '~/api/api'

export default defineComponent({
  setup() {
    const { $auth } = useContext()
    const { getHomes } = useHomes()

    const priceRange = ref<[number, number]>([0, 400000])
    const sqftRange = ref<[number, number]>([0, 4000])
    const zipcode = ref<number | null>(null)

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

    const loadMore = async (force = false) => {
      if (
        force ||
        (distanceToBottom.value < 550 &&
          !loadingMore.value &&
          !doneLoading.value)
      ) {
        loadingMore.value = true
        const newHomes = await getHomes(
          {},
          {
            take: 12,
            skip: loadedPages.value++ * 12,
            ...(!!zipcode.value && { zipcode: zipcode.value }),

            priceMin: priceRange.value[0],
            priceMax:
              priceRange.value[1] >= 400_000
                ? 999_999_999
                : priceRange.value[1],

            sqFootageMin: sqftRange.value[0],
            sqFootageMax:
              sqftRange.value[1] >= 4_000 ? 999_999_999 : sqftRange.value[1],
          }
        )

        if (!newHomes.length) doneLoading.value = true
        loadedHomes.value = [...loadedHomes.value, ...newHomes]
        loadingMore.value = false

        loadMore()
      }
    }

    watch(distanceToBottom, () => loadMore(), { immediate: true })

    let filterTimer: any = null
    watch([priceRange, sqftRange, zipcode], () => {
      if (filterTimer === -1) return
      clearTimeout(filterTimer)
      filterTimer = setTimeout(() => {
        filterTimer = -1
        loadedPages.value = 0
        loadedHomes.value = []
        nextTick(async () => {
          await loadMore(true)
          filterTimer = null
        })
      }, 500)
    })

    onMounted(() => setTimeout(() => onScroll(), 250))

    return {
      $auth,
      onScroll,
      loadedHomes,
      loadingMore,
      priceRange,
      sqftRange,
      zipcode,
    }
  },
})
</script>
