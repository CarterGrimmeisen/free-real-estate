<template>
  <div class="listing">
    <div>
      <FilterBar />
      <div class="container">
        <div>
          <v-row v-if="homesReady && homes" no-gutters>
            <v-col v-for="home in homes" :key="home.mlsn" cols="4">
              <ListingPreview :home="home" />
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useHomes, useData } from '@/hooks/api'

export default defineComponent({
  setup() {
    const { $auth } = useContext()
    const { getHomes } = useHomes()

    const [homes, homesReady] = useData(getHomes)

    return {
      data: { working: true },
      $auth,
      homes,
      homesReady,
    }
  },
})
</script>
