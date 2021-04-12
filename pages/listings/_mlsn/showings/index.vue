<!-- ShowingPage.vue -->
<template>
  <div class="listing">
    <div>
      <ShowingFilterBar />
      <div class="container">
        <div>
          <v-row v-if="showings" no-gutters>
            <h1 v-if="showings.length == 0">No showings scheduled!</h1>
            <template v-for="(showing, i) in showings">
              <v-col :key="i" cols="9">
                <ShowingCard :showing="showing" />
              </v-col>
            </template>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { useHomes, useRequest } from '@/hooks/api'

export default defineComponent({
  setup() {
    const { getHomeShowings } = useHomes()
    const [showings, fetchShowings] = useRequest(getHomeShowings)

    const $route = useRoute()
    const realMlsn = $route.value.params.mlsn
    const promise = fetchShowings({ mlsn: realMlsn })
    const fmt = (num: number) => new Intl.NumberFormat('en-US').format(num)

    return {
      realMlsn,
      showings,
      fetchShowings,
      promise,
      fmt,
    }
  },
})
</script>
