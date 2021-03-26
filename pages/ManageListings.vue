<!-- ManageListings.vue -->
<template>
  <div class="listing">
    <div>
      <FilterBar />
      <div class="container">
        <div>
         <v-card-title bold> Manage Listings - Company Name </v-card-title>
          <v-row no-gutters>
            <template v-for="n in 9">
              <v-col :key="n" cols="4">
                <EditListingPreview />
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
   name: 'ManageListings',
  setup() {
    return { data: { working: true } }
  },
})
</script>