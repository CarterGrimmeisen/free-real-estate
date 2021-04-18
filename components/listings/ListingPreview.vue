<template>
  <v-card class="mx-auto" fill-height full-width>
    <v-img v-if="image" height="250" :src="image" />

    <v-sheet v-else color="grey" dark height="250" class="v-responsive">
      <v-row class="fill-height" align="center" justify="center">
        <div class="display-3">No Images</div>
      </v-row>
    </v-sheet>

    <v-card-title>
      {{ home.street }} <br />
      {{ home.city }}, {{ home.state }} {{ home.zipcode }}
    </v-card-title>

    <v-card-text>
      <v-row class="mx-0"> </v-row>
      <v-row>
        <div class="black--text ml-4" size="14">{{ home.agent.name }}</div>
        <div class="black--text ml-4" size="14">
          {{ home.agent.agency.name }}
        </div>
      </v-row>
      <v-row>
        <div class="black--text ml-4" size="14">${{ fmt(home.price) }}</div>
        <div class="black--text ml-4" size="14">
          Sqft: {{ fmt(home.sqfootage) }}
        </div>
      </v-row>
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-btn
        v-if="$auth.loggedin"
        class="ma-2"
        color="primary"
        dark
        @click="doLikeHome"
      >
        Favorite
        <v-icon v-if="homeLiked !== null" dark right>
          {{ homeLiked.liked ? 'mdi-star' : 'mdi-star-outline' }}
        </v-icon>
      </v-btn>
      <v-btn class="ma-2" color="primary" dark :to="`/listings/${home.mlsn}`">
        More Details
        <v-icon dark right> mdi-information </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { HomeWithImage } from '~/api/api'
import { useHomes } from '~/hooks/api'

export default defineComponent({
  name: 'ListingPreview',
  props: {
    home: {
      type: Object as PropType<HomeWithImage>,
      required: true,
    },
  },
  setup(props) {
    const { $auth } = useContext()
    const { getLiked, likeHome } = useHomes()

    const image = computed(() => props.home.files[0]?.contents)

    const homeLiked = ref<{ liked: boolean } | null>({ liked: false })
    watch(
      $auth,
      async () =>
        (homeLiked.value = $auth.value.loggedin
          ? await getLiked({ mlsn: props.home.mlsn })
          : { liked: false }),
      { immediate: true }
    )

    const doLikeHome = async () =>
      (homeLiked.value = await likeHome({ mlsn: props.home.mlsn }, null))

    const fmt = (num: number) => new Intl.NumberFormat('en-US').format(num)

    return {
      $auth,
      fmt,
      image,
      homeLiked,
      doLikeHome,
    }
  },
})
</script>
