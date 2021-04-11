<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Road name, city, state, zipcode</v-card-title>

    <v-card-text>
      <v-row class="mx-0"> </v-row>
      <v-row>
        <div class="black--text ml-4" size="14">Listing Agent</div>
        <div class="black--text ml-4" size="14">Listing Agency</div>
      </v-row>
      <v-row>
        <div class="black--text ml-4" size="14">$###,###</div>
        <div class="black--text ml-4" size="14">Sqft: #,###</div>
      </v-row>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn v-if="$auth.loggedin" class="ma-2" color="primary" dark>
        Favorite
        <v-icon dark right> mdi-star </v-icon>
      </v-btn>
      <v-btn class="ma-2" color="primary" dark to="/listings/example">
        More Details
        <v-icon dark right> mdi-info </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ListingPreview',
  setup() {
    const { $auth } = useContext()

    return { $auth }
  },
})
</script>
