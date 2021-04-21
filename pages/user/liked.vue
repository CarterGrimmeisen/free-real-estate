<template>
  <div>
    <v-toolbar id="likedListingBar" color="white" flat>
      <v-toolbar-title class="primary--text">
        Your Liked Listings
      </v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-row v-if="loadedHomes.length" v-scroll="onScroll" wrap>
        <v-col
          v-for="(home, index) in loadedHomes"
          :key="home.mlsn"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <ListingPreview
            :home="home"
            @toggledLike="loadedHomes.splice(index, 1)"
          />
        </v-col>
      </v-row>
      <v-row v-else-if="!loadingMore" justify="center">
        <v-col cols="12" class="text-center">
          <v-alert type="info">
            You haven't liked any listings. Like some and come back.
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-if="loadingMore">
        <v-progress-linear indeterminate></v-progress-linear>
      </v-row>
    </v-container>
  </div>
</template>

<router>
{
  meta: {
    auth: 'USER'
  }
}
</router>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useContext,
} from '@nuxtjs/composition-api'
import { useUser } from '@/hooks/api'
import { HomeWithImage } from '~/api/api'

export default defineComponent({
  setup() {
    const { $auth } = useContext()
    const { getLikedHomes } = useUser()

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
          const newHomes = await getLikedHomes(
            {},
            { take: 12, skip: loadedPages.value++ * 12 }
          )

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

<style>
#likedListingBar {
  border-bottom: 1px solid var(--v-primary-base) !important;
}
</style>
