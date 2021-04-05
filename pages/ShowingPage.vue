<!-- ShowingPage.vue -->
<template>
  <div class="listing">
    <div>
      <ShowingFilterBar />
      <div class="container">
        <div>
          <v-row no-gutters>
            <template v-for="n in 10">
              <v-col :key="n" cols="9">
                <ShowingCard />
              </v-col>
            </template>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return { data: { working: true } }
  },
})
</script>