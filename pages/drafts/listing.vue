<template>
  <div class="listing">
    <FilterBar />
    <v-container>
      <v-row v-scroll="onScroll" align="center">
        <v-col v-for="n in loadedElements" :key="n">
          <ListingPreview />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const loadedElements = ref(9)
    const distanceToBottom = ref(0)

    const onScroll = () => {
      distanceToBottom.value = Math.max(
        document.body.offsetHeight - (window.pageYOffset + window.innerHeight),
        0
      )
    }

    watch(distanceToBottom, () => {
      if (distanceToBottom.value < 550) loadedElements.value += 9
    })

    return { loadedElements, onScroll }
  },
})
</script>
